import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ClientService} from "../client.service";

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanActivate {
  constructor(private clientService: ClientService,
              private router: Router) {  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let clientTask = this.clientService.getClientTask();
    console.log("clientTask = "+clientTask);
    let correctRoute;
    let currentRoute = this.router.getCurrentNavigation().initialUrl.toString();
    console.log("currentRoute: "+currentRoute)
    switch (clientTask) {
      case 'task_0':
        correctRoute = '/client/order';
        if (currentRoute == correctRoute) {
          return true;
        }
        return this.router.createUrlTree([correctRoute]);
      case 'task_1':
        correctRoute = '/client/order-status';
        if (currentRoute == correctRoute) {
          return true;
        }
        return this.router.createUrlTree([correctRoute]);
      case 'task_2':
        correctRoute = '/client/feedback';
        if (currentRoute == correctRoute) {
          return true;
        }
        return this.router.createUrlTree([correctRoute]);
    }
    return true;
  }
}
