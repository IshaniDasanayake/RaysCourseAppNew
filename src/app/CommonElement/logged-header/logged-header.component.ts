import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {RepositoryService} from "../../SharedData/repository.service";

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
  }
  logout(){
    this.repository.islogged = !this.repository.islogged;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logged As User',
      showConfirmButton: false,
      timer: 1500
    });
    window.location.reload()
  }
}
