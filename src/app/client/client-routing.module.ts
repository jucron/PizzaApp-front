import {RouterModule, Routes} from "@angular/router";
import {ClientLoginComponent} from "./client-login/client-login.component";
import {NgModule} from "@angular/core";


const clientRoutes: Routes = [
  {path: '', component: ClientLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(clientRoutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
