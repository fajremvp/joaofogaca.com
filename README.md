# joaofogaca.com

My personal website.

## 1. Visão do projeto

Construir uma presença digital pessoal, minimalista, acessível e duradoura, que reúna minha identidade, trajetória profissional, serviços, publicações e informações de contato.

O site deve representar meus interesses em negócios, estratégia, consultoria, empreendedorismo e tecnologia, sem depender de uma identidade visual exclusivamente técnica. Deve ser compreensível tanto para desenvolvedores quanto para recrutadores, profissionais de outras áreas e potenciais clientes.

**Princípios:**

- Simplicidade de apresentação, implementação e manutenção.
- Conteúdo prioritariamente em Markdown.
- HTML semântico, CSS próprio e geração estática.
- Português e inglês com a mesma importância.
- Liberdade visual entre as seções.
- Excelente desempenho, acessibilidade, privacidade e SEO.
- Independência entre conteúdo, apresentação e infraestrutura de hospedagem.
- Evolução gradual, evitando abstrações e dependências sem necessidade.

## 2. Stack e restrições técnicas

| Componente | Decisão |
|---|---|
| Framework | Astro, com geração estática |
| Conteúdo | Markdown e Astro Content Collections |
| Interface | HTML semântico e CSS próprio |
| JavaScript no navegador | Proibido, salvo decisão futura expressa |
| JavaScript/TypeScript no build | Permitido |
| JavaScript na infraestrutura | Permitido para redirecionamentos e funções justificadas |
| Dependências | Pequenas, justificadas e mantidas sob controle |
| Gerenciamento de pacotes | npm, com `package-lock.json` |
| Hospedagem principal | Cloudflare Pages |
| Hospedagem no Tor | Homelab |

Não instalar frameworks reativos, bibliotecas visuais, ferramentas de analytics, gerenciadores de conteúdo ou serviços externos por padrão.

O objetivo é entregar **zero JavaScript executável ao navegador**. O uso de JavaScript ou TypeScript durante o build, bem como nas Cloudflare Pages Functions, não viola essa restrição.

Funcionalidades que dependam de JavaScript no navegador devem ser substituídas por alternativas nativas de HTML/CSS quando possível. Exceções futuras exigem decisão explícita e justificativa.

Não buscar artificialmente zero dependências: bibliotecas pequenas podem ser utilizadas quando resolvem uma necessidade concreta melhor do que uma implementação própria.

O Astro deverá gerar um diretório `dist/` composto por arquivos estáticos. Não utilizar SSR para páginas de conteúdo.

## 3. Estrutura de URLs e idiomas

Todas as páginas de conteúdo utilizam prefixos explícitos de idioma. Não haverá páginas canônicas em português ou inglês sem prefixo.

| Seção | Português | Inglês |
|---|---|---|
| Hub pessoal | `/pt` | `/en` |
| Currículo | `/pt/cv` | `/en/cv` |
| Consultoria | `/pt/consultorias` | `/en/consulting` |
| Blog | `/pt/blog` | `/en/blog` |
| Pagamentos | `/pt/pagamentos` | `/en/payments` |
| Identidade criptográfica | `/pt/keys` | `/en/keys` |

Os artigos utilizam:

- `/pt/blog/<slug>`
- `/en/blog/<slug>`

Os slugs devem ser descritivos, estáveis e apropriados ao idioma da publicação. Artigos não precisam ter tradução correspondente.

Não haverá seção `/dev`. Projetos técnicos, tutoriais e experimentos poderão ser apresentados no blog ou referenciados diretamente em seus repositórios.

### 3.1. Internacionalização

Os idiomas suportados são `pt` e `en`. O inglês é o idioma de fallback quando o idioma preferencial não é suportado.

**Comportamento esperado:**

- `/` redireciona automaticamente para `/pt` ou `/en`.
- A preferência é identificada pelo cabeçalho HTTP `Accept-Language`.
- Se o idioma de maior prioridade for português (`pt`, `pt-BR`, `pt-PT` etc.), utilizar `/pt`.
- Se for inglês ou qualquer idioma não suportado, utilizar `/en`.
- Na ausência de preferência identificável, utilizar `/en`.
- URLs explicitamente prefixadas nunca devem redirecionar automaticamente para outro idioma.
- A troca manual entre português e inglês deve estar sempre disponível.

