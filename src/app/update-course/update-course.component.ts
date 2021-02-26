import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RepositoryService} from "../SharedData/repository.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Course} from "../_interfaces/Course";
import {SendCourse} from "../_interfaces/SendCourse";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  @Input() public resultGridList: Array <any> = [];
   courseTypes: any;
   selectedTypeId: any;
  isInserted = false;
   newSelectedLevel: any;
   newSelectedType: any;
   newSelectedTypeId: any;

  constructor(private route: ActivatedRoute, private repository: RepositoryService, private router: Router ) { }
  level: any;
  selectedLevel: any;
  isSelectLevel=true;
  isSelect= true;
  selectedType: any;
  courseId: any;
  courseDetails: any;
  ContactContactId: any;
  ctype:any;
  isLogged: any;
  public updateCourseForm = new FormGroup({
    title: new FormControl(''),
    duration: new FormControl(''),
    institute: new FormControl(''),
    content: new FormControl(''),
    level: new FormControl(''),
    language: new FormControl(''),
    skills: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),

  });
  ngOnInit(): void {
    console.log('ffffff', this.resultGridList)
    this.getCourseForId();
    this.getCourseTypes();
    this.isLogged= this.repository.islogged;
  }


  updateCourse(value: any){
 this.newSelectedLevel = this.selectedLevel
    this.newSelectedTypeId = this.selectedTypeId
    // console.log('test----0000',test)
    const c: SendCourse = {
      cs_id: this.courseId,
      cs_title: value.title,
      cs_duration: value.duration,
      cs_institute: value.institute,
      cs_content: value.content,
      cs_level: this.newSelectedLevel,
      cs_language: value.language,
      cs_skills: value.skills,
      cs_description: value.description,
      cs_type_id: this.newSelectedTypeId
    };
    console.log('form body--',c);
    this.repository.postData('api/updateCourse', c)
      .subscribe(res=> {
          this.isInserted = true;


          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/browse'])
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



  getCourseForId(){
    this.route.paramMap.subscribe((params: ParamMap)=>{
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('id') as string);
      this.courseId = id;

      this.repository.getData('api/courseDetails/' +this.courseId)

        .subscribe(res => {
          console.log(res)
          this.courseDetails = res as any;
          this.selectedLevel = this.courseDetails.cs_level;
          this.getTypeById(this.courseDetails.cs_type_id);


          this.fillContactDetail();
          },
          (error) => {
          })
    });
  }

  fillContactDetail() {
    this.updateCourseForm.controls.title.setValue(this.courseDetails.cs_title);
    this.updateCourseForm.controls.content.setValue(this.courseDetails.cs_content);
    this.updateCourseForm.controls.duration.setValue(this.courseDetails.cs_duration);
    this.updateCourseForm.controls.institute.setValue(this.courseDetails.cs_institute);
    this.updateCourseForm.controls.level.setValue(this.selectedLevel);
    this.updateCourseForm.controls.language.setValue(this.courseDetails.cs_language);
    this.updateCourseForm.controls.skills.setValue(this.courseDetails.cs_skills);
    this.updateCourseForm.controls.description.setValue(this.courseDetails.cs_description);
    this.updateCourseForm.controls.type.setValue(this.selectedType);
  }

   getTypeById(typeId: any) {
    console.log('opopopop')
    this.repository.getData('api/typeById/'+ Number(typeId))
      .subscribe(res=>{
        this.ctype = res;
        this.selectedType = this.ctype.type_name;
        this.selectedTypeId = this.ctype.type_id;
        console.log('ctype-->', this.ctype.type_name)
console.log("testttt")

      })
  }

  getCourseTypes(){
    this.repository.getData('api/courseTypes')
      .subscribe(res=>{
        this.courseTypes = res;
        console.log('course types in add--',this.courseTypes)
      })
  }

  courseType(id: any, name: any){
    console.log('id-----////---',id)
    this.newSelectedType = name;
    this.newSelectedTypeId = id;
    this.isSelect = true;
    //this.selectedType = this.newSelectedType;
    //this.selectedTypeId = id;

  }

  difficultLevel(level: any){
    this.newSelectedLevel  = level;
    this.isSelectLevel = true;
    this.selectedLevel = this.newSelectedLevel;
    console.log('level--', this.newSelectedLevel);

  }
}
