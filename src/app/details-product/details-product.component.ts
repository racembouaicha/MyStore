import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  keyParams: string
  dataProduct={
    title:'',
    image:'',
    description:''
    
  }
  constructor(private parms:ActivatedRoute,private fs:AngularFirestore) { 
    this.parms.params.subscribe(query=>{
      return this.keyParams=query.key
    })
  }

  ngOnInit(): void {
    this.fs.collection('products').ref.doc(this.keyParams).get().then(data=>{
      console.log(data.data())
      this.dataProduct.title=data.data()['title']
      this.dataProduct.image=data.data()['image']
      this.dataProduct.description=data.data()['discription']
    })

  }

}