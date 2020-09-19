import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './pages/login/login.component'
import { TableOverviewComponent } from './pages/table-overview/table-overview.component';
import { BikesComponent} from './pages/tables/bikes/bikes.component'
import { LendingStationsComponent } from './pages/tables/lending-stations/lending-stations.component';
import { ParticipantsComponent } from './pages/tables/participants/participants.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tableOverview', component: TableOverviewComponent },
  { path: 'table/bikes', component: BikesComponent },
  { path: 'table/participants', component: ParticipantsComponent },
  { path: 'table/lendingStations', component: LendingStationsComponent },
  { path: '', redirectTo: 'tableOverview', pathMatch: 'full' },
  { path: 'table', redirectTo: 'tableOverview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
