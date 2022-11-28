import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        let item = localStorage.getItem('user');
        let user;
        if(item)
        {
             user = JSON.parse(item)
        }
        this.userSubject = new BehaviorSubject<User | null>(user);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

    login(email : string, password : string) {
         this.http.get<User[]>('http://localhost:3000/users')
        .subscribe((data) => {
            let user = data.find(x=>x.email==email && x.password == password)
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            this.router.navigate(['/homepage']);

         })



     
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    register(user: User) {
        user.admin=false;
        return this.http.post('http://localhost:3000/users', user);
    }

}