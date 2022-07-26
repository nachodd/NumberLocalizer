# 🌎 number-localizer

A library that helps you format numbers according to a given locale.

- _Hey! what about `Number(...).toLocaleString(localeCode)`?_ You can use it, but the number should be on the range of `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`. Outside of this range it won't work.
- _But can't I use `BigInt(...).toLocaleString(localeCode)` for that?_ Technically, yes. But it doesn't support decimal numbers.
- _But you can still use `Intl.NumberFormat(localeCode).format(...)` to format floating point numbers, no?_ You can, but at some point you will lost precision. [More about this](https://floating-point-gui.de/).

## 📦 Installation

```bash
npm install --save number-localizer
# or
yarn add number-localizer
```

## 🕹 Usage

```js
// It should be a valid locale code
const locale = "es-AR"
const parser = new LocaleParser(locale)

// create a big number. Input number SHOULD be a String
const target = '1121212133213134314145624324'
console.log(`Is it safe to parse "${target}"?`, Number.isSafeInteger(Number(target))) // false

const resError = new Intl.NumberFormat(locale).format(target)
const resOk = parser.toLocaleString(target)

console.log("Localize using traditional way: ", resError) // '1.121.212.133.213.134.300.000.000.000'
console.log("Localize using NumberLocalizer: ", resOk) // '1.121.212.133.213.134.314.145.624.324'
```

## 🔎 Test cases

```js
const targets = []
targets.push('0')
targets.push('123')
targets.push('-123')
targets.push('123.456')
targets.push('-123.456')
targets.push('-0.123')

targets.push("3.02322e4")
targets.push("-0.00312312e-8")

targets.push('11212121332131343141456.12345678901234567')
targets.push('0.1231231231231232145382584832743784298312345678901234567')
targets.push('1231231231231232145382584832743784298312345678901234567')

targets.push('-11212121332131343141456.12345678901234567')
targets.push('-0.1231231231231232145382584832743784298312345678901234567')
targets.push('-1231231231231232145382584832743784298312345678901234567')

targets.push("1.00000000000000000000000000000000000000000001934832789723897218937128937128937985e+44")


const locales = []
locales.push("es-AR")
locales.push("en-US")
locales.push("ar-EG")

locales.forEach(locale => {
  const parser = new LocaleParser(locale)
  console.log("---------------------------------------------")
  console.log("---------------------------------------------")
  console.log(`LOCALE: '${locale}'`, )
  targets.forEach(target => {
    const res = parser.toLocaleString(target)
    console.log("---------------")
    console.log(`Target: '${target}'`)
    console.log(`Localized: ${res}`)
  })
})
```

## 🤝 Contributing

This repository is open for contribution. So, go ahead, fork it & send me a PR!

## ⭐️ Support

If you like this project, You can support me with starring ⭐ this repository

## 📄 License

[MIT](LICENSE)

Developed with ❤️ by nachodd
