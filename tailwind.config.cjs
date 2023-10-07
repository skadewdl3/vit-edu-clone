import { getVariable } from './src/utils/utils'
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: getVariable('primaryColor'),
        secondary: getVariable('secondaryColor'),
        accent: getVariable('accentColor'),
      },
      fontFamily: {
        heading: getVariable('headingFont').split(','),
        text: getVariable('textFont').split(','),
      },
    },
  },
}
