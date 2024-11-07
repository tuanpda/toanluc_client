module.exports = {
  mode: "universal",
  static: {
    prefix: false,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Hệ thống kế toán - ToanLuc JSC",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo.jpg" },
      {
        rel: "stylesheet",
        href: "/fontawesome-free-6.4.0-web/css/all.css",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js",
        type: "text/javascript",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/vuelidate" },
    { src: "~/plugins/integrations" },
    { src: "~/plugins/components" },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/paginate", ssr: false },
    { src: "~/plugins/jwpagination", ssr: false },
    { src: "~/plugins/sweetalert", ssr: false },
    { src: "~/plugins/sweetalert2", ssr: false },
    { src: "~/plugins/excelxlsx", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "portal-vue/nuxt",
    "@nuxtjs/auth-next",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  /* axios: {
    baseURL: "http://localhost:9999",
  }, */
  axios: {
    // baseURL: "http://localhost:5555",
    baseURL: "http://103.104.118.155:5555/", // máy chủ thực tế của toàn lực
    timeout: 20000,
  },
  server: {
    // port: 8080, // default: 3000
    port: 80,
    host: "103.104.118.155", // máy chủ thực tế của toàn lực
  },
  /* proxy: {
    "/api": URL,
  }, */
  /* server: {
    port: 5000, // default: 3000
    //host: '0.0.0.0' // default: localhost
  }, */
  /* serverMiddleware: ["~/server/routes/index"], */
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: "empty",
      };
    },
    transpile: [/^ag-grid-vue/],
  },

  router: {
    middleware: ["auth"],

    // Thêm route catch-all
    extendRoutes(routes, resolve) {
      routes.push({
        name: "catch-all",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"), // Đường dẫn đến trang "This page could not be found"
      });
    },
  },

  auth: {
    strategies: {
      custom: {
        scheme: "~/nuxtAuthSchema/CustomScheme.js",
        endpoints: {
          login: {
            url: "/auth/login/access/login",
            method: "post",
            propertyName: false,
          },
          // refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: "/api/users/auth/user", method: "get" },
        },
        user: {
          property: "user",
          autoFetch: true,
        },
      },
    },
  },
};
