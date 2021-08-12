import {Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../book.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book?: Book;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService) {
    const id = this.activatedRoute.snapshot.params.id;
    this.getBook(id);
  }

  getBook(id: string): void {
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
    })
  }

}
