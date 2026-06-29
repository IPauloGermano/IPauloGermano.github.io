export type BookStatus = 'reading' | 'read' | 'want-to-read';

export type BookCover = {
  src: string;
  alt: string;
};

export type Book = {
  title: string;
  author?: string;
  status?: BookStatus;
  year?: number;
  description?: string;
  link?: string;
  cover?: BookCover;
  relatedSeriesIds?: string[];
};

export const books: Book[] = [
  {
    title: 'Entendendo Algoritmos',
    author: 'Aditya Y. Bhargava',
    status: 'reading',
    year: 2017,
    description:
      'Guia ilustrado sobre algoritmos, abordando pesquisa, ordenação, grafos, desempenho e exemplos em Python.',
    link: 'https://novatec.com.br/livros/entendendo-algoritmos/',
    cover: {
      src: 'https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575225639.jpg',
      alt: 'Capa do livro Entendendo Algoritmos',
    },
  },
  {
    title: 'Refatoração - 2ª Edição',
    author: 'Martin Fowler',
    status: 'want-to-read',
    year: 2020,
    description:
      'Livro sobre refatoração de código, melhoria do design de sistemas existentes, identificação de code smells, testes e técnicas para tornar o código mais limpo, seguro e fácil de manter.',
    link: 'https://novatec.com.br/livros/refatoracao/',
    cover: {
      src: 'https://s3.novatec.com.br/capas/9788575227244.jpg',
      alt: 'Capa do livro Refatoração - 2ª Edição',
    },
  },
  {
    title: 'O Programador Pragmático',
    author: 'Andrew Hunt, David Thomas',
    status: 'want-to-read',
    year: 2010,
    description:
      'Livro sobre práticas profissionais de desenvolvimento de software, produtividade, comunicação, depuração, testes, automação e evolução contínua como programador.',
    link: 'https://www.amazon.com.br/Programador-Pragm%C3%A1tico-Aprendiz-Mestre/dp/8577807002',
    cover: {
      src: 'https://m.media-amazon.com/images/I/41WH7HFsbzL.jpg',
      alt: 'Capa do livro O Programador Pragmático: De Aprendiz a Mestre',
    },
  },
  {
    title: 'Arquitetura Limpa',
    author: 'Robert C. Martin',
    status: 'want-to-read',
    year: 2019,
    description:
      'Livro sobre princípios de arquitetura de software, separação de responsabilidades, limites entre componentes, regras de negócio, design sustentável e organização de sistemas fáceis de manter.',
    link: 'https://altabooks.com.br/produto/arquitetura-limpa/',
    cover: {
      src: 'https://altabooks.com.br/wp-content/uploads/2021/07/2021x3000_ArquiteturaLimpa_FRENTE-648x917.jpg',
      alt: 'Capa do livro Arquitetura Limpa',
    },
  },
    {
    title: 'Fundamentos da Arquitetura de Software',
    author: 'Mark Richards, Neal Ford',
    status: 'want-to-read',
    year: 2024,
    description:
      'Livro sobre arquitetura de software, padrões arquiteturais, componentes, acoplamento, coesão, decisões arquiteturais, habilidades sociais e práticas modernas de engenharia aplicadas ao design de sistemas.',
    link: 'https://altabooks.com.br/produto/fundamentos-da-arquitetura-de-software/',
    cover: {
      src: 'https://altabooks.com.br/wp-content/uploads/2024/04/CAPA_1000px_FundamentosdaArquiteturadeSoftware-648x944.webp',
      alt: 'Capa do livro Fundamentos da Arquitetura de Software',
    },
  },
  {
    title: "System Design Interview – An Insider's Guide",
    author: 'Alex Xu',
    status: 'want-to-read',
    year: 2020,
    description:
      'Livro sobre entrevistas de system design, arquitetura de sistemas escaláveis, estimativas, trade-offs, rate limiting, consistent hashing, URL shortener, web crawler, sistemas de notificação, feed de notícias, chat, autocomplete, YouTube e Google Drive.',
    link: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF',
    cover: {
      src: 'https://books.google.com/books/content?id=TZWmzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      alt: "Capa do livro System Design Interview – An Insider's Guide",
    },
  },
];
