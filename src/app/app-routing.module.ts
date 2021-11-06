import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { GuardService } from './Services/Guard/guard.service';
import { UnguardService } from './Services/Guard/unguard.service';

const routes: Routes = [
  {path:'',component:HomeComponent},
 /* {path:'',redirectTo:'notFound',component:NotFoundComponent},*/
  {path:'login',component:LoginComponent ,canActivate:[UnguardService]},
  {path:'register',component:RegisterComponent ,canActivate:[UnguardService]},
  {path:'profile',component:ProfileComponent ,canActivate:[GuardService]},
  {path:'products',component:ProductsComponent ,canActivate:[GuardService]},
  {path:'myproducts',component:MyProductsComponent ,canActivate:[GuardService]},
  {path:'product/:key',component:DetailsProductComponent,canActivate:[GuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
