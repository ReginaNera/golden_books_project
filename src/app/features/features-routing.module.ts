import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { BooksComponent } from './components/admin/books/book-table.component';
import { CategoryComponent } from './components/admin/categories/category.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavSideComponent } from './components/nav-side/nav-side.component';


const routes: Routes = [
  {path: '',   component: NavSideComponent,
  children: [
    {path: "", component:HomepageComponent},
    {path: "categories", component: CategoryComponent, canActivate :[AdminGuard] },
    {path: "books", component:  BooksComponent, canActivate :[AdminGuard] }

  ]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }