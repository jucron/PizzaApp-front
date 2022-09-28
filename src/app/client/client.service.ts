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
    this.http.post(this.baseAccountUrl+'logout', username)
      .subscribe(
        () => {
            localStorage.clear();
        },
        catchError(this.handleError)
      );
  }

  routeToCorrectPage (currentPageLoginStatus: string, currentPageTaskStatus: string) {
    console.log('routeToCorrectPage worked')
    if (localStorage.getItem('mainUsername')!=null) {
      console.log('mainUsername is Not Null!')
      this.http.get<Response>(this.baseFlowableClientUrl+localStorage.getItem('mainUsername'))
        .subscribe(
          (response: Response) => {
            let loginStatus = response.message;
            let taskStatus = response.messageB;
            if (loginStatus=='not_logged') {
              localStorage.clear();
            } else {
              console.log(loginStatus+" "+taskStatus)
              if (currentPageLoginStatus!=loginStatus || currentPageTaskStatus != currentPageTaskStatus) {
                this.clientRoute(loginStatus, taskStatus);
              }
            }
          },
          catchError(this.handleError)
        );
    }
  }

  createOrder(order) {
    console.log('createOrder worked')
    order.account = { username: localStorage.getItem('mainUsername')};
    console.log(order)
    this.http.post(this.baseOrderUrl,order)
      .subscribe((response: string)=> {
        console.log('Order created with Id: '+response);
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

  private handleError(error: HttpErrorResponse) {

    return throwError('A problem happened, try again.');
  }

  private clientRoute(logStatus: string, taskStatus: string) {
    console.log('clientRoute Accessed')
    switch (logStatus) {
      case "not_logged":
        this.router.navigate(['/client/']);
        break;
      case "logged":
        if (taskStatus=="task_1") { //if its in task1
          this.router.navigate(['/client/order-status']);
        } else if (taskStatus=="task_2") { //if its in task2
          this.router.navigate(['/client/feedback']);
        } else { //if there is no task yet
          this.router.navigate(['/client/order']);
        }
        break;
      default:
        this.router.navigate(['/client/']);
        break;
    }
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
