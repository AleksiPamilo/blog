export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'https://api.blog.aleksipamilo.dev',
        'https://blog.aleksipamilo.dev',
        'http://localhost:1337',
        'http://host.docker.internal:1337',
        'http://host.docker.internal:3001'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
