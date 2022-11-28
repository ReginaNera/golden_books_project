import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/features/models/book';
import { BookDetailsComponent } from '../../modals/books/book-details/book-details.modal';
@Component({
  selector: 'app-book',
  templateUrl: 'book.component.html',
  styleUrls: ['book.component.scss']
})
export class BookComponent {

   @Input() book : Book
  constructor(public dialog: MatDialog) {
   }
   
   bookDetails(book : Book)
   {
     const dialogRef = this.dialog.open(BookDetailsComponent);
    
 
   }
}
