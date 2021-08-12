export interface BookResponse {
  items: Array<SingleBookResponse>;
}

export interface SingleBookResponse {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    language: string;
    publishedDate: string;
    imageLinks: {
      thumbnail: string;
    }
  }
}

