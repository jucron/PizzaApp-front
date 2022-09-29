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
  baseOrderUrl = 'http://localhost:8081/orders/';

  constructor(private http: HttpClient,
              private router: Router) { }

  processLogin(credentials: Account) {
    console.log('login worked')
    this.http.post(this.baseAccountUrl+'login', credentials)
      .subscribe(
        (response: Response) => {
          if (response==null) {
            alert("ERROR: account not found")
          } else {
            localStorage.setItem('mainUsername',credentials.username)
          }
          //todo: handle username not found (Security Impl)
        },
        catchError(this.handleError)
      );
  }

  processLogOUT(username: string) {
    console.log('logOUT worked')
    this.http.post(this.baseAccountUrl+'logout', {username: username})
      .subscribe(
        () => {
            localStorage.clear();
        },
        catchError(this.handleError)
      );
  }

  checkLoginStatus() {
    console.log('checkLoginStatus worked');
    if (localStorage.getItem('mainUsername')==null) {
      console.log('not logged in Angular')
      return false;
    } else {
      console.log('already logged in Angular')
      return this.http.get<Response>(this.baseFlowableClientUrl+localStorage.getItem('mainUsername'))
        .subscribe(
          (response: Response) => {
            let loginStatus = response.message;
            let clientTask = response.messageB;
            console.log(loginStatus+" "+clientTask)
            if (loginStatus == 'not_logged') {
              localStorage.clear();
              return false;
            } else {
              localStorage.setItem('clientTask',clientTask);
              return true;
            }
          })
      }
  }

  getClientTask() {
    return localStorage.getItem('clientTask');
  }

  createProcess(order) {
    console.log('createProcess worked')
    order.account = { username: localStorage.getItem('mainUsername')};
    console.log("Order to be created: "+order)
    this.http.post(this.baseFlowableClientUrl,order)
      .subscribe(()=> {
        console.log('Order created');
        this.getOrder();
      },
        catchError(this.handleError)
      );
  }

  changeClientTaskStatus(taskClaimed: string) {
    console.log('changeClientStatus worked')
    this.http.put(this.baseFlowableClientUrl, {username: localStorage.getItem('mainUsername'), taskStatus: taskClaimed})
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrder() {
    console.log('getOrder worked')
    this.http.get(this.baseOrderUrl+localStorage.getItem('mainUsername')+'/username')
      .subscribe(
        (order: Order) => {
          ClientService.order = order;
        },
        catchError(this.handleError)
      );
  }
  async refreshPage() {
    setTimeout(function() {
      console.log("refreshPage worked")
    }, 3000);
    this.router.navigate(['/client/refresh']);
  }

  private handleError(error: HttpErrorResponse) {

    return throwError('A problem happened, try again.');
  }
}

export interface Account {
  username: string;
  password: string;
  orderId: string;
  loginStatus: string;
  taskStatus: string;
}
interface Response {
  message: string;
  messageB: string;
}
export interface Order {
  id: string;
  clientName: string;
  pizzaFlavor: string;
  address: string ;
  status: string ;
  orderTime: string ;
  paid: boolean ;
  account: Account;
}
