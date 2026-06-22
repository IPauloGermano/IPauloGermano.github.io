# PauloGerm.dev

Blog técnico e registro de projeto em Astro, TypeScript, Markdown e CSS puro.

## Requisitos

- Node.js 22.12 ou superior.
- npm 9.6.5 ou superior.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:4321`.

Se a porta `4321` estiver ocupada:

```bash
npm run dev -- --port 4322
```

## Scripts

- `npm run dev`: inicia o servidor local de desenvolvimento.
- `npm run build`: gera a versão estática em `dist/`.
- `npm run preview`: serve localmente o build gerado.

## Estrutura

- `src/content/blog`: artigos em Markdown.
- `src/pages/index.astro`: página inicial e arquivo cronológico.
- `src/pages/projetos/index.astro`: página de projetos, atualmente com o ParkFlow.
- `src/components/SiteShell.astro`: cabeçalho, busca, tema e rodapé.
- `src/styles/global.css`: identidade visual completa.
- `src/pages/rss.xml.ts`: feed RSS sem dependência externa.

## Criar artigo

```md
---
title: "Título"
description: "Resumo"
publishedAt: 2026-06-22
tags: ["Assunto"]
featured: false
draft: false
---

Conteúdo do artigo.
```

## Antes de publicar

1. Ajuste `site` em `astro.config.mjs` para o domínio real.
2. Confirme o endereço do GitHub em `SiteShell.astro` e na página Sobre.
3. Revise os textos e remova qualquer artigo de exemplo que não queira publicar.
4. Rode `npm run build`.
5. Confirme que `package-lock.json` será versionado.
6. No GitHub, configure Pages para usar GitHub Actions.

## Licença

O código-fonte deste projeto está disponível sob a licença MIT.

Os artigos, textos, imagens, identidade visual e demais conteúdos autorais não
estão cobertos pela licença MIT e permanecem com todos os direitos reservados.

Consulte:

- `LICENSE`
- `CONTENT-NOTICE.md`
