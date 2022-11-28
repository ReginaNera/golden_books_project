import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book } from 'src/app/features/models/book';


const api = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksds$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor (private http: HttpClient) {}
 
  fetchBooks () {
    return this.http.get<Book[]>(api+"books").subscribe(res => this.booksds$.next(res));
  }

   books(): Observable<Book[]> {
    return this.booksds$.asObservable();
   }

   addBook(book : Book) : Observable<any>
   {
    return this.http.post<Book>(api+"books", book);
   }

   updateBook(book : Book) : Observable<any>
   {
    return this.http.put(api+"books/" + book.id, book);
   }

   deleteBook(id : number) : Observable<any>
   {let itemsWithoutDeleted;
      this.books().subscribe((data) => 
      itemsWithoutDeleted = data.filter(x=>x.id != id)
          
    )
        this.booksds$.next(itemsWithoutDeleted);
    return this.http.delete(api+"books/" + id);
   }

  }
