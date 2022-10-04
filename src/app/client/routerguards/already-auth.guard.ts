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
    let logged = this.clientService.checkLoginStatus();
    console.log('user already logged:'+logged);
    if (logged) {
      return this.router.navigate(['/client/client-action'], {skipLocationChange: true});
    } else {
      return true;
    }
  }
}
