import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BrowseComponent} from './browse/browse.component';
import {ViewCourseComponent} from './view-course/view-course.component';
import {AddCourseComponent} from "./add-course/add-course.component";
import {UpdateCourseComponent} from "./update-course/update-course.component";
import {AdminloginComponent} from "./adminlogin/adminlogin.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'course/:id', component: ViewCourseComponent },
  { path: 'insert', component: AddCourseComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent },
  { path: 'login', component: AdminloginComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
