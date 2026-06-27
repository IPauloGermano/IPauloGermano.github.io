# Embeds em artigos

Os artigos usam Markdown puro. Para incorporar conteúdo externo, use sempre a mesma sintaxe:

```md
[embed: Título descritivo](https://url-da-plataforma)
```

O texto depois de `embed:` vira o `title` acessível do iframe ou vídeo. Links normais continuam funcionando normalmente; somente links cujo texto começa com `embed:` são transformados.

## Exemplos

### YouTube

```md
[embed: Aula sobre Astro](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```

Também são aceitos links `youtu.be`, `/embed/`, `/shorts/` e `/live/`.

### Vimeo

```md
[embed: Vídeo no Vimeo](https://vimeo.com/123456789)
```

### Loom

```md
[embed: Demonstração no Loom](https://www.loom.com/share/abc123)
```

### Spotify

```md
[embed: Episódio recomendado](https://open.spotify.com/episode/ID_DO_EPISODIO)
```

Também são aceitos `track`, `album`, `artist`, `playlist` e `show`.

### Google Drive Preview

```md
[embed: Arquivo no Drive](https://drive.google.com/file/d/ID_DO_ARQUIVO/view)
```

### Google Docs

```md
[embed: Documento de referência](https://docs.google.com/document/d/ID_DO_DOCUMENTO/edit)
```

Também funciona com documentos publicados em `/document/d/e/.../pub`.

### Google Slides

```md
[embed: Apresentação do projeto](https://docs.google.com/presentation/d/ID_DA_APRESENTACAO/edit)
```

### Google Sheets

```md
[embed: Planilha de acompanhamento](https://docs.google.com/spreadsheets/d/ID_DA_PLANILHA/edit)
```

### PDF público

Use preferencialmente arquivos locais públicos do próprio site:

```md
[embed: Documento em PDF](/docs/documento.pdf)
```

### GitHub Gist

```md
[embed: Snippet de configuração](https://gist.github.com/usuario/abcdef1234567890)
```

### CodePen

```md
[embed: Experimento de interface](https://codepen.io/usuario/pen/abc123)
```

### StackBlitz

```md
[embed: Projeto no StackBlitz](https://stackblitz.com/edit/projeto)
```

### CodeSandbox

```md
[embed: Sandbox React](https://codesandbox.io/s/exemplo-abc123)
```

### Figma

```md
[embed: Protótipo no Figma](https://www.figma.com/design/ID_DO_ARQUIVO/Nome)
```

Também são aceitos links `file`, `design`, `proto` e `board`.

### Excalidraw

```md
[embed: Diagrama no Excalidraw](https://link.excalidraw.com/readonly/abc123)
```

### Vídeo HTML5 local

```md
[embed: Demonstração em vídeo](/videos/demo.mp4)
```

São aceitos arquivos locais `.mp4`, `.webm` e `.ogg`.

## Segurança

O renderer só aceita:

- links HTTPS de plataformas permitidas;
- caminhos locais do próprio site para PDF ou vídeo HTML5;
- URLs reconhecidas pelos adaptadores existentes.

URLs fora da allowlist não são renderizadas como iframe. O artigo exibe uma mensagem amigável com link para o conteúdo original.

## Como adicionar uma nova plataforma

1. Crie um novo adaptador em `src/components/embed/adapters/`.
2. Normalize a URL pública para a URL segura de embed dentro do adaptador.
3. Reutilize um layout de `src/components/embed/config.ts` ou adicione um novo layout centralizado.
4. Adicione o domínio permitido em `allowedEmbedHostnames`.
5. Registre o adaptador em `src/components/embed/adapters/index.ts`.
6. Documente a nova plataforma neste arquivo.

O `EmbedRenderer` não deve receber regras específicas de plataformas. Ele apenas identifica o link editorial, valida a URL, seleciona o adaptador e renderiza o resultado.
