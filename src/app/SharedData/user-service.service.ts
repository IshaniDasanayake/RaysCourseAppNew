import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public common_url: string = environment.common_url;
  constructor() { }
}
