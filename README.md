# 🏁 number-localizaer

A library that helps you localize numbers. If you have a large number (greater `Number.MAX_SAFE_INTEGER`) or a number with a bunch of decimals and you try to format it using `Intl.NumberFormat` and / or `Number.toLocaleString("...")`, precision will be lost.

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

// create a big number. Number SHOULD be entered as String
const target = '1121212133213134314145624324'
console.log(`Is it safe to parse "${target}"?`, Number.isSafeInteger(Number(target))) // false

const res_error = new Intl.NumberFormat(locale).format(target)
const res_ok = parser.toLocaleString(target)

console.log("Localize using traditional way: ", resError) // '1.121.212.133.213.134.300.000.000.000'
console.log("Localize using NumberLocalizer: ", resOk) //  '1.121.212.133.213.134.314.145.624.324'
```

## 🔎 Demos

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
