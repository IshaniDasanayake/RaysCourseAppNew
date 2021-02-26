import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RepositoryService} from '../SharedData/repository.service';
import {Course} from '../_interfaces/Course';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
   isLogged: any;

  constructor(private repository: RepositoryService, private route: Router) { }
courseTypes: any;
  selectedType: any;
  selectedTypeId: any;
  isSelect =false;
  level: any;
  isSelectLevel = false;
  selectedLevel: any;
  isInserted= false;
  public courseForm = new FormGroup({
    title: new FormControl(''),
    duration: new FormControl(''),
    institute: new FormControl(''),
    content: new FormControl(''),
    // level: new FormControl(''),
    language: new FormControl(''),
    skills: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),

  });

  ngOnInit(): void {
    this.getCourseTypes();
    this.isLogged= this.repository.islogged;
  }

  onSubmit(value: { title: any; duration: any; institute: any; content: any; level: any; language: any; skills: any; description: any; }){
    const c: Course = {
      cs_title: value.title,
      cs_duration: value.duration,
      cs_institute: value.institute,
      cs_content: value.content,
      cs_level: this.level,
      cs_language: value.language,
      cs_skills: value.skills,
      cs_description: value.description,
      cs_type_id: this.selectedTypeId
    };
    console.log('form body--',c);
    this.repository.postData('api/insertCourse',c)
      .subscribe(res=> {
      this.isInserted = true;
      Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
      this.route.navigate(['/browse'])
      },
        (error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Your work has been lost',
            showConfirmButton: false,
            timer: 1500
          });
        }));
  }

  //get course types
  getCourseTypes(){
    this.repository.getData('api/courseTypes')
      .subscribe(res=>{
        this.courseTypes = res;
        console.log('course types in add--',res)
      })
  }

  courseType(id: any, name: any){
    console.log('id-----////---',id)
    this.isSelect = true;
    this.selectedType = name;
    this.selectedTypeId = id;
  }

  difficultLevel(level:any){
    this.level  = level;
    this.isSelectLevel = true;
    this.selectedLevel = level;
    console.log('level', this.level)
  }

}
