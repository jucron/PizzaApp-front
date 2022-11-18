import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseFlowableClientUrl = 'http://localhost:8081/process/client/';
  private baseAccountUrl = 'http://localhost:8081/accounts/';
  private caseKey = 'pizzaOrderCase';

  constructor(private http: HttpClient,
              private router: Router) { }

  executeLogin(credentials: Account) {
    console.log('executeLogin worked')
    this.http.post(this.baseAccountUrl+'login', credentials)
      .subscribe(
        (response: Response) => {
          if (response==null) {
            alert("ERROR: account not found")
            //todo: handle username/password not correct (Security Impl)
          } else {
            localStorage.setItem('mainUsername',credentials.username)
            localStorage.setItem('clientTask',response.message)
            // this.updateClientTask();
            this.router.navigate(['/client/client-action'], {skipLocationChange: true});
          }
        },
        catchError(this.handleError)
        );
  }

  executeLogOUT(username: string) {
    console.log('logOUT worked')
    this.http.post(this.baseAccountUrl+'logout', {username: username})
      .subscribe(
        () => {
            localStorage.clear();
        },
        catchError(this.handleError)
      );
  }

  isUserLogged() {
    console.log('isUserLogged: worked');
    return this.http.get<Response>(this.baseAccountUrl + localStorage.getItem('mainUsername') + "/checkLogin");
  }

  getClientTask() {
    return localStorage.getItem('clientTask');
  }

  updateClientTask() {
    this.http.get<Response>(this.baseFlowableClientUrl+localStorage.getItem('mainUser')+'/taskId')
      .pipe(
        map(
          (response: Response) => {
            console.log('updateClientTask: taskId found: '+response.message)
            localStorage.setItem('clientTask', response.message);
          },
          catchError(this.handleError)
        ));
  }

  startProcess() {
    console.log('startProcess worked');
    // @ts-ignore
    this.http.post(this.baseFlowableClientUrl+this.caseKey+'/'+localStorage.getItem('mainUsername'))
      .subscribe(()=> {
          this.router.navigate(['/client/order'], {skipLocationChange: true});
        },
        catchError(this.handleError)
      );
  }

  createProcess(order) {
    console.log('createProcess worked')
    // order.account = { username: localStorage.getItem('mainUsername')};
    console.log("Order to be created: "+order)
    this.http.post(this.baseFlowableClientUrl+localStorage.getItem('mainUsername'),order)
      .subscribe((response: Response)=> {
        console.log('Order created with id:' + response.message);
        localStorage.setItem('clientOrderId',response.message)
        this.changeClientTaskStatusAndRedirect('task_1');
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
    return this.http.get<Order>(this.baseFlowableClientUrl+localStorage.getItem('mainUser')+'/order')
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
