import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sale } from '../../models/sale.model';
import { SaleService } from '../../services/sale-service.service';

@Component({
  selector: 'app-order-details',
  standalone:true,
  imports:[CommonModule,RouterLink,FormsModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order!: Order;
  customers: Customer[] = [];
  products: Product[] = [];
  customerName: string = '';
  productNames: { [key: number]: string } = {};
  showModal: boolean = false;
  isDeliver: boolean = false;
  saleDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private saleService: SaleService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.orderService.getOrder(id).subscribe(order => {
        this.order = order;
        this.fetchCustomers();
        this.fetchProducts();
      });
    }
  }

  fetchCustomers(): void {
    this.orderService.getCustomers().subscribe(data => {
      this.customers = data;
      this.setCustomerName();
    });
  }

  fetchProducts(): void {
    this.orderService.getProducts().subscribe(data => {
      this.products = data;
      this.setProductNames();
    });
  }

  setCustomerName(): void {
    const customer = this.customers.find(c => c.CustomerId === this.order.CustomerId);
    this.customerName = customer ? customer.CustomerName : '';
  }

  setProductNames(): void {
    this.order.OrderDetails.forEach(detail => {
      const product = this.products.find(p => p.ProductId === detail.PrdId);
      if (product) {
        this.productNames[detail.PrdId] = product.ProductName;
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['/orders']);
  }

  confirmOrder(): void {
    this.showModal = true;
    console.log("I am clickeed");
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitSale(): void {
    const sale: Sale = {
      SaleId: 0,
      OrderId: this.order.OrderId,
      CustomerId: this.order.CustomerId,
      IsDeliver: this.isDeliver,
      SaleDate: new Date(this.saleDate),
      SalesDetails: this.order.OrderDetails.map(detail => ({
        Id: 0,
        purId: 0, // This will be set to the SaleId on the server side when creating the sale
        PrdId: detail.PrdId,
        Qty: detail.Qty
      }))
    };

    this.saleService.addSale(sale).subscribe(() => {
      this.closeModal();
      this.router.navigate(['/sales']);
    });
  }
}
