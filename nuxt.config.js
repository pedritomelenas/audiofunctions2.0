export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  ssr: false,
  server: {
    port: 3000,
  },
  env: {
    SONIFICATION_MIN_TICK_TIME_SECONDS: 0.01, //principio di indeterminazione tonale
    REPEAT_SAME_TEXT_TIME_THRESHOLD_SECONDS: 1,
    SONIFICATION_BATCH_SONIFICATION_TIME_SECONDS: 5,
    INTERACTION_SONIFICATION_HOLD_KEY_TICK_TIME_SECONDS: 1,
    TEXT_TO_SPEECH_MONITOR_QUEUE_INTERVAL_MS: 50,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "AudioFunctions 2.0",
    htmlAttrs: {
      lang: "es-ES",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/mathlive-fonts.css", "~/assets/css/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-resize.js", mode: "client" },
    { src: "~/plugins/mathlive-input.js", mode: "client" },
    { src: "~/plugins/vue-a11y-announcer.js", mode: "client" },
    { src: "~/plugins/validate-function.js", mode: "client" },
    { src: "~/plugins/enums.js", mode: "client" },
    { src: "~/plugins/session-data-serializer.js", mode: "client" },
    { src: "~/plugins/sound.js", mode: "client" },
    { src: "~/plugins/math.js", mode: "client" },
    { src: "~/plugins/vue-shortkey.js", mode: "client" },
    { src: "~/plugins/vue-clipboard.js", mode: "client" },
    { src: "~/plugins/vue-mathjax.js", mode: "client" },
    { src: "~/plugins/vue-mouseover.js", mode: "client" },
    { src: "~/plugins/vue-visibility.js", mode: "client" },
    { src: "~/plugins/function-parser.js", mode: "client" },
    { src: "~/plugins/function-utility.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["vue-ssr-carousel/nuxt"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/dotenv"],
  bootstrapVue: {
    icons: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map"; //per poter debuggare mettendo breakpoints negli hook direttamente del componente vue
      }
      config.resolve.alias["vue"] = "vue/dist/vue.common"; //serve per mathlive perchè mi da questo errore: https://github.com/nuxt/nuxt.js/issues/1142 . Nella doc di vue-mathlive è specificato che ci potrebbe essere (vedi "Caution" https://github.com/arnog/vue-mathlive )
    },
    transpile: ["function-plot", "mathlive"],
  },
};
