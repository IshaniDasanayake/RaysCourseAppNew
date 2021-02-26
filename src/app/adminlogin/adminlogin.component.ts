import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Course} from "../_interfaces/Course";
import {Enrol} from "../_interfaces/Enrol";
import {RepositoryService} from "../SharedData/repository.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Login} from "../_interfaces/Login";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
   isLogged: any;

  constructor(private repository: RepositoryService, private route:Router) { }
  public loginForm = new FormGroup({
    name: new FormControl(''),
  password: new FormControl('')
  });

  ngOnInit(): void {
    this.isLogged = this.repository.islogged;
  }
onSubmit(value: { name: any; password: any; }){
  const c: Login = {
    password: value.password};
  console.log('is-admin-1', this.repository.islogged)

  this.repository.postData('api/login',c)
    .subscribe(res=>{
  this.repository.login();
  console.log('is-admin-2', this.repository.islogged)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged As Administrator',
        showConfirmButton: false,
        timer: 1500
      });
  this.route.navigate(['/home']);
    });


}
}
