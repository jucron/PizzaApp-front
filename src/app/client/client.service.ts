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
  private clientTask_key = 'clientTask';
  private mainUsername_key = 'mainUsername';

  constructor(private http: HttpClient,
              private router: Router) { }

  getClientTask() {
    return localStorage.getItem(this.clientTask_key);
  }

  getMainUsername() {
    return localStorage.getItem(this.mainUsername_key);
  }

  executeLogin(credentials: Account) {
    console.log('executeLogin worked')
    this.http.post(this.baseAccountUrl+'login', credentials)
      .subscribe(
        (response: Response) => {
          if (response==null) {
            alert("ERROR: account not found")
            //todo: handle username/password not correct (Security Impl)
          } else {
            localStorage.setItem(this.mainUsername_key,credentials.username)
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
    return this.http.get<Response>(this.baseAccountUrl + this.getMainUsername() + "/checkLogin");
  }

  updateClientTask() {
    console.log('updateClientTask worked ')
    return this.http.get<Response>(this.baseFlowableClientUrl+this.getMainUsername()+'/taskDef')
      .pipe(
        map(
          (response: Response) => {
            return response.message;
          },
          catchError(this.handleError)
        ))
      .subscribe(message => {
        console.log('updateClientTask: taskDef found: '+message)
        localStorage.setItem(this.clientTask_key, message);
      });
  }

  startProcess() {
    console.log('startProcess worked');
    // @ts-ignore
    this.http.post(this.baseFlowableClientUrl+this.caseKey+'/'+this.getMainUsername())
      .subscribe(()=> {
          this.router.navigate(['/client'], {skipLocationChange: true});
        },
        catchError(this.handleError)
      );
  }

  createProcess(order) {
    console.log('createProcess worked')
    // order.account = { username: localStorage.getItem('mainUsername')};
    console.log("Order to be created: "+order)
    this.http.post(this.baseFlowableClientUrl+this.getMainUsername(),order)
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
    this.http.put(this.baseFlowableClientUrl, {username: this.getMainUsername(), taskStatus: taskClaimed})
      .subscribe( () => {
        this.router.navigate(['/client'], {skipLocationChange: true});
      },
        catchError(this.handleError)
      );
  }

  getOrder() {
    console.log('getOrder worked')
    return this.http.get<Order>(this.baseFlowableClientUrl+this.getMainUsername()+'/order')
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
