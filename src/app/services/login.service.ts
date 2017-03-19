import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http, private config: ConfigService) { }

  login(username: string, password: string) : Observable<Boolean> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let body = {
      username: username,
      password: password
    };
    return this.http.post(this.config.address + "/login", body, {
      headers: headers
    })
    .retry(2)
    .map(res => {
      if(res.status === 202 || res.status === 204) {
        return true;
      }
      else throw Error(res.text());
    });
  }
}
