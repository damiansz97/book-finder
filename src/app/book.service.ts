import {Injectable} from '@angular/core';
import {Book} from "./models/book.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BookResponse, SingleBookResponse} from "./models/book-response.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  findBook(query: string): Observable<Book[]> {
    return this.http.get<BookResponse>
    ('https://www.googleapis.com/books/v1/volumes', {
      params: {q: query}
    })
      .pipe(map(((response: BookResponse) => {
        return response.items.map(book => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            language: book.volumeInfo.language,
            imageUrl: book.volumeInfo.imageLinks?.thumbnail
          };
        }) as Book[];
      })));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<SingleBookResponse>
    (`https://www.googleapis.com/books/v1/volumes/${id}`)
      .pipe(map(book => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          language: book.volumeInfo.language,
          imageUrl: book.volumeInfo.imageLinks?.thumbnail
        };
      }))
  }
}
