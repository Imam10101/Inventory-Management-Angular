import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../models/purchase.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Vendor } from '../../models/vendor.model';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css'
})
export class PurchaseListComponent implements OnInit{
  purchases:Purchase[]= [];
  vendors: Vendor[] = [];
  vendorNames: { [key: number]: string } = {};

  constructor(private route: ActivatedRoute, private purchaseService: PurchaseService, private router : Router){}
  
  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe(data => {
      this.purchases = data;
      this.fetchVendors();
    });
  }

 
  fetchVendors(): void {
    this.purchaseService.getVendors().subscribe(data => {
      this.vendors = data;
      this.setVendorNames();
    });
  }

  setVendorNames(): void {
    this.vendors.forEach(vendor => {
      this.vendorNames[vendor.VendorId] = vendor.VendorName;
    });
  }


  deletePurchase(id:number):void{
    this.purchaseService.deletePurchase(id).subscribe(()=>{
      this.purchases = this.purchases.filter(purchase => purchase.PurchaseId !== id);
    });
  }
  editPurchase(id:number):void{
    this.router.navigate([`/Purchase/${id}`]);
  }
  createPurchase():void {
    this.router.navigate(['/Purchase/new']);
  }
  viewDetails(id:number):void{
    this.router.navigate(['/Purchase/details',id])
  }

}