import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  order: Order = {
    OrderId: 0,
    CustomerId: 0,
    OrderDate: new Date(),
    TotalPrice: 0,
    IsEmergency: false,
    DeliveryDate: new Date(),
    OrderDetails: [
      { Id: 0, OrderId: 0, PrdId: 0, Qty: 1 } // Initialize with one order detail
    ]
  };
  customers: Customer[] = [];
  products: Product[] = [];
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.fetchCustomers();
    this.fetchProducts();

    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.isEditMode = true;
      this.orderService.getOrder(id).subscribe(order => {
        this.order = order;
        this.updateDeliveryDate();
      });
    } else {
      this.updateDeliveryDate();
    }
  }

  fetchCustomers(): void {
    this.orderService.getCustomers().subscribe(data => this.customers = data);
    console.log('Fetched customers:', this.customers);
  }

  fetchProducts(): void {
    this.orderService.getProducts().subscribe(data => this.products = data);
  }

  saveOrder(): void {
    if (this.isEditMode) {
      this.orderService.updateOrder(this.order.OrderId, this.order).subscribe(() => this.router.navigate(['/orders']));
    } else {
      this.orderService.addOrder(this.order).subscribe(() => this.router.navigate(['/orders']));
    }
  }

  addOrderDetail(): void {
    this.order.OrderDetails.push({ Id: 0, OrderId: this.order.OrderId, PrdId: 0, Qty: 1 });
  }

  removeOrderDetail(index: number): void {
    this.order.OrderDetails.splice(index, 1);
  }

  updateDeliveryDate(): void {
    const orderDate = new Date(this.order.OrderDate);
    const daysToAdd = this.order.IsEmergency ? 2 : 5;
    const deliveryDate = new Date(orderDate.setDate(orderDate.getDate() + daysToAdd));
    this.order.DeliveryDate = deliveryDate;
  }

  onOrderDateChange(): void {
    this.updateDeliveryDate();
  }

  onIsEmergencyChange(): void {
    this.updateDeliveryDate();
  }
}
