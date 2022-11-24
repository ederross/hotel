const I18NextHttpBackend = require('i18next-http-backend');

module.exports = {
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['en-US', 'pt-BR'],

    backend: {
      loadPath: process.env.NEXT_PUBLIC_I18N_URL,
    },
  },
  debug: false,
  ns: ['common'],
  serializeConfig: false,
  use: [I18NextHttpBackend],
};
