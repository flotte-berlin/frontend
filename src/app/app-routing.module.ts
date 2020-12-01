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
import { TimeFramesComponent } from './pages/tables/time-frames/time-frames.component';
import {AuthGuard} from './helper/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tableOverview', component: TableOverviewComponent, canActivate: [AuthGuard]},
  { path: 'table/bikes', component: BikesComponent, canActivate: [AuthGuard] },
  { path: 'bike/:id', component: BikeComponent, canActivate: [AuthGuard] },
  { path: 'table/participants', component: ParticipantsComponent, canActivate: [AuthGuard] },
  { path: 'table/lendingStations', component: LendingStationsComponent, canActivate: [AuthGuard] },
  { path: 'table/equipmentTypes', component: EquipmentTypesComponent, canActivate: [AuthGuard] },
  { path: 'table/engagementTypes', component: EngagementTypesComponent, canActivate: [AuthGuard] },
  { path: 'table/equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'table/timeFrames', component: TimeFramesComponent, canActivate: [AuthGuard] },
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