A negociação deverá respeitar a ordem de preferência e os pesos `q` do cabeçalho HTTP. Não presumir que ele representa necessariamente o idioma real do sistema operacional, pois navegadores podem modificar suas preferências enviadas.

**Implementação recomendada:** Cloudflare Pages Functions para os redirecionamentos, mantendo todas as páginas localizadas estáticas.

Utilizar redirecionamentos temporários (`302`), `Cache-Control: no-store` e `Vary: Accept-Language`, verificando também as regras de cache configuradas na Cloudflare.

Caminhos conhecidos sem prefixo, como `/cv`, `/blog`, `/consultorias`, `/consulting`, `/pagamentos`, `/payments` e `/keys`, poderão redirecionar para as rotas localizadas correspondentes. Não criar conteúdo duplicado nesses caminhos. URLs desconhecidas devem continuar retornando `404`.

Restringir a execução das Pages Functions às rotas necessárias com `public/_routes.json`, evitando processamento desnecessário de páginas e recursos estáticos.

A raiz `/` também deverá possuir uma página HTML estática mínima de fallback, com acesso manual aos dois idiomas, para ambientes sem a função de redirecionamento. Na Cloudflare, a Function terá responsabilidade pelo redirecionamento automático.

O comportamento na rede Tor será adaptado posteriormente, sem depender da Cloudflare.

### 3.2. SEO internacional

- Utilizar `lang="pt-BR"` e `lang="en"` no elemento HTML.
- Definir títulos, descrições e URLs canônicas por página.
- Publicar relações `hreflang` entre versões equivalentes.
- Utilizar `/` como possível referência `x-default` para os hubs.
- Incluir páginas localizadas no sitemap.
- Não redirecionar visitantes que escolheram manualmente um idioma.
- Não criar versões inexistentes de artigos apenas para completar relações `hreflang`.

## 4. Seções e identidade visual

### 4.1. Hub pessoal

O hub será extremamente minimalista, semelhante em simplicidade a uma página HTML com CSS básico ou a um Linktree pessoal.

**Conteúdo:**

- Nome e identificação pessoal.
- Links para as principais seções e alternância de idioma.
- Contatos e perfis externos relevantes.
- Link para o endereço onion existente.

**Direção visual:**

- Coluna única, largura limitada e muito espaço em branco.
- Fundo branco e texto preto, independentemente da preferência normal de tema do sistema.
- Tipografia padrão do navegador, sem fontes externas ou família tipográfica imposta.
- Links simples, sublinhados e facilmente identificáveis.
- Sem painéis complexos, animações de entrada, efeitos decorativos ou aparência de aplicativo.
- Responsividade natural, com CSS mínimo.

O endereço onion será divulgado exclusivamente nos hubs `/pt` e `/en`, sem repetição nas demais páginas do site.

**E-mails no Hub:**

- Português: `eu@joaofogaca.com`.
- Inglês: `me@joaofogaca.com`.

Os dois endereços pertencem à mesma infraestrutura de e-mail e não representam identidades separadas.

### 4.2. Currículo

Currículo público, geral e bilíngue, disponível em `/pt/cv` e `/en/cv`, com conteúdo mantido em Markdown.

A página apresenta identificação e contatos profissionais, experiências, formação acadêmica, projetos relevantes, habilidades e idiomas.

Priorizar clareza, verificabilidade e leitura rápida. O currículo deve atender recrutadores e potenciais parceiros sem se transformar em um inventário extenso de ferramentas.

A versão pública não exige um resumo profissional específico. Currículos em PDF poderão ser preparados e adaptados para oportunidades concretas, com seleção de experiências, competências e uma apresentação direcionada quando pertinente.

Certificações, publicações científicas e contribuições relevantes a projetos open source poderão ser incluídas conforme existirem resultados verificáveis, preferencialmente acompanhados de referências públicas.

