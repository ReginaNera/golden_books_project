import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/shared/services/categories.service';
import { Category } from '../../models/category';

@Component({
  templateUrl: 'nav-side.component.html',
  styleUrls: ['nav-side.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavSideComponent implements OnInit {
  categories$ : Observable<Category[]>
  categories : Category[]
  constructor(private categoryService : CategoryService, private authService: AuthService ) {}

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.fetchCategories();
    this.categories$=this.categoryService.categories();
  }

  Logout() {
    this.authService.logout();
  }


}