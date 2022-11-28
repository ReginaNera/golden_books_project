import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  templateUrl: './book-details.modal.html'
})
export class BookDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data)

    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancelClick();
      }
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.onCancelClick();
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
