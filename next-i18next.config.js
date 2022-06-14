const I18NextHttpBackend = require("i18next-http-backend");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],

    backend: {
      loadPath: `https://d3tmwynvs73u9l.cloudfront.net/public/locales/us/common.json`,
    },
  },
  debug: true,
  ns: ["common", "employees", "projects"],
  serializeConfig: false,
  use: [I18NextHttpBackend],
};
