import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    Uid: string
    successMessage=''
  constructor( private fs:AngularFirestore,private as:AuthService) {
    this.as.user.subscribe(user=>{
      this.Uid=user.uid
    })
   }

  ngOnInit(): void {
  }
  addProduct(f:any){
    let data=f.value
    this.fs.collection("products").doc(this.Uid).set({
      title:data.title,
      discription:data.discription,
      image:data.image,
      uid:this.Uid,
    }).then(()=>{
      this.successMessage="Added"
    })
  }
}
