import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLoginComponent} from './client-login/client-login.component';
import {OrderComponent} from './order/order.component';
import {OrderStatusComponent} from './order-status/order-status.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ClientComponent} from './client.component';
import {RouterModule} from "@angular/router";
import {ClientRoutingModule} from "./client-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClientActionComponent} from './client-action/client-action.component';
import {
  BottomSheetStartProcessComponent
} from './client-action/bottom-sheet-startprocess/bottom-sheet-start-process.component';
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";


@NgModule({
  declarations: [
    ClientLoginComponent,
    OrderComponent,
    OrderStatusComponent,
    FeedbackComponent,
    ClientComponent,
    ClientActionComponent,
    BottomSheetStartProcessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatBottomSheetModule
  ],
  entryComponents: [BottomSheetStartProcessComponent]
})
export class ClientModule {

}
