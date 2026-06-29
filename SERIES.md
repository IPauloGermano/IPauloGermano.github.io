# Guia de séries de artigos

Este projeto possui suporte nativo a séries de artigos usando Astro Content Collections.

Uma série é uma sequência ordenada de artigos, útil para estudos longos, projetos em andamento ou conteúdos divididos em partes. A fonte oficial dos metadados da série fica em `src/data/series.ts`; os artigos apenas informam a qual série pertencem e qual é sua posição.

## Índice

- [Como funciona](#como-funciona)
- [Fonte oficial das séries](#fonte-oficial-das-séries)
- [Como criar uma nova série](#como-criar-uma-nova-série)
- [Como adicionar um artigo a uma série](#como-adicionar-um-artigo-a-uma-série)
- [Ordenação](#ordenação)
- [Validações do build](#validações-do-build)
- [Páginas geradas](#páginas-geradas)
- [Navegação dentro dos artigos](#navegação-dentro-dos-artigos)
- [Drafts](#drafts)
- [Exemplo completo](#exemplo-completo)
- [Como testar localmente](#como-testar-localmente)
- [Boas práticas](#boas-práticas)

## Como funciona

O sistema usa três peças:

1. `src/data/series.ts` cadastra as séries existentes.
2. O frontmatter do artigo informa `series.id` e `series.order`.
3. As páginas `/series` e `/series/[id]` são geradas automaticamente apenas com artigos publicados.

O título e a descrição da série vêm do catálogo em `src/data/series.ts`. O frontmatter dos artigos não é a fonte oficial desses metadados.

## Fonte oficial das séries

As séries são cadastradas em `src/data/series.ts` no objeto `seriesCatalog`.

Cada entrada deve ter:

- `title`: nome público da série.
- `description`: descrição curta da série.

O `id` da série é a chave do objeto e deve ser usado no frontmatter dos artigos.

Regra importante: sempre que um artigo usar `series.id`, esse mesmo id precisa existir em `src/data/series.ts`. O artigo informa que pertence a uma série; o catálogo informa que essa série existe e quais são seu título e descrição.

Se ainda não houver nenhuma série real, mantenha o catálogo vazio:

```ts
export const seriesCatalog = {} as const;

export type SeriesId = keyof typeof seriesCatalog;
```

Exemplo didático de uma série demo, apenas para entender o formato:

```ts
export const seriesCatalog = {
  'demo-series': {
    title: 'Demonstração de séries',
    description: 'Série de exemplo usada apenas para entender como o cadastro funciona.'
  }
} as const;

export type SeriesId = keyof typeof seriesCatalog;
```

Nesse caso, o id oficial da série seria `demo-series`.

## Como criar uma nova série

Adicione uma nova entrada em `src/data/series.ts`.

Exemplo conceitual:

```ts
export const seriesCatalog = {
  parkflow: {
    title: 'Construindo o ParkFlow',
    description: 'Registro técnico da construção do ParkFlow, do levantamento de requisitos ao MVP.'
  }
} as const;
```

Depois disso, os artigos podem usar:

```yaml
series:
  id: parkflow
  order: 1
```

O valor de `series.id` no artigo deve ser exatamente igual à chave cadastrada no catálogo. No exemplo acima, o id é `parkflow` nos dois lugares.

## Como adicionar um artigo a uma série

No frontmatter do artigo Markdown ou MDX, adicione:

```yaml
series:
  id: parkflow
  order: 1
```

Campos:

- `id`: obrigatório quando `series` existir. Deve existir em `src/data/series.ts`.
- `order`: obrigatório quando `series` existir. Deve ser inteiro maior ou igual a `1`.

O campo `series.title` pode existir por compatibilidade com o schema, mas não deve ser usado como fonte oficial do nome da série. Use sempre `src/data/series.ts`.

Se o artigo usar um id que não existe no catálogo, o build falha de propósito. Isso evita publicar uma série sem página, título ou descrição oficiais.

Exemplo usando a série demo da documentação:

```yaml
---
title: "Artigo de demonstração da série"
description: "Exemplo de frontmatter para entender séries."
publishedAt: 2026-06-29
tags:
  - Demo
draft: true
series:
  id: demo-series
  order: 1
---
```

Repare que o valor `demo-series` aparece nos dois lugares:

```txt
src/data/series.ts      -> 'demo-series'
frontmatter do artigo   -> id: demo-series
```

## Ordenação

A ordem da série é baseada somente em `series.order`.

O sistema não usa:

- data de publicação;
- slug;
- ordem alfabética;
- posição no diretório.

Exemplo:

```yaml
series:
  id: parkflow
  order: 2
```

Esse artigo será a parte 2 da série `parkflow`.

## Validações do build

Durante o build, o projeto interrompe a execução com `throw new Error(...)` quando encontra uma série inválida.

Validações implementadas:

- `series.id` inexistente em `src/data/series.ts`;
- `series.order` ausente quando `series` existir;
- `series.order` não inteiro;
- `series.order` menor que `1`;
- ordens duplicadas dentro da mesma série;
- lacunas na ordem da série.

Exemplo de lacuna:

```yaml
# existe parte 1
series:
  id: parkflow
  order: 1

# existe parte 3, mas não existe parte 2
series:
  id: parkflow
  order: 3
```

Nesse caso, o build falha porque a ordem precisa ser contínua começando em `1`.

## Páginas geradas

O projeto gera:

- `/series`
- `/series/[id]`

Exemplo:

```txt
/series/parkflow/
```

A página da série mostra:

- título;
- descrição;
- lista de artigos publicados;
- número da parte;
- data;
- status.

Como essas páginas são rotas estáticas do Astro, elas entram automaticamente no sitemap gerado durante o build.

## Navegação dentro dos artigos

Quando um artigo publicado pertence a uma série, a página individual mostra:

- um card no início do artigo com o nome da série;
- a posição atual, como `Parte 2 de 8`;
- navegação ao final do artigo para parte anterior, índice da série e próxima parte.

O link do índice usa hash para destacar a parte atual:

```txt
/series/parkflow/#parte-2
```

O destaque na página da série é feito via CSS com `:target`, sem JavaScript.

## Drafts

Artigos com:

```yaml
draft: true
```

não aparecem em:

- `/series`;
- `/series/[id]`;
- busca pública;
- RSS;
- sitemap;
- artigos relacionados públicos.

Mesmo sendo drafts, eles ainda passam pelas validações de série. Isso ajuda a encontrar problemas antes da publicação.

## Exemplo completo

Cadastro da série em `src/data/series.ts`:

```ts
export const seriesCatalog = {
  parkflow: {
    title: 'Construindo o ParkFlow',
    description: 'Do levantamento de requisitos ao MVP.'
  }
} as const;
```

Frontmatter do primeiro artigo:

```yaml
---
title: "ParkFlow: levantamento de requisitos"
description: "Como os requisitos iniciais do ParkFlow foram definidos."
publishedAt: 2026-06-28
tags:
  - Projetos
  - Requisitos
draft: false
series:
  id: parkflow
  order: 1
---
```

Frontmatter do segundo artigo:

```yaml
---
title: "ParkFlow: protótipo e MVP"
description: "Como o protótipo evoluiu para o MVP."
publishedAt: 2026-07-05
tags:
  - Projetos
  - MVP
draft: false
series:
  id: parkflow
  order: 2
---
```

## Como testar localmente

Execute:

```bash
npm run build
npm run preview
```

Depois acesse:

```txt
http://localhost:4321/series
```

Observação: séries contendo somente artigos `draft: true` não aparecem publicamente. Para testar a interface pública de uma série, use artigos publicados ou altere temporariamente um draft em ambiente local e reverta antes de commitar.

## Boas práticas

- Cadastre sempre a série em `src/data/series.ts` antes de usar o `series.id`.
- Use ids curtos, estáveis e sem acentos, como `parkflow`, `astro-seo` ou `diario-de-estudos`.
- Mantenha `series.order` contínuo: `1`, `2`, `3`, sem pular números.
- Não use data para controlar ordem de leitura.
- Não publique partes futuras como `draft: false` antes da hora.
- Antes de subir para o GitHub Pages, rode `npm run build`.
