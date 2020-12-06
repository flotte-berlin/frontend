import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeComponent } from './pages/dataPages/bike/bike.component';
import { LendingStationComponent } from './pages/dataPages/lending-station/lending-station.component';
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
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonsComponent } from './pages/tables/persons/persons.component';
import { ContactInformationComponent } from './pages/tables/contact-information/contact-information.component';
import { OrganisationsComponent } from './pages/tables/organisations/organisations.component';
import { ProvidersComponent } from './pages/tables/providers/providers.component';
import { PersonComponent } from './pages/dataPages/person/person.component';
import { OrganisationComponent } from './pages/dataPages/organisation/organisation.component';
import { ProviderComponent } from './pages/dataPages/provider/provider.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tableOverview', component: TableOverviewComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'table/bikes', component: BikesComponent, canActivate: [AuthGuard] },
  { path: 'bike/:id', component: BikeComponent, canActivate: [AuthGuard] },
  { path: 'table/participants', component: ParticipantsComponent, canActivate: [AuthGuard] },
  { path: 'table/lendingStations', component: LendingStationsComponent, canActivate: [AuthGuard] },
  { path: 'table/equipmentTypes', component: EquipmentTypesComponent, canActivate: [AuthGuard] },
  { path: 'table/engagementTypes', component: EngagementTypesComponent, canActivate: [AuthGuard] },
  { path: 'table/equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'table/timeFrames', component: TimeFramesComponent, canActivate: [AuthGuard] },
  { path: 'table/persons', component: PersonsComponent, canActivate: [AuthGuard] },
  { path: 'table/contactInformation', component: ContactInformationComponent, canActivate: [AuthGuard] },
  { path: 'table/organisations', component: OrganisationsComponent, canActivate: [AuthGuard] },
  { path: 'table/providers', component: ProvidersComponent, canActivate: [AuthGuard] },
  { path: 'lendingStation/:id', component: LendingStationComponent, canActivate: [AuthGuard] },
  { path: 'person/:id', component: PersonComponent, canActivate: [AuthGuard] },
  { path: 'provider/:id', component: ProviderComponent, canActivate: [AuthGuard] },
  { path: 'organisation/:id', component: OrganisationComponent, canActivate: [AuthGuard] },
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
