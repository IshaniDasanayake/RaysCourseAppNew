import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserServiceService} from './user-service.service';
import { AlertifyServiceService } from './alertify-service.service';
import { Observable } from 'rxjs';
import { RouteReuseStrategy } from '@angular/router';
// import { Item } from '../../app/farmer/interfaces/Item';

// tslint:disable-next-line:class-name
interface userIdIsUnique {
  unique: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class RepositoryService {

  public islogged = false;

  constructor(private alertify: AlertifyServiceService, private http: HttpClient, private userurl: UserServiceService) {
  }

  // tslint:disable-next-line:typedef
  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, this.userurl.common_url), this.generateHeaders());

  }

  // tslint:disable-next-line:typedef
  public postData(route: string, body: any) {

    return this.http.post(this.createCompleteRoute(route,  this.userurl.common_url), body, this.generateHeaders());
  }

  // tslint:disable-next-line:typedef
  public deleteUser(route: string, body: any){
    return this.http.post(this.createCompleteRoute(route,  this.userurl.common_url), body, this.generateHeaders());
  }



 /*private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/employee/${route}`;
  }
*/
// tslint:disable-next-line:typedef
private createCompleteRoute(route: string, envAddress: string) {
  return `${envAddress}/${route}`;
}

  // tslint:disable-next-line:typedef
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'bearer ' + localStorage.getItem('token')
                              })
    };

  }

// tslint:disable-next-line:typedef
public login(){
  this.islogged = !this.islogged;
  console.log('isloggedinRepo-',this.islogged)
}



}

