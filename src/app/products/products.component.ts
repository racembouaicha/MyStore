import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy{
    Uid: string
    successMessage=''
    dataArray: any;
    getProducts:Subscription
  constructor( private fs:AngularFirestore,private as:AuthService ,private route:Router) {
    this.as.user.subscribe(user=>{
      this.Uid=user.uid
    })
   }
 

   ngOnInit(): void {
    this.getProducts=this.fs.collection("products").snapshotChanges().subscribe((data:any)=>{
     this.dataArray= data.map((element: { payload: { doc: { id: any; data: () => { (): any; new(): any;[x: string]: any; }; }; }; })=>{
        return{
          id:element.payload.doc.id,
          title:element.payload.doc.data()['title'],
          discription:element.payload.doc.data()['discription'],
          image:element.payload.doc.data()['image'],
          uid:this.Uid
        }
      })
    })
  }
  detail(id: string){
    this.route.navigate(['/product/'+id])
   
  }
  ngOnDestroy(): void {
    this.getProducts.unsubscribe()
  }

}