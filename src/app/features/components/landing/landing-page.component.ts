import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-landing',
  styleUrls : ['landing-page.component.scss'],
  template:`
  <div class="base"> 
    <div class="title_container">
        <h1 class="title">Golden Book.</h1>
     </div>
   <div class="card">
    <div class="text-container">
      <p >{{quote}}</p>
     </div>
    <div class="motivation">
    <p>{{motivation}}</p>
    <button type="button" routerLink="/signup" class="signup-button">SIGN UP</button>
    </div>
   </div>
   <div>
    `

})
export class LandingPageComponent {

    quote : string = "“If you don’t like to read, you haven’t found the right book.” J.K. Rowling";
    motivation: string ="Find your inspiration"
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }
 



}
