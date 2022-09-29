import {RouterModule, Routes} from "@angular/router";
import {ClientLoginComponent} from "./client-login/client-login.component";
import {NgModule} from "@angular/core";
import {OrderComponent} from "./order/order.component";
import {OrderStatusComponent} from "./order-status/order-status.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {AlreadyAuthIn} from "./routerguards/already-auth.guard";
import {NoAuthGuard} from "./routerguards/no-auth.guard";
import {TaskGuard} from "./routerguards/task.guard";


const clientRoutes: Routes = [
  {path: '', component: ClientLoginComponent, canActivate: [AlreadyAuthIn]},
  {path: 'order', component: OrderComponent, canActivate: [NoAuthGuard, TaskGuard]},
  {path: 'order-status', component: OrderStatusComponent, canActivate: [NoAuthGuard, TaskGuard]},
  {path: 'feedback', component: FeedbackComponent, canActivate: [NoAuthGuard, TaskGuard]},
  {path: 'refresh', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
