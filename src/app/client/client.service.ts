import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = 'http://localhost:8081/';
  orderId: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  processLogin(credentials: LoginCredentials) {
    console.log('login worked')
    this.http.post(this.baseUrl+'accounts/login',credentials)
      .subscribe(
        (response: Response) => {
          this.taskRoute(response.message);
        },
        catchError(this.handleError)
      );
  }

  createOrder(order) {
    console.log('createOrder worked')
    console.log(order)
    this.http.post(this.baseUrl+'flowable/',order)
      .subscribe(
        (response: Response) => {
          this.orderId=response.message;
          this.taskRoute("task_2");
        },
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    return throwError('A problem happened, try again.');
  }

  private taskRoute(message: string) {
    console.log('taskRouteAccessed')
    switch (message) {
      case "task_1":
        this.router.navigate(['/client/order']);
        break;
      case "task_2":
        this.router.navigate(['/client/order-status']);
        break;
      case "task_3":
        this.router.navigate(['/client/feedback']);
        break;
    }
  }
}

export interface LoginCredentials {
  username: string;
  password: string;
}
interface Response {
  message: string;
}
