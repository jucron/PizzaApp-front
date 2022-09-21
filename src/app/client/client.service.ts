import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  static order: Order;
  baseFlowableClientUrl = 'http://localhost:8081/flowable/client/';
  baseAccountUrl = 'http://localhost:8081/accounts/';
  orderId: string;
  baseOrderUrl = 'http://localhost:8081/orders/';
  mainUser: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  processLogin(credentials: LoginCredentials) {
    console.log('login worked')
    this.http.post(this.baseAccountUrl+'login', credentials)
      .subscribe(
        (response: Response) => {
          this.mainUser=response.message;
          //todo: handle username not found (Security Impl)
        },
        catchError(this.handleError)
      );
    this.fetchActiveTask();
  }

  fetchActiveTask () {
    console.log('fetchActiveTask worked')
    this.http.get<Response>(this.baseFlowableClientUrl+this.mainUser)
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
    this.http.post(this.baseFlowableClientUrl,order)
      .subscribe(
        (response: Response) => {
          this.orderId=response.message;
          this.getOrder();
          this.fetchActiveTask();
        },
        catchError(this.handleError)
      );
  }

  completeTask(variables) {
    console.log('completeTask worked')
    this.http.put(this.baseFlowableClientUrl,variables)
      .subscribe(
        catchError(this.handleError)
      );
    this.fetchActiveTask();
  }

  getOrder() {
    console.log('getOrder worked')
    this.http.get(this.baseOrderUrl+this.orderId)
      .subscribe(
        (order: Order) => {
          ClientService.order = order;
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
      default:
        this.router.navigate(['/client/']);
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
export interface Order {
  id: string;
  clientName: string;
  pizzaFlavor: string;
  address: string ;
  status: string ;
  orderTime: string ;
  paid: boolean ;
}
