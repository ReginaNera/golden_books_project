import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { RouterModule } from '@angular/router';
import { BookService } from './services/books.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    HttpClientModule


  ],
  declarations: [
    
    
  ],
  exports: [
  ],
  providers: [
    BookService
  ]


})
export class SharedModule { }