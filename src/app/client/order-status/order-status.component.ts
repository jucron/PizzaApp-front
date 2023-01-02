import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientService, Order} from "../client.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterViewInit {
  order: Order;
  statusCode = ['confirmed','accepted','baking','pizzaReady','delivering','pizzaDelivered','finished'];
  statusView = ['Confirmed','Accepted','Baking','Pizza Ready','Delivering','Delivered','Finished'];

  constructor(
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.assignOrder();
  }

  ngAfterViewInit(): void {
    this.assignOrder();
    this.updateOrder().then();
  }

  async updateOrder() {
    console.log('updateOrder accessed')
    let count = 1;
    let milliseconds = 20000;
    let sub = interval(milliseconds).subscribe(() => {
      console.log(milliseconds*count/1000+' seconds passed: Running \'updateOrder\' again with count='+count)
      count++;
      this.assignOrder();
      if (this.order.status=='finished') {
        sub.unsubscribe();
      }
    })
  }

  assignOrder () {
    this.clientService.getOrder()
      .subscribe((orderFetched: Order)=>{
        this.order = orderFetched;
      });
}

  closeTask() {
  }

  forwardStatus() {
    this.order.status=this.statusCode[this.statusCode.indexOf(this.order.status)+1]
  }
}
