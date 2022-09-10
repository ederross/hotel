const I18NextHttpBackend = require('i18next-http-backend');

module.exports = {
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['en-US', 'pt-BR'],

    backend: {
      loadPath: `https://d3tmwynvs73u9l.cloudfront.net/public/locales/{{lng}}/{{ns}}.json`,
    },
  },
  debug: false,
  ns: ['common'],
  serializeConfig: false,
  use: [I18NextHttpBackend],
};
