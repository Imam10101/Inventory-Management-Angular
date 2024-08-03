// src/app/models/order.model.ts
import { OrderDetail } from './order-detail.model';

export interface Order {
  OrderId: number;
  CustomerId: number;
  OrderDate: Date;
  TotalPrice: number;
  IsEmergency: boolean;
  DeliveryDate: Date;
  OrderDetails: OrderDetail[];
}

export { OrderDetail };
