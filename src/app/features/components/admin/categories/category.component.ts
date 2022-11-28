import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookService } from 'src/app/shared/services/books.service';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/features/models/category';
import { CategoryService } from 'src/app/shared/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from '../../modals/categories/add-edit.modal';
import { TitleStrategy } from '@angular/router';
import { DeleteCategoryComponent } from '../../modals/delete.modal.ts/delete.modal';


@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$ : Observable<Category[]>
  categories : Category[]
  name!: string;

  constructor(private categoryService : CategoryService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
     this.getCategories();
    
  }

  getCategories() {
    this.categoryService.fetchCategories();
    this.categories$=this.categoryService.categories();
    this.categories$.subscribe((cats) => {
       this.categories = cats;
    })
  }
  editCategory(category : Category) { 
      const dialogRef = this.dialog.open(UpdateCategoryComponent, {
        data: {
          name: category.name,
          title: "Edit Category"
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
          let count= this.categories.length;
          let updatecategory = new Category();
          updatecategory.id=category.id;
          updatecategory.name= result;
          if (result.data != "" && !this.categories.includes(result)){
         this.categoryService.updateCategory(updatecategory).subscribe((res) => {
          const itemUpdate = this.categories.find(d => d.id === category.id);
          itemUpdate.name = result;
         },
         (error) => {
             console.log(error);
         });
        }
      });
    }
  

  addCategory() {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      data: {
        name: this.name,
        title: "Add Category"
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
        let count= this.categories.length;
        let category = new Category();
        category.id=count +1;
        category.name= result;
        if (result.data != "" && !this.categories.includes(result)){
       this.categoryService.addCategory(category).subscribe((res) => {
        console.log(res);
        this.categories.push(category)
       },
       (error) => {
           console.log(error);
       });
      }
    });
  }


  deleteCategory(id: number) {
    const dialogRef = this.dialog.open(DeleteCategoryComponent);
   
    dialogRef.afterClosed().subscribe((result) => {
       this.categoryService.deleteCategory(id).subscribe((res) => {
        
       },
       (error) => {
           console.log(error);
       });
      
    });
  }
  }

  
  


