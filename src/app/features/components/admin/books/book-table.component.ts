import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay, isEmpty, Observable } from 'rxjs';
import { Book } from 'src/app/features/models/book';
import { Category } from 'src/app/features/models/category';
import { BookService } from 'src/app/shared/services/books.service';
import { CategoryService } from 'src/app/shared/services/categories.service';
import { AddBookComponent } from '../../modals/books/add-book/add-book.modal';
import { BookDescriptionComponent } from '../../modals/books/book-description/book-description.modal';
import { BookDetailsComponent } from '../../modals/books/book-details/book-details.modal';
import { DeleteCategoryComponent } from '../../modals/delete.modal.ts/delete.modal';

@Component({
  templateUrl: './books-table.component.html',
  styleUrls: ['/books-table.component.scss']
})
export class BooksComponent implements OnInit {
    books$ : Observable<Book[]>
    books: Book[];
    book: Book;
    authors: string [] =[];
    categories: Category[] =[];
    bookColumns: string[] = [
        'Action',
        'Image',
        'Title',
        'Author',
        'Year',
        'Categories',
        'Description',
        'ISBN',
        'Reviewer',
        'Overview'
      ];
    pageSize: number = 5;
    pageSizeOptions: number[] = [5, 10, 20];
    dataSource!: MatTableDataSource<Book>;
  
    @ViewChild('paginator') paginator!: MatPaginator;
  title: string = 'Admin Books';
  constructor(private bookService: BookService, private categoryService: CategoryService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllCategories()
  }

  getAllBooks() {
    this.bookService.fetchBooks();
    this.books$=this.bookService.books();
    this.getBooks();
  }


  getAllCategories() {
    this.categoryService.categories().subscribe((categories) => {
        this.categories=categories;
    });
    
  }

  getBooks() {
    this.books$.subscribe(books =>
      {
        this.books=books;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
        console.log(this.authors)
        this.books.forEach((book) => {
          if(this.authors == null || !this.authors.find(x=>x === book.Author))
          {
              this.authors.push(book.Author)
          }
        })
      });

  }

  ReadMore(book : Book) { 
    const dialogRef = this.dialog.open(BookDescriptionComponent, {
      data: {
        book
      },
    });
  }

  OnEdit(book : Book) {
    let title = "Edit Book"
    let authors = this.authors;
    let categories = this.categories;
    let id= book.id;
    const dialogRef = this.dialog.open(AddBookComponent, {
      data: {
        book,
        title,
        authors,
        categories
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      book = result.book;
      book.id=id
      this.bookService.updateBook(book).subscribe((res) => {
      const itemUpdate = this.books.find(d => d.id === book.id);
       itemUpdate.Title=book.Title;
       itemUpdate.Author=book.Author;
       itemUpdate.Categories = book.Categories;
       itemUpdate.Description = book.Description;
       itemUpdate.ISBN = book.ISBN;
       itemUpdate.Year=book.Year;
       itemUpdate.ImageUrl = book.ImageUrl;       
    },
    (error) => {
        console.log(error);
    });
  });
}

    AddBook() {
      let book = this.book;
      let title = "Add Book"
      let authors = this.authors
      let categories = this.categories;
      const dialogRef = this.dialog.open(AddBookComponent, {
        data: {
          book,
          title,
          authors,
          categories

        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result)
        let book = new Book();
        let count= this.books.length;
        book=result.book;
        book.id=count +1;
            
      this.bookService.addBook(book).subscribe((res) => {
            console.log(res);
            this.books.push(book);
      },
      (error) => {
          console.log(error);
      });
    });
  }

  OnDelete(id : number){
    const dialogRef = this.dialog.open(DeleteCategoryComponent);
   
    dialogRef.afterClosed().subscribe((result) => {
       this.bookService.deleteBook(id).subscribe((res) => {
        
       },
       (error) => {
           console.log(error);
       });
      
    });
  }


  bookDetails(book : Book)
  {
    const dialogRef = this.dialog.open(BookDetailsComponent);
   

  }

}


 

