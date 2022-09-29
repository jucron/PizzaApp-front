import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientService} from "../client.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterViewInit {
  order = ClientService.order;

  constructor(
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getOrder();
  }

  ngAfterViewInit(): void {
    // this.routeThisPage();
    this.order = ClientService.order;
    this.updateOrder().then();
  }
  async updateOrder() {
    console.log('updateOrder accessed')
    let sub = interval(10000).subscribe(() => {
      this.clientService.getOrder();
      this.order = ClientService.order;
      if (this.order.status=='finished') {
        sub.unsubscribe();
      }
    })
  }
  onSubmit() { //todo: implement this in html
    this.clientService.changeClientTaskStatus("task_2");
    this.clientService.refreshPage();
  }
}
