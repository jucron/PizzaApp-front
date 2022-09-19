import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLoginComponent} from './client-login/client-login.component';
import {OrderComponent} from './order/order.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ClientComponent} from './client.component';
import {RouterModule} from "@angular/router";
import {ClientRoutingModule} from "./client-routing.module";


@NgModule({
  declarations: [
    ClientLoginComponent,
    OrderComponent,
    OrderStatusComponent,
    FeedbackComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
