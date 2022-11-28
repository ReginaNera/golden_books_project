import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';



const api = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})

export class UserService {
    private usersds$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor (private http: HttpClient) {}
 
  fetchUsers () {
    console.log("fetch")
    var users= this.http.get<User[]>(api+"users").subscribe(res => this.usersds$.next(res));
    console.log(users);
    console.log(this.usersds$)
    return users;

  }

  users(): Observable<User[]> {
    console.log("users")
    return this.usersds$.asObservable();
   }

   addCategory(user : User) : Observable<any>
   {
    return this.http.post<User>(api+"users", user);
   }
}

