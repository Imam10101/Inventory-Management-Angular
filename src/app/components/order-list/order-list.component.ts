import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  customers: Customer[] = [];
  customerNames: { [key: number]: string } = {};

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.fetchCustomers();
    });
  }

  fetchCustomers(): void {
    this.orderService.getCustomers().subscribe(data => {
      this.customers = data;
      this.setCustomerNames();
    });
  }

  setCustomerNames(): void {
    this.customers.forEach(customer => {
      this.customerNames[customer.CustomerId] = customer.CustomerName;
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.OrderId !== id);
    });
  }

  editOrder(id: number): void {
    this.router.navigate([`/orders/${id}`]);
  }

  createOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/orders/details', id]);
  }
}