A apresentação deve permanecer documental, acessível e consistente entre os idiomas, sem exigir que as duas versões sejam traduções literais.

Não incluir experiências, títulos, níveis de proficiência ou resultados que não possam ser demonstrados.

### 4.3. Consultoria

Página dedicada à apresentação de serviços e à captação de potenciais clientes.

Pode utilizar identidade visual própria, mais moderna e comercial que o restante do site, sem exigir outro domínio, repositório ou aplicação.

**Objetivos:**

- Explicar de forma clara os problemas que posso ajudar a resolver.
- Apresentar serviços e escopo de atuação.
- Comunicar experiência e qualificações verificáveis.
- Oferecer um meio direto de contato.
- Proporcionar boa experiência de navegação em dispositivos móveis.

**E-mails profissionais:**

- Português: `contato@joaofogaca.com`.
- Inglês: `contact@joaofogaca.com`.

Evitar linguagem comercial genérica, promessas sem evidências, depoimentos fictícios e apresentação como empresa consolidada antes de existir uma estrutura correspondente.

O conteúdo será desenvolvido progressivamente conforme os serviços forem definidos.

### 4.4. Blog

O blog terá apresentação textual extremamente simples, inspirada na densidade informacional do Hacker News, mas com identidade visual própria.

A prioridade será o conteúdo, não a interface.

**Listagem de artigos:**

- Links de títulos em formato compacto.
- Datas e categorias discretas.
- Índices mantidos manualmente em Markdown, com publicações organizadas preferencialmente da mais recente para a mais antiga.
- Navegação simples e responsiva.
- Sem cartões grandes, imagens de capa obrigatórias, animações ou elementos decorativos excessivos.

**Páginas dos artigos:**

- Tipografia confortável para leitura prolongada.
- Largura de texto controlada.
- Títulos e subtítulos bem hierarquizados.
- Blocos de código legíveis e acessíveis.
- Links, listas, tabelas e imagens somente quando necessários.
- Sem comentários, votos, contas de usuário ou funcionalidades sociais por padrão.

**Conteúdo:**

Tecnologia, Linux, infraestrutura, segurança, privacidade, Homelab, IA, negócios, economia, estratégia, empreendedorismo, experiências e reflexões pessoais.

Os artigos serão escritos prioritariamente em Markdown, com metadados de título, descrição, data, idioma, slug e assuntos. A data de atualização poderá ser informada quando pertinente.

Não será obrigatório traduzir cada publicação.

Prever feed RSS por idioma e sitemap. Categorias e paginação só deverão ser implementadas quando o volume de conteúdo justificar.

Não utilizar sistema de comentários por padrão.

### 4.5. Pagamentos e doações

Página estática com informações e QR codes de:

- Bitcoin.
- Lightning.
- Monero.
- Pix.

Distinguir contribuições voluntárias de eventuais pagamentos comerciais.

Os endereços devem estar disponíveis em texto selecionável, com QR codes e links de pagamento quando os protocolos permitirem. Não adicionar JavaScript apenas para oferecer botões de cópia automática.

Nunca incluir chaves privadas, seeds, credenciais financeiras ou outros dados sensíveis no repositório.

### 4.6. Identidade criptográfica

As páginas `/pt/keys` e `/en/keys` deverão disponibilizar:

- Certificado público OpenPGP completo, para consulta e download.
- Fingerprint da chave primária.
- Orientações para confirmar a identidade por referências independentes.
- Informações sobre WKD, quando implementado.

Um único certificado público OpenPGP será compartilhado entre as duas páginas, contendo a chave primária de certificação, as subchaves públicas de assinatura e criptografia e seus vínculos criptográficos. O fingerprint primário será a referência principal de identificação, e os fingerprints das subchaves também serão apresentados.

**Princípio de autenticidade:**

> A publicação de uma chave neste domínio não comprova, por si só, sua autenticidade. A confiança deve resultar da verificação do fingerprint por um canal independente e confiável.

Publicar somente material público. Nunca incluir chaves privadas ou backups de chaves no projeto.

