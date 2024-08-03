import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { productService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  // imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FooterComponent,MatTableModule,FormsModule,CommonModule, MatButtonModule, MatIconModule,RouterLink]
})
export class HomeComponent  implements OnInit {
searchText: any;

    constructor(private srv:productService){
  
    }
    productList:Product[]=[]
    
    ngOnInit(): void {
      this.loadData()
    }
  
    loadData(){
      this.srv.getAll().subscribe({
        next:(data)=>{
          this.productList=data;
        },
        error:(er)=>{
          console.log(er);
          
        }
      })
    }
}