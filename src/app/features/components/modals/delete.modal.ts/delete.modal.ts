import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './delete.modal.html',
  styleUrls: ['./delete.modal.scss'],
})
export class DeleteCategoryComponent {
  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
