import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RepositoryService} from "../SharedData/repository.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private repo: RepositoryService) { }
isLogged:any;
  ngOnInit(): void {
    this.isLogged= this.repo.islogged;
  }

  routeTo(){
    this.route.navigate(['/browse']);
  }
}
