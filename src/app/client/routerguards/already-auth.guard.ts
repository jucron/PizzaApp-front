import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ClientService} from "../client.service";

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthIn implements CanActivate {
  constructor(private clientService: ClientService,
              private router: Router) {  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('mainUsername') == null) {
      console.log('AlreadyAuthGuard: not logged in Angular, remaining in page')
      return true;
    }
    let logged = this.clientService.isUserLogged();

    // const response = async () => {
    //   await this.clientService.isUserLogged()
    //     .then(r => logged = r);
    // };
    // return this.clientService.isUserLogged()
    //   .subscribe(
    //     (response: Response) => {
    //       let loginStatus = response.message;
    //       console.log("isUserLogged: LoginStatus from backend: " + loginStatus)
    //       if (loginStatus == 'not_logged') {
    //         localStorage.clear();
    //         console.log('AlreadyAuthGuard: user not logged, remaining in page');
    //         return true;
    //       } else {
    //         console.log('AlreadyAuthGuard: user already logged, redirecting to client-action page');
    //         return this.router.navigate(['/client/client-action'], {skipLocationChange: true});
    //       }
    //     });

    // setTimeout(() => {
    //     console.log('AlreadyAuthGuard: checkLoginStatus is '+typeof logged+', waiting 1,5 seconds')
    // }, 2000);
    //
    console.log('AlreadyAuthGuard: logged is '+ logged)
    if (logged == true) {
      console.log('AlreadyAuthGuard: user already logged, redirecting to client-action page');
      return this.router.navigate(['/client/client-action'], {skipLocationChange: true});
    } else {
      console.log('AlreadyAuthGuard: user not logged, remaining in page');
      return true;
    }
  }
}
interface Response {
  message: string;
  messageB: string;
}
