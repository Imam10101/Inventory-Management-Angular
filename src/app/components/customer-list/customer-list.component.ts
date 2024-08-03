import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  dataList:Customer[]=[]
  constructor(private srv:CustomerService,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.srv.getAll().subscribe({
      next:(result)=>{
        console.log(result)
        this.dataList=result
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
    const dialogRef = this.dialog.open(AddCustomerComponent, 
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
