import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  templateUrl: './book-description.modal.html'
})
export class BookDescriptionComponent implements OnInit {
  submitted: boolean = false;
  returnValue!: string;
  constructor(
    public dialogRef: MatDialogRef<BookDescriptionComponent>,
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
    this.dialogRef.close(this.data.name);
  }
}
