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
];