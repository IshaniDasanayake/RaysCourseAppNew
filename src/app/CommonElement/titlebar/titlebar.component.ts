import {  Component,Input, OnInit, Output,EventEmitter } from '@angular/core';
import {RepositoryService} from "../../SharedData/repository.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {
  content: any;
  newArray: any;
  isLogged: any;
  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    console.log('islog',this.repository.islogged)
    this.isLogged = this.repository.islogged;
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
