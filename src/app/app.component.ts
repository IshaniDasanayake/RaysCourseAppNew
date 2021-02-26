import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items= [];
  title = 'RaysCourseApp';

  // tslint:disable-next-line:typedef
  handleResults(event: any){
    // @ts-ignore
    this.items.push(event);

  }
}
