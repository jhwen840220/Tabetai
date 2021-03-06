const env = require("dotenv").config();
module.exports = {
  mode: "universal",
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Knewave&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/custom.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vue2-google-maps",
    "@/plugins/firebase",
    { src: "@/plugins/vue-carousel.js", ssr: false },
    "@/plugins/i18n"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["bootstrap-vue/nuxt"],
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    transpile: [/^vue2-google-maps($|\/)/]
  }
};
