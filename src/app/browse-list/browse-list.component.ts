import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import {RepositoryService} from '../SharedData/repository.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {Course} from '../_interfaces/Course';
import {Types} from '../_interfaces/Types';
@Component({
  selector: 'app-browse-list',
  templateUrl: './browse-list.component.html',
  styleUrls: ['./browse-list.component.css']
})
export class BrowseListComponent implements OnInit {
  @Output() public found = new EventEmitter<any>();
  types: any;
  courses: any;
  course = [];
  change = false;
  checkedId = {};
  allCourses: any;
  isLogged: any;
  constructor(private modalService: NgbModal, private http: HttpClient, private repository: RepositoryService, private route: Router, private activatedroute: ActivatedRoute)
  {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    // this.isLogged = this.repository.islogged;
  }

  title = 'ng-bootstrap-modal-demo';
  closeResult: string | undefined;
  modalOptions: NgbModalOptions;
  content: any;
  public typeForm = new FormGroup({
    type: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.isLogged = this.repository.islogged;

    this.getCourseTypes();
    this.getAllCourses();
  }
  // tslint:disable-next-line:typedef
  changeS(event: any, id: any){
    console.log(event.currentTarget.checked);
    console.log('id--', id);
    this.change = !this.change;
    this.checkedId = id;
    let i = 0, j = 0;
    const ckeckIdArr = [];
    ckeckIdArr[i] = id;
    i++;

    for ( j = 0; j < 5; j++){
      console.log('values', ckeckIdArr[j]);
    }

    this.getCourses(id);
  }
  getCourses(id: any){
    this.repository.getData('api/courses/' + id)
      .subscribe(res => {
      this.courses = res;
      console.log('res--', res);
      const myObjStr = JSON.stringify(res);
      });

  }
  routeTo(id: any, course: any){
    this.route.navigate(['/course', id]);
    // this.change= false;
    // this.course =course;
    // this.found.emit(course);
  }
  update(id: any, course: any){
    this.route.navigate(['/update-course', Number(id)]);

  }

  getCourseTypes(){
  this.repository.getData('api/courseTypes')
    .subscribe(res => {
this.types = res;
console.log(res);
const myObjStr = JSON.stringify(res);
    },
      (error) => {
      });
  }
  delete(id: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.repository.getData('api/deleteCourse/' + id)
          .subscribe(res => {
// this.route.navigate(['/browse'])
            window.location.reload();
            },
            (error) => {
            });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }





  onSubmit(value: { type: any; description: any; }){
    const c: Types = {
      type_name: value.type,
      type_description: value.description
    };
    console.log('mmm', c);
    this.repository.postData('api/insertType', c)
      .subscribe(res => {
        window.location.reload();
        // this.route.navigate(['/browse']);
      });
  }

  deleteType(id: any){
    this.repository.getData('api/deleteType/' + id)
      .subscribe(res => {
        window.location.reload();
      });
  }

  getAllCourses(){
    this.repository.getData('api/allCourses')
      .subscribe(res=>{
        console.log('res--',res);
        this.allCourses = res;
      })
  }
}
