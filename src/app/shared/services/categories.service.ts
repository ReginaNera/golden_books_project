import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from 'src/app/features/models/category';

const api = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesds$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);



  constructor (private http: HttpClient) {}

  fetchCategories () {
    return this.http.get<Category[]>(api+"categories").subscribe(res => this.categoriesds$.next(res));

  }

  categories(): Observable<Category[]> {
    return this.categoriesds$.asObservable();
   }

   addCategory(category : Category) : Observable<any>
   {
    return this.http.post<Category>(api+"categories", category);
   }

   updateCategory(category : Category) : Observable<any>
   {
    return this.http.put(api+"categories/" + category.id, category);
   }

   deleteCategory(id : number) : Observable<any>
   {let itemsWithoutDeleted;
      this.categories().subscribe((data) => 
      itemsWithoutDeleted = data.filter(x=>x.id != id)
          
    )
        this.categoriesds$.next(itemsWithoutDeleted);
    return this.http.delete(api+"categories/" + id);
   }

}

