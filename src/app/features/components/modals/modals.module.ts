import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../shared/modules/angular-material.module';
import { AddBookComponent } from './books/add-book/add-book.modal';
import { BookDetailsComponent } from './books/book-details/book-details.modal';
import { UpdateCategoryComponent } from './categories/add-edit.modal';
import { DeleteCategoryComponent } from './delete.modal.ts/delete.modal';


@NgModule({
  declarations: [UpdateCategoryComponent, DeleteCategoryComponent, AddBookComponent, BookDetailsComponent],
  imports: [AngularMaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
  exports: [ UpdateCategoryComponent, DeleteCategoryComponent],
})
export class ModalModule {}
