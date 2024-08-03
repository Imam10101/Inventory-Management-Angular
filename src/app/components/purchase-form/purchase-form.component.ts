import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../models/purchase.model';
import { Vendor } from '../../models/vendor.model';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './purchase-form.component.html',
  styleUrl: './purchase-form.component.css'
})
export class PurchaseFormComponent implements OnInit {
  purchase: Purchase = {
    PurchaseId: 0,
    VendorId: 0,
    PurchaseDate: new Date(),
    TotalPrice: 0,
    PurchasesDetails: [
      { Id: 0, purId: 0, PrdId: 0, Qty: 1 } 
    ]
  };
  vendors: Vendor[] = [];
  products: Product[] = [];
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService
  ) { }
  
  ngOnInit(): void {
    this.fetchVendors();
    this.fetchProducts();

    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.isEditMode = true;
      this.purchaseService.getPurchase(id).subscribe(purchase => {
        this.purchase = purchase;
        this.updatePurchaseDate();
      });
    } else {
      this.updatePurchaseDate();
    }
  } 

  fetchVendors(): void {
    this.purchaseService.getVendors().subscribe(data => this.vendors = data);
    console.log('Fetched vendors:', this.vendors);
  }

  fetchProducts(): void {
    this.purchaseService.getProducts().subscribe(data => this.products = data);
  }

  savePurchase(): void {
    if (this.isEditMode) {
      this.purchaseService.updatePurchase(this.purchase.PurchaseId, this.purchase).subscribe(() => this.router.navigate(['/purchase']));
    } else {
      this.purchaseService.addPurchasse(this.purchase).subscribe(() => this.router.navigate(['/purchase'])); // Fixed typo
    }
  }

  addPurchaseDetail(): void {
    this.purchase.PurchasesDetails.push({ Id: 0, purId: this.purchase.PurchaseId, PrdId: 0, Qty: 1 });
  }

  removePurchaseDetail(index: number): void {
    this.purchase.PurchasesDetails.splice(index, 1);
  }

  updatePurchaseDate(): void {
    const purchaseDate = new Date(this.purchase.PurchaseDate); // Clone the current purchase date
    const daysToAdd = 5; // you can adjust as needed
    const newDate = new Date(purchaseDate.setDate(purchaseDate.getDate() + daysToAdd));
    this.purchase.PurchaseDate = newDate;
  }

  onPurchaseDateChange(): void {
    this.updatePurchaseDate();
  }
}