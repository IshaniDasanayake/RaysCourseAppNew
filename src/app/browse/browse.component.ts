import { Component, OnInit } from '@angular/core';
import {RepositoryService} from "../SharedData/repository.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor(private repo: RepositoryService) { }
data =[];
  isLogged: any;
  ngOnInit(): void {
    this.isLogged = this.repo.islogged;
  }
  handleResults(searchObj: any){
    this.data = searchObj
  }

}