O WKD será tratado separadamente das páginas HTML, respeitando os caminhos previstos no protocolo, os UIDs do certificado e os endereços do domínio `joaofogaca.com`.

A publicação da chave OpenPGP não deve ser apresentada como integração nativa de criptografia com o provedor de e-mail.

**Assinaturas digitais:**

- Não assinar individualmente os artigos por padrão.
- Para documentos específicos, disponibilizar o arquivo e sua assinatura destacada correspondente, como `documento.pdf.asc`.
- Preferir links para os artefatos publicados em locais apropriados, sem transformar o site em um repositório de documentos.

## 5. Arquitetura do projeto

Utilizar um único repositório `joaofogaca.com`, com conteúdo e apresentação separados.

A estrutura abaixo é a **estrutura-alvo planejada**, não uma exigência de criar todos os diretórios vazios na inicialização.

```text
joaofogaca.com/
├── functions/
│   ├── index.js
│   └── [slug].js
│
├── public/
│   ├── .well-known/
│   │   ├── nostr.json
│   │   └── openpgpkey/              # Futuro WKD
│   ├── keys/
│   │   └── public.asc               # Certificado público OpenPGP
│   ├── images/
│   ├── _headers
│   ├── _routes.json
│   └── robots.txt
│
├── src/
│   ├── content/
│   │   ├── pages/
│   │   │   ├── pt/
│   │   │   │   ├── hub.md
│   │   │   │   ├── cv.md
│   │   │   │   ├── blog.md
│   │   │   │   ├── pagamentos.md
│   │   │   │   └── keys.md
│   │   │   └── en/
│   │   │       ├── hub.md
│   │   │       ├── cv.md
│   │   │       ├── blog.md
│   │   │       ├── payments.md
│   │   │       └── keys.md
│   │   └── blog/
│   │       ├── pt/
│   │       │   └── exemplo-de-artigo.md
│   │       └── en/
│   │           └── example-article.md
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── [lang].astro
│   │   ├── [lang]/
│   │   │   ├── cv.astro
│   │   │   ├── keys.astro
│   │   │   └── blog/
│   │   │       ├── index.astro
│   │   │       └── [...slug].astro
│   │   ├── pt/
│   │   │   ├── consultorias.astro
│   │   │   └── pagamentos.astro
│   │   └── en/
│   │       ├── consulting.astro
│   │       └── payments.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── ConsultingLayout.astro
│   │
│   ├── styles/
│   │   ├── base.css
│   │   ├── blog.css
│   │   └── consulting.css
│   │
│   └── content.config.ts
│
├── astro.config.mjs
├── package.json
├── package-lock.json
├── .node-version
├── .gitignore
└── README.md
```

### 5.1. Responsabilidades

- **`src/content/`:** conteúdo das páginas institucionais, índices manuais do blog e artigos em Markdown, incluindo links de retorno ao início e troca de idioma, exceto na interface personalizada de consultoria.
- **`src/pages/`:** definição das rotas, seleção e renderização do conteúdo e associação com os layouts, além da implementação das páginas personalizadas de consultoria.
- **`src/layouts/`:** estruturas HTML reutilizáveis, sem impor uma identidade visual única.
- **`src/styles/`:** estilos separados conforme a necessidade de cada seção.
- **`src/content.config.ts`:** definição e carregamento das coleções de conteúdo, com validação quando necessária.
- **`public/`:** recursos estáticos, certificados públicos, arquivos de verificação e configurações de publicação.
- **`functions/`:** redirecionamentos HTTP executados pela Cloudflare.

As rotas dinâmicas do Astro deverão utilizar `getStaticPaths()` para gerar as páginas durante o build.

A internacionalização poderá compartilhar componentes quando isso reduzir duplicação, mas não deverá exigir que todas as páginas utilizem o mesmo layout.

O arquivo `src/pages/index.astro` servirá como fallback estático para a raiz, enquanto a Cloudflare Pages Function realizará o redirecionamento por idioma na hospedagem principal.

### 5.2. Conteúdo Markdown

