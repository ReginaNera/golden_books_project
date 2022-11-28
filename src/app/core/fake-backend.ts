import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from './models/user';

//array in local storage for registered users
let item = localStorage.getItem('users');
let users :any = [];
if(item)
{
     users = JSON.parse(item)
     console.log(users)
}
 users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
     constructor(private http: HttpClient){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
       
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('register') && method === 'POST':
                    return register();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            console.log(JSON.stringify(body))
            const user = this.users.find((x: { email: any; password: any; }) => x.email == email && x.password == password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                password: user.password,
                admin: user.admin,
                token: 'token'
            })
        }

        function register() {
            console.log("fakebackend register")

            const user = body
            user.admin=false;

            if (users.find((x: { email: any; }) => x.email === user.email)) {
                return error('email "' + user.email + '" is already taken')
            }

            user.id = this.users.length ? Math.max(this.users.map((x: { id: any; })  => x.id)) + 1 : 1;
            // users.push(user);
            // localStorage.setItem('users', JSON.stringify(users));
            console.log(user);
            this.addUser(user);
            return ok();
        }

   

        // helper functions

        function ok(body?: { id: any; email: any; password: any; admin: any; token: string; } | undefined) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }


    getUsers() : Observable<User[]>
    {
        return this.http.get<User[]>("http://localhost:3000/users");
    }

    addUser(user:User) {
         this.http.post("http://localhost:3000/users", user);
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};