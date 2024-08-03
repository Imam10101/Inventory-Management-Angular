import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { productService } from '../../services/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule, RouterLink, FormsModule],
})

export class AddProductComponent implements OnInit {
  
   product:Product={
    ProductId:0,
    CategoryId:0,
    ProductName :"",
    Description :"",
    Price:0,
    Quantity:0,
    ReorderQty:0
  };
  
  buttonText:string="Save";

    constructor(@Inject(MAT_DIALOG_DATA)  public data:any,
      private srv:productService,
      private dialogRef: MatDialogRef<AddProductComponent>,
      private route:ActivatedRoute
    ){}
    ngOnInit(): void {
     var id= this.data;
     console.log(this.data)
     if(id>0)
      {
        this.getByID(id)
      }
    }
    getByID(id:number){
  this.srv.get(id).subscribe({
    next:(res )=>{
      this.product=res;
      console.log(this.product)
      this.buttonText="Update";
    }
  })
    }
    SaveData(){
      console.log(this.product)
      if(this.product.ProductId>0)
        {
          this.srv.update(this.product)
          .subscribe({
            next:(data)=>{
              console.log(data)
              this.dialogRef.close();
            },
             error:(e)=>{
              console.log(e)
             } 
          })
        }
        else
        { 
          this.srv.create(this.product)
          .subscribe({
            next:(data)=>{
              console.log(data)
              this.dialogRef.close();
            },
             error:(e)=>{
              console.log(e)
             } 
          })}
     
    }
  }
  