Utilizar Astro Content Collections com o carregador `glob()` para organizar os artigos e as páginas institucionais, exceto a interface personalizada de consultoria.

As páginas institucionais e os índices do blog serão mantidos em Markdown, sem frontmatter ou schema obrigatórios. O conteúdo incluirá os links de navegação, retorno ao início e troca manual de idioma. Os metadados HTML permanecerão sob responsabilidade das rotas e layouts Astro.

Os artigos poderão utilizar frontmatter mínimo para informações necessárias à publicação, SEO e geração de feeds. Schemas de validação serão adotados somente quando houver necessidade concreta.

Evitar armazenar apresentações, experiências, artigos ou textos extensos em objetos TypeScript ou JSON.

Não utilizar MDX inicialmente. Componentes específicos poderão ser incorporados posteriormente, se Markdown convencional se mostrar insuficiente.

Arquivos de configuração devem permanecer pequenos. Não criar sistemas próprios de gerenciamento de conteúdo, bibliotecas internas ou abstrações para funcionalidades ainda inexistentes.

### 5.3. Recursos estáticos e protocolos

Arquivos exigidos por protocolos externos não devem receber prefixo de idioma.

Exemplos:

- `/.well-known/nostr.json`
- `/.well-known/openpgpkey/...`
- `/keys/public.asc`
- `/robots.txt`

A identificação Nostr NIP-05 utiliza `public/.well-known/nostr.json`, com os identificadores `fajre` e `_` associados à mesma chave pública. O arquivo `public/_headers` configura CORS para permitir a consulta por clientes externos.

O certificado público OpenPGP deverá ser verificado antes da publicação e atualizado quando houver alterações relevantes nas chaves, subchaves, expiração ou revogação. O WKD será implementado e validado separadamente.

## 6. Publicação e migração

### 6.1. Git e GitHub

O projeto utilizará um único repositório no GitHub e um espelho no Codeberg, com branch principal `main`.

O projeto utiliza Conventional Commits:

- `feat`: nova funcionalidade.
- `fix`: correção de comportamento.
- `docs`: documentação ou conteúdo editorial.
- `refactor`: reorganização interna sem alteração funcional.
- `style`: mudanças de apresentação que não alteram o comportamento.
- `perf`: otimização de desempenho.
- `test`: testes.
- `ci`: automação e integração contínua.
- `chore`: manutenção geral e dependências.

Escopos opcionais incluem `hub`, `cv`, `consulting`, `blog`, `payments`, `keys`, `i18n`, `seo` e `deploy`.

Exemplos:

- `docs(cv): update experience` — atualizar experiência.
- `feat(i18n): add locale routing` — adicionar roteamento por idioma.
- `fix(seo): correct canonical URLs` — corrigir URLs canônicas.
- `chore(deps): update Astro` — atualizar Astro.

Utilizar branches de trabalho quando apropriado, preservando a estabilidade da branch de produção.

### 6.2. Cloudflare Pages

Manter deploy automatizado via integração Git.

**Configuração planejada:**

| Campo | Valor |
|---|---|
| Branch de produção | `main` |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |
| Renderização | Estática |
| Redirecionamento de idioma | Pages Functions |

Fixar explicitamente uma versão Node.js LTS compatível com o Astro, preferencialmente por `.node-version`, verificando sua utilização no ambiente de build da Cloudflare.

Utilizar `npm ci` para instalações reproduzíveis quando houver `package-lock.json`.

As Pages Functions devem atuar apenas nas rotas necessárias. Não encaminhar todas as requisições estáticas por uma Function.

### 6.3. Rede Tor

Preservar o endereço onion já existente.

A infraestrutura atual utiliza o Homelab e um fluxo Git separado para gerar e distribuir a versão estática no serviço onion.

A adaptação ocorrerá **depois da migração inicial para o Cloudflare Pages**.

O serviço onion deverá:

- Servir conteúdo estático independentemente da Cloudflare.
- Preservar as rotas localizadas e os recursos públicos.
- Permitir acesso manual a português e inglês.
- Reproduzir ou adaptar a negociação de idioma na raiz, quando viável.
- Continuar funcionando com JavaScript desativado.

