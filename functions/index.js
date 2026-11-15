function preferredLanguage(header) {
  if (!header) return 'en';

  const preferences = header
    .split(',')
    .map((item, index) => {
      const [language, ...parameters] = item.trim().split(';');
      const tag = language.trim().toLowerCase();

      if (!tag) return null;

      let quality = 1;

      for (const parameter of parameters) {
        const [name, value] = parameter.trim().split('=');

        if (name?.trim().toLowerCase() !== 'q') continue;

        const raw = value?.trim() ?? '';

        if (!/^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw)) {
          return null;
        }

        quality = Number(raw);
      }

      return { tag, quality, index };
    })
    .filter((item) => item && item.quality > 0)
    .sort((a, b) =>
      b.quality - a.quality || a.index - b.index
    );

  const first = preferences[0]?.tag;

  return first === 'pt' || first?.startsWith('pt-')
    ? 'pt'
    : 'en';
}

export function onRequest({ request }) {
  const locale = preferredLanguage(
    request.headers.get('Accept-Language')
  );

  const target = new URL(request.url);
  target.pathname = `/${locale}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: target.toString(),
      'Cache-Control': 'no-store',
      Vary: 'Accept-Language',
    },
  });
}
