import { preferredLanguage } from './index.js';

const routes = {
  cv: {
    pt: 'cv',
    en: 'cv',
  },
  blog: {
    pt: 'blog',
    en: 'blog',
  },
  consultorias: {
    pt: 'consultorias',
    en: 'consulting',
  },
  consulting: {
    pt: 'consultorias',
    en: 'consulting',
  },
  pagamentos: {
    pt: 'pagamentos',
    en: 'payments',
  },
  payments: {
    pt: 'pagamentos',
    en: 'payments',
  },
  keys: {
    pt: 'keys',
    en: 'keys',
  },
};

export function onRequest({ request, params, next }) {
  const destination = routes[params.slug];

  if (!destination) {
    return next();
  }

  const locale = preferredLanguage(
    request.headers.get('Accept-Language')
  );

  const target = new URL(request.url);
  target.pathname = `/${locale}/${destination[locale]}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'no-store',
      Vary: 'Accept-Language',
    },
  });
}
