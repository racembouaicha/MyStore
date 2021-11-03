import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { analytics } from 'firebase';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Uid :any
  dataProfile:any
  constructor(private as:AuthService,private fs:AngularFirestore) {
    this.as.user.subscribe((user:any)=>{
      this.Uid=user.uid
    })
   }

  ngOnInit(): void {
    this.fs.collection("users").snapshotChanges().subscribe((data:any)=>{
      this.dataProfile=data.map((element: 
        { payload: 
          { doc:
             { id: any; data: () =>
              { (): any; new(): any;[x: string]: any; }; 
            }; 
          }; 
        }) =>
      {
        element
        /*if(element.payload.doc.id===this.Uid){*/
          return{
            id:element.payload.doc.id,
            username:element.payload.doc.data()['Username'],
            Bio:element.payload.doc.data()['Bio'],
            image:element.payload.doc.data()['image'],
          }
        }
      )
    })
  }

}
