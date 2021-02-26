import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchcriteria = new EventEmitter<string>();
  // tslint:disable-next-line:typedef
   searchword: any ;
  searchThis() {
    this.searchcriteria.emit(this.searchword)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
