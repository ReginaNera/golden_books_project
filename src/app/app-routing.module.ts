import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoryComponent } from './features/components/admin/categories/category.component';
import { HomepageComponent } from './features/components/homepage/homepage.component';
import { LandingPageComponent } from './features/components/landing/landing-page.component';
import { NavSideComponent } from './features/components/nav-side/nav-side.component';

const routes: Routes = [
  {path: '',   component: LandingPageComponent},

  {path: 'homepage',
  loadChildren: () => import("./features/features.module").then(m => m.FeaturesModule), canActivate: [AuthGuard]},
  
  {
    path: 'login', component: LoginComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'signup', component: RegisterComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
