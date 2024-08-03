import { SalesDetails } from "./sales-details.model";

export interface Sale {
SaleId: number;
  OrderId: number;
  CustomerId: number;
  IsDeliver: boolean;
  SaleDate: Date;
  SalesDetails: SalesDetails[];
}
