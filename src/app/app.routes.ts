import { Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { ReturnListComponent } from './components/return-list/return-list.component';
import { AddReturnComponent } from './components/add-return/add-return.component';
import { DamageListComponent } from './components/damage-list/damage-list.component';
import { AddDamageComponent } from './components/add-damage/add-damage.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { PurchaseDetailComponent } from './components/purchase-detail/purchase-detail.component';

export const routes: Routes = [
// {path:'', redirectTo:'home', pathMatch:'full'},

{path:'home', component: HomeComponent},
//category
{path:'category', component: CategoryListComponent},
{path:'add-category', component: AddCategoryComponent},
{path:'add-category/:id', component: AddCategoryComponent},
//Product
{path:'List', component: ProductListComponent},
{path:'add-products', component: AddProductComponent},
{path:'products/:id', component: AddProductComponent},
//Customer
{path:'CList', component: CustomerListComponent},
{path:'addC', component: AddCustomerComponent},
{path:'addC/:id', component: AddCustomerComponent},
//vendor
{path:'VList', component: VendorListComponent},
{path:'addV', component: AddVendorComponent},
{path:'addV/:id', component: AddVendorComponent},
//return
{path:'RList', component: ReturnListComponent},
{path:'addR', component: AddReturnComponent},
{path:'addR/:id', component: AddReturnComponent},
//damage
{path:'DList', component: DamageListComponent},
{path:'addD', component: AddDamageComponent},
{path:'addD/:id', component: AddDamageComponent},

//auth
{ path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

//order
    { path: 'orders', component: OrderListComponent },
    { path: 'orders/new', component: OrderFormComponent },
    { path: 'orders/:id', component: OrderFormComponent },
    { path: 'orders/details/:id', component: OrderDetailsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

//About Us

{path: 'about', component: AboutUsComponent},
//Purchase
{path: 'purchase', component: PurchaseListComponent},
{ path: 'Purchase/new', component: PurchaseFormComponent },
{ path: 'purchase/:id', component: PurchaseFormComponent },
{ path: 'purchase/details/:id', component: PurchaseDetailComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
];
