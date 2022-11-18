import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
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
    console.log('AlreadyAuthGuard: already logged in Angular, checking the backend status')
    return this.clientService.isUserLogged()
      .pipe(
        map(
          (response: Response) => {
            let loginStatus = response.message;
            if (loginStatus == 'not_logged') {
              localStorage.clear();
              console.log('AlreadyAuthGuard: user not logged, remaining in page');
              return true;
            } else {
              console.log('AlreadyAuthGuard: user already logged, redirecting to client-action page');
              this.router.navigate(['/client/client-action'], {skipLocationChange: true});
              return false;
            }
          }));
  }
}
interface Response {
  message: string;
  messageB: string;
}
