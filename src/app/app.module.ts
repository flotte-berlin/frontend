import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DatePipe } from '@angular/common';

// Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { BikesComponent } from './pages/tables/bikes/bikes.component';
import { GraphQLModule } from './graphql.module';
import { ParticipantsComponent } from './pages/tables/participants/participants.component';
import { LendingStationsComponent } from './pages/tables/lending-stations/lending-stations.component';
import { TableOverviewComponent } from './pages/table-overview/table-overview.component';
import { CellComponent } from './components/tableComponents/cell/cell.component';
import { SidenavProfileComponent } from './components/sidenav-profile/sidenav-profile.component';
import { NavService } from './components/menu-list-item/nav.service';
import { TokenInterceptor } from './helper/token.interceptor';
import { BikeComponent } from './pages/dataPages/bike/bike.component';
import {
  TableComponent,
  DeleteConfirmationDialog,
} from './components/table/table.component';
import { DataPageComponent } from './components/data-page/data-page.component';
import { EquipmentTypesComponent } from './pages/tables/equipment-types/equipment-types.component';
import { EngagementTypesComponent } from './pages/tables/engagement-types/engagement-types.component';
import { WorkshopsComponent } from './pages/tables/workshops/workshops.component';
import { ReferenceTableComponent } from './components/reference-table/reference-table.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EquipmentComponent } from './pages/tables/equipment/equipment.component';
import { TimeFramesComponent } from './pages/tables/time-frames/time-frames.component';
import { NumberRangeCellComponent } from './components/tableComponents/number-range-cell/number-range-cell.component';
import { DateRangeCellComponent } from './components/tableComponents/date-range-cell/date-range-cell.component';
import { SelectObjectDialogComponent } from './components/select-object-dialog/select-object-dialog.component';
import { AutocompleteSelectComponent } from './components/autocomplete-select/autocomplete-select.component';
import { LendingStationComponent } from './pages/dataPages/lending-station/lending-station.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminDataPageComponent} from './components/admin-data-page/admin-data-page.component';
import {
  ErrorSnackbarComponent,
  SnackbarDialog,
} from './helper/snackbar-ref.component';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { PersonsComponent } from './pages/tables/persons/persons.component';
import { ContactInformationComponent } from './pages/tables/contact-information/contact-information.component';
import { OrganisationsComponent } from './pages/tables/organisations/organisations.component';
import { ProvidersComponent } from './pages/tables/providers/providers.component';
import { OrganisationComponent } from './pages/dataPages/organisation/organisation.component';
import { PersonComponent } from './pages/dataPages/person/person.component';
import { ProviderComponent } from './pages/dataPages/provider/provider.component';
import { WorkshopComponent } from './pages/dataPages/workshop/workshop.component';
import { BikeEventComponent } from './pages/dataPages/bike-event/bike-event.component';
import { ParticipantComponent } from './pages/dataPages/participant/participant.component';
import { EngagementsComponent } from './pages/tables/engagements/engagements.component';
import { BikeEventsComponent } from './pages/tables/bike-events/bike-events.component';
import { BikeEventTypesComponent } from './pages/tables/bike-event-types/bike-event-types.component';
import { WorkshopTypesComponent } from './pages/tables/workshop-types/workshop-types.component';
import { FilterRowComponent } from './components/tableComponents/filter-row/filter-row.component';
import {FormSelectSearchComponent} from './components/from-select-search/form-select-search.component';
import {DeleteDialogComponent} from './components/dialogs/delete/delete.dialog.component';
import {AddDialogComponent} from './components/dialogs/add/add.dialog.component';
import {EditDialogComponent} from './components/dialogs/edit/edit.dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavProfileComponent,
    LoginComponent,
    BikesComponent,
    ParticipantsComponent,
    LendingStationsComponent,
    TableOverviewComponent,
    CellComponent,
    DeleteConfirmationDialog,
    BikeComponent,
    TableComponent,
    DataPageComponent,
    EquipmentTypesComponent,
    EngagementTypesComponent,
    WorkshopsComponent,
    ReferenceTableComponent,
    EquipmentComponent,
    TimeFramesComponent,
    NumberRangeCellComponent,
    DateRangeCellComponent,
    SelectObjectDialogComponent,
    AutocompleteSelectComponent,
    LendingStationComponent,
    FormSelectSearchComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AdminDataPageComponent,
    ProfileComponent,
    ErrorSnackbarComponent,
    SnackbarDialog,
    PersonsComponent,
    ContactInformationComponent,
    OrganisationsComponent,
    ProvidersComponent,
    OrganisationComponent,
    PersonComponent,
    ProviderComponent,
    WorkshopComponent,
    BikeEventComponent,
    ParticipantComponent,
    EngagementsComponent,
    BikeEventsComponent,
    BikeEventTypesComponent,
    WorkshopTypesComponent,
    FilterRowComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpLinkModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    GraphQLModule,
    DragDropModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    NavService,
    MatNativeDateModule,
    MatDatepickerModule,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
