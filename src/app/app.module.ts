import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import {
  MatSidenavModule,
  MatDialogModule,
  MatCheckboxModule,
  MatInputModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule,
  MatDividerModule,
  MatGridListModule,
  MatTableModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatSortModule,
  MatPaginatorModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { NetworkComponent } from './network/network.component';
import { NetworkColapseComponent } from './network-colapse/network-colapse.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [AppComponent, NetworkComponent, NetworkColapseComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
