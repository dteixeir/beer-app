import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatExpansionModule
} from '@angular/material';

const components = [
  MatButtonModule
  , MatIconModule
  , MatFormFieldModule
  , MatInputModule
  , MatDatepickerModule
  , MatNativeDateModule
  , MatCheckboxModule
  , MatSidenavModule
  , MatToolbarModule
  , MatListModule
  , MatTabsModule
  , MatCardModule
  , MatSelectModule
  , MatProgressSpinnerModule
  , MatDialogModule
  , MatTableModule
  , MatSortModule
  , MatPaginatorModule
  , MatSnackBarModule
  , MatExpansionModule
];

@NgModule({
  imports: components,
  exports: components
}) export class MaterialModule { }
