import {RouterModule, Routes} from "@angular/router";
import {ClientLoginComponent} from "./client-login/client-login.component";
import {NgModule} from "@angular/core";
import {OrderComponent} from "./order/order.component";
import {OrderStatusComponent} from "./order-status/order-status.component";
import {FeedbackComponent} from "./feedback/feedback.component";


const clientRoutes: Routes = [
  {path: '', component: ClientLoginComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order-status', component: OrderStatusComponent},
  {path: 'feedback', component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
