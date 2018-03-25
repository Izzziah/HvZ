import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Observer }     from 'rxjs/Observer';
import 'rxjs/Rx'
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  private static headers: Headers;
  private static accessToken: string = '';
  private apiKey: string = "C86714EE-9246-482F-BF08-00FC7EF4D4EA";

  constructor(private http: Http) {
    if (ApiService.headers === undefined) {
      ApiService.headers = new Headers();
      ApiService.headers.append('Accept', 'application/json');
      ApiService.headers.append('Content-Type', 'application/json');
      ApiService.headers.append('APIKey', this.apiKey)
      ApiService.headers.append('accessToken', ApiService.accessToken);
    }
  }

  public httpHeaders(): Headers {
    return ApiService.headers;
  }

  public setToken(token: string) {
    ApiService.headers.delete('accessToken');
    ApiService.headers.append('accessToken', token);
    ApiService.accessToken = token;
  }


  public Get(cmd: string) {
    return this.http.get(environment.hvzBaseURL + cmd, { headers: ApiService.headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  public Post(cmd: string, bodyData: string) {
    console.log('post: ' + environment.hvzBaseURL + cmd);
    return this.http.post(environment.hvzBaseURL + cmd, bodyData, { headers: ApiService.headers })
      .map(res =>  { res.json(); } )
      .catch(this.handleError);
  }

  // public Delete(cmd: string, bodyData: string) {
  //   return this.http.post(environment.hvzBaseURL + cmd, { headers: ApiService.headers })
  //     .map(res =>  { res.json(); } )
  //     .catch(this.handleError);
  // }

  public Put(cmd: string, bodyData: string) {
    let len = bodyData.length;
    return this.http.put(environment.hvzBaseURL + cmd, bodyData, { headers: ApiService.headers })
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): any {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error instanceof Response) {
      let resp: Response = error;
      let body = resp.json();
      if (body.Message) {
        errMsg = body.Message;
      }
    }
    error.message = errMsg;
    throw error;
  }
}
