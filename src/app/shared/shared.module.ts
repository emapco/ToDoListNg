import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {AppRoutingModule} from "./app-routing.module";
import {FormatDateDisplayPipe} from "./format-date-display.pipe";
import {FormatTimeDisplayPipe} from "./format-time-display.pipe";
import { FormatTextDisplayPipe } from './format-description-display.pipe';
import {MatPaginatorModule} from "@angular/material/paginator";
import { PageFilterPipe } from './page-filter.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    FormatDateDisplayPipe,
    FormatTimeDisplayPipe,
    FormatTextDisplayPipe,
    PageFilterPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    AppRoutingModule,
    FormatDateDisplayPipe,
    FormatTimeDisplayPipe,
    FormatTextDisplayPipe,
    PageFilterPipe,
  ],
  providers: [
    FormatDateDisplayPipe,
    FormatTimeDisplayPipe,
    FormatTextDisplayPipe,
    PageFilterPipe,
  ]
})
export class SharedModule { }
