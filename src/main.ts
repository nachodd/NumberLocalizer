import Big from 'big.js'

export default class NumberLocalizer {
  _locale: Intl.Locale | string
  _numerals: string[]
  _groupSeparator: string
  _decimalSeparator: string

  constructor (locale: Intl.Locale) {
    this._locale = locale
    // type hack: Intl.NumberFormat does not support Intl.Locale type (which is wrong), so cast it as a string
    const format = new Intl.NumberFormat(this._locale as unknown as string)
    const parts = format.formatToParts(12345.6)
    this._numerals = Array.from({ length: 10 }).map((_, i) => format.format(i))
    this._groupSeparator = parts.find((d) => d.type === 'group')?.value || ''
    this._decimalSeparator = parts.find((d) => d.type === 'decimal')?.value || ''
  }

  private _toLocaleIntegerPart (string: string) {
    // If the integet part is one of these, it translates to "0" and it does not includes the sing. To avoid this, translate -1 and then replace it with the corresponding numeral
    if (string === '-' || string === '-0') {
      // eslint-disable-next-line no-undef
      return BigInt(-1)
        .toLocaleString(this._locale)
        .replace(this._numerals[1], this._numerals[0])
    }
    // eslint-disable-next-line no-undef
    return BigInt(string).toLocaleString(this._locale)
  }

  private _toLocaleDecimalPart (string: string): string {
    // If the decimal part starts with 0, then count the zeros to fill them in the end
    let leadingZeros = 0
    if (string.startsWith('0')) {
      const helper = Number(`0.${string}`)
      // it could be that the decimal part was truncated,
      // so in example insted of 0.0003 we could have 0.00. In this case we would have 2 zeros
      if (helper === 0) {
        leadingZeros = string.length - 1
      } else {
        // Calculate the negative order of magnitude https://en.wikipedia.org/wiki/Order_of_magnitude, aka number of zeros
        leadingZeros = -Math.floor(Math.log10(helper) + 1)
      }
    }
    // eslint-disable-next-line no-undef
    const result = BigInt(string)
      .toLocaleString(this._locale)
      .replaceAll(this._groupSeparator, '')

    return leadingZeros > 0
      ? this._numerals[0].repeat(leadingZeros).concat(result)
      : result
  }

  toLocaleString (string: string) {
    // If number is expressed using exponential notiation, parse the number to be expressed using normal notation
    if (string.includes('e')) {
      string = Big(string).toFixed()
    }
    const hasDecimals = string.includes('.')

    if (hasDecimals) {
      const [intPart = '0', decPart] = string.split('.')
      const integerPartLocalized = this._toLocaleIntegerPart(intPart)
      const decimalPartLocalized = this._toLocaleDecimalPart(decPart)
      return `${integerPartLocalized}${this._decimalSeparator}${decimalPartLocalized}`
    }
    return this._toLocaleIntegerPart(string)
  }
}
