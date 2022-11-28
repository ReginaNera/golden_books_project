import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, UrlHandlingStrategy } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  template:`
    <app-auth-form (submitted)="loginUser($event)">
    <h1 class="subtitle">Login</h1>
    <p class="text">Don't have an account?<a class="text" routerLink="/signup">Sign Up</a><p>
    <button type="submit">LOGIN</button>
    </app-auth-form>`

})
export class LoginComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService
  ) { }
  loginUser(event : FormGroup){
    this.authService.login(event.value.email, event.value.password);
  }
   
  



}