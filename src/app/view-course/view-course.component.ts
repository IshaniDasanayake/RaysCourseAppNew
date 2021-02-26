import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {RepositoryService} from "../SharedData/repository.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Course} from "../_interfaces/Course";
import {Enrol} from "../_interfaces/Enrol";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  @Input() public resultGridList: Array <any> = [];
  courseDetails: any;
  courseId: any;
  isEnrolled = false;
  isLogged:any;
  constructor( private route: Router,private activatedroute: ActivatedRoute, private repository: RepositoryService)
  {

  }
  public registerForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    institute: new FormControl(''),
  });
  ngOnInit(): void {
    this.getCourseForId();
    this.isLogged= this.repository.islogged;
  }

  getCourseForId(){
    this.activatedroute.paramMap.subscribe((params: ParamMap)=>{
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('id') as string);
      this.courseId = id;

      this.repository.getData('api/courseDetails/' + this.courseId)

        .subscribe(res => {
            console.log(res)
            this.courseDetails = res as any;

          })
    });
  }



  onSubmit(value: { name: any; email: any; institute: any; }){
    const c: Enrol = {
      st_name: value.name,
      st_email: value.email,
      st_institute: value.institute,
      cs_id: this.courseId
    };
    console.log('pppp',c)
this.repository.postData('api/enrol',c)
  .subscribe(res=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your have been enrolled',
      showConfirmButton: false,
      timer: 1500
    });
    this.route.navigate(['/browse'])
    window.location.reload()
    this.isEnrolled = !this.isEnrolled;

  })
  }

  update(){
    this.route.navigate(['/update-course', Number(this.courseId)]);
  }
}
