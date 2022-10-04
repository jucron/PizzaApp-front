import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {Router} from "@angular/router";
import {ClientActionComponent} from "./client-action/client-action.component";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
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
            if (response.message!=null) { //if there is an Order already
              console.log('An Order already exists for this Account')
              localStorage.setItem('clientOrderId',response.message);
            }
            this.checkLoginStatus();
            this.router.navigate(['/client/client-action'], {skipLocationChange: true});
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
              ClientActionComponent.client_task = clientTask;
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
      .subscribe((response: Response)=> {
        console.log('Order created with id:' + response.message);
        localStorage.setItem('clientOrderId',response.message)
        this.changeClientTaskStatusAndRedirect('task_1');
        // this.router.navigate(['/client/order-status']);
      },
        catchError(this.handleError)
      );
  }

  changeClientTaskStatusAndRedirect(taskClaimed: string) {
    console.log('changeClientStatus worked')
    this.http.put(this.baseFlowableClientUrl, {username: localStorage.getItem('mainUsername'), taskStatus: taskClaimed})
      .subscribe( () => {
        this.router.navigate(['/client'], {skipLocationChange: true});
      },
        catchError(this.handleError)
      );
  }

  getOrder() {
    console.log('getOrder worked')
    return this.http.get<Order>(this.baseOrderUrl+localStorage.getItem('clientOrderId'))
      .pipe(
        map(
        (order: Order) => {
          console.log('order found with status: '+order.status)
          return order;
        },
        catchError(this.handleError)
      ));
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
  address: string;
  status: string;
  orderTime: string;
  paid: boolean;
}
