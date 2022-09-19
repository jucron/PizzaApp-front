import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientLoginService {
  processLoginUrl = 'http://localhost:8080/client/login';

  constructor(private http: HttpClient) { }

  processLogin(credentials: LoginCredentials) {
    return this.http.post(this.processLoginUrl,credentials);
  }
}

export interface LoginCredentials {
  login: string;
  password: string;
}
