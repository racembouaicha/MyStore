import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
    Uid: string
    successMessage=''
    dataArray:any
  constructor( private fs:AngularFirestore,private as:AuthService) {
    this.as.user.subscribe(user=>{
      this.Uid=user.uid
    })
   }

  ngOnInit(): void {
    this.fs.collection("products").snapshotChanges().subscribe((data:any)=>{
     this.dataArray= data.map((element: { payload: { doc: { id: any; data: () => { (): any; new(): any;[x: string]: any; }; }; }; })=>{
        return{
          id:element.payload.doc.id,
          title:element.payload.doc.data()['title'],
          discription:element.payload.doc.data()['discription'],
          image:element.payload.doc.data()['image'],
          uid:element.payload.doc.data()['uid']
        }
      })
    })
  }
  addProduct(f:any){
    let data=f.value
    this.fs.collection("products").add({
      title:data.title,
      discription:data.discription,
      image:data.image,
      uid:this.Uid,
    }).then(()=>{
      this.successMessage="Added"
    })
  }
}