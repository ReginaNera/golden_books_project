import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, pipe } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  template:`
  <app-auth-form (submitted)="registerUser($event)">
  <h1 class="subtitle">Sign Up</h1>
  <p class="text"> Already have an account? <a class="text" routerLink="/login">Log in </a><p>
  <button type="submit">SIGN UP</button>
  </app-auth-form> `

})
export class RegisterComponent  {
  constructor(
    private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
  ) { }

  registerUser(event: FormGroup) {
     console.log(event.value);
    this.authService.register(event.value)
    .subscribe({
        next: (res: any) => {
            console.log("register");
            this.router.navigateByUrl('/')
        },
        error: (error : any) => {
            console.log(error);
        },
    })
  }

}
