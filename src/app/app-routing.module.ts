import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './pages/login/login.component'
import { BikesComponent} from './pages/bikes/bikes.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bikes', component: BikesComponent },
  { path: '', redirectTo: '/bikes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
