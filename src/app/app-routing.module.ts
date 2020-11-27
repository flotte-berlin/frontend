import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeComponent } from './pages/dataPages/bike/bike.component';
import { LoginComponent} from './pages/login/login.component'
import { TableOverviewComponent } from './pages/table-overview/table-overview.component';
import { BikesComponent} from './pages/tables/bikes/bikes.component'
import { EngagementTypesComponent } from './pages/tables/engagement-types/engagement-types.component';
import { EquipmentTypesComponent } from './pages/tables/equipment-types/equipment-types.component';
import { EquipmentComponent } from './pages/tables/equipment/equipment.component';
import { LendingStationsComponent } from './pages/tables/lending-stations/lending-stations.component';
import { ParticipantsComponent } from './pages/tables/participants/participants.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tableOverview', component: TableOverviewComponent },
  { path: 'table/bikes', component: BikesComponent },
  { path: 'bike/:id', component: BikeComponent },
  { path: 'table/participants', component: ParticipantsComponent },
  { path: 'table/lendingStations', component: LendingStationsComponent },
  { path: 'table/equipmentTypes', component: EquipmentTypesComponent },
  { path: 'table/engagementTypes', component: EngagementTypesComponent },
  { path: 'table/equipment', component: EquipmentComponent },
  { path: '', redirectTo: 'tableOverview', pathMatch: 'full' },
  { path: 'table', redirectTo: 'tableOverview', pathMatch: 'full' },
  { path: '**', redirectTo: 'tableOverview' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
