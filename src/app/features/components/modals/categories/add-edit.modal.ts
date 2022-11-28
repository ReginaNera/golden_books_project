import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/features/models/category';

@Component({
  templateUrl: './add-edit.modal.html',
  styleUrls: ['add-edit.modal.scss'],

})
export class UpdateCategoryComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  returnValue!: string;
  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
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
