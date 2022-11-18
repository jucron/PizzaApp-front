import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ClientService} from "../client.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private clientService: ClientService,
              private router: Router) {  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let logged = this.clientService.isUserLogged();
    if (logged) {
      console.log('NoAuthGuard: User logged')
      return true;
    } else {
      console.log('NoAuthGuard: User logged, redirecting page')
      return this.router.createUrlTree([''])
    }
  }
}
