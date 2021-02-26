import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {TitlebarComponent} from './CommonElement/titlebar/titlebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowseComponent } from './browse/browse.component';
import { BrowseListComponent } from './browse-list/browse-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ViewCourseComponent } from './view-course/view-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateCourseComponent } from './update-course/update-course.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SearchComponent } from './search/search.component';
import { LoggedHeaderComponent } from './CommonElement/logged-header/logged-header.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TitlebarComponent,
    BrowseComponent,
    BrowseListComponent,
    ViewCourseComponent,
    AddCourseComponent,
    UpdateCourseComponent,
    AdminloginComponent,
    SearchComponent,
    LoggedHeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