Até a atualização, a implantação onion anterior poderá continuar acessível, sem ser apresentada como versão necessariamente idêntica à nova.

### 6.4. Migração para produção

**A primeira publicação não depende da conclusão de todas as seções.**

O lançamento inicial deverá incluir:

- Hubs `/pt` e `/en` funcionais.
- Navegação entre idiomas.
- Todas as rotas principais definidas.
- Páginas incompletas com mensagens discretas de “Em breve” e “Coming soon” (Em breve).
- Redirecionamento por idioma funcionando na Cloudflare.
- Metadados e acessibilidade básicos.
- Preservação dos arquivos de validação existentes.

O novo projeto será testado localmente antes de assumir `joaofogaca.com`.

Após a publicação inicial, currículo, consultoria, blog, pagamentos e identidade criptográfica serão desenvolvidos progressivamente.

## 7. Qualidade

### 7.1. Performance

Priorizar entrega estática, CSS enxuto, tipografia eficiente, imagens otimizadas, ausência de JavaScript no navegador e mínimo de recursos externos.

**Metas de Core Web Vitals:**

- LCP ≤ 2,5 s.
- INP ≤ 200 ms.
- CLS ≤ 0,1.

Buscar pontuação máxima nas quatro categorias do Lighthouse: Performance, Accessibility (acessibilidade), Best Practices (boas práticas) e SEO.

A pontuação de 100 não é condição absoluta de publicação nem substitui medições reais e testes manuais.

### 7.2. Acessibilidade

Adotar WCAG 2.2 AA como referência.

Priorizar:

- HTML semântico e hierarquia correta de títulos.
- Navegação integral por teclado.
- Indicadores de foco visíveis.
- Contraste e legibilidade.
- Layout responsivo e suporte a zoom.
- Links descritivos e alvos de interação adequados.
- Compatibilidade com leitores de tela.
- Respeito a `prefers-reduced-motion`.
- Independência de JavaScript no navegador.

Validar com ferramentas automáticas e inspeção manual.

### 7.3. SEO

Implementar:

- Títulos e descrições individuais.
- URLs canônicas e `hreflang`.
- Sitemap e `robots.txt`.
- Metadados Open Graph.
- Dados estruturados quando realmente pertinentes.
- Feed RSS para o blog.
- Links internos claros e URLs permanentes.

Páginas provisórias sem conteúdo substantivo poderão utilizar `noindex` até ficarem prontas.

Não criar páginas vazias apenas para aumentar a quantidade de URLs indexadas.

### 7.4. Preparação para agentes de IA

Priorizar conteúdo integral no HTML, navegação previsível, marcação semântica e informações públicas facilmente identificáveis.

Considerar critérios de avaliação de iniciativas como IsItAgentReady, is-agentic.com e AgentReady, sem transformá-los em requisitos absolutos.

Recursos experimentais como `llms.txt` poderão ser avaliados posteriormente.

Não adicionar MCP, APIs, autenticação ou outros protocolos apenas para obter melhores pontuações em ferramentas de avaliação.

### 7.5. Privacidade e segurança

- Não instalar analytics ou rastreadores por padrão.
- Evitar scripts, fontes e recursos de terceiros sem justificativa.
- Não publicar senhas, tokens, chaves privadas ou dados sensíveis do Homelab.
- Manter dependências atualizadas e revisar novas inclusões.
- Utilizar HTTPS e cabeçalhos de segurança adequados.
- Preservar a configuração DNSSEC existente.
- Evitar formulários e coleta de dados sem necessidade.
- Avaliar implicações de privacidade dos endereços de pagamento.

## 8. Desenvolvimento e validação

A versão real das dependências será registrada em `package.json` e `package-lock.json`.

**Comandos previstos:**

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Para testar a integração com Cloudflare Pages Functions, utilizar Wrangler, preferencialmente de forma isolada quando isso simplificar o ambiente local.

Antes de publicar alterações relevantes, verificar geração estática, rotas, redirecionamentos, acessibilidade básica, ausência de JavaScript no navegador e integridade dos recursos públicos.
