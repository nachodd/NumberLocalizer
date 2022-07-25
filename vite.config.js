import { defineConfig } from 'vite'
import { resolve } from 'path'

import eslint from 'vite-plugin-eslint'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'number-localizer',
      // the proper extensions will be added
      fileName: (format) => `number-localizer.${format}.js`
    }
  },
  plugins: [eslint()]
})
