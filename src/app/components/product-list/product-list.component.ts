import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/product.model';

import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { productService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';





@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink,MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  productlist:Product[]=[]
  constructor(private srv:productService,
    public dialog: MatDialog,  router : Router
  ){}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.srv.getAll().subscribe({
      next:(result)=>{
        console.log(result)
        this.productlist=result
      },
      error:(er)=>{
        console.log(er)
      }
    })
  }
 
  openDialog(id?:number): void {
    const dialogConfig= new MatDialogConfig();
  dialogConfig.autoFocus=true;
  dialogConfig.disableClose=true;
  dialogConfig.width="60%",
  dialogConfig.data=id;
    const dialogRef = this.dialog.open(AddProductComponent, 
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadData();
    });
  }
  delete(id:number){
      this.srv.delete(id).subscribe({
        next:(r)=>{
          console.log(r)
          this.loadData();
        },
        error:(err)=>{
  console.log(err)
        }
      })
  }


  }
  