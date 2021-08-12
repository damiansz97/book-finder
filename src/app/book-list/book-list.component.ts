import { Component, OnInit } from '@angular/core';
import {BookService} from "../book.service";
import {Book} from "../models/book.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  constructor(private bookService: BookService, private router: Router) {
  }

  searchQuery: string = 'test';
  books: Book[] = [];
  loading: boolean = false;

  handleSearch(): void {
    this.loading = true;
    this.bookService.findBook(this.searchQuery)
      .subscribe((books: Book[]) => {
        this.books = books;
        this.loading = false;
      });
  }

  navigate(book: Book): void {
    this.router.navigate(['/books', book.id]);
  }
}
