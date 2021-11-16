import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';


import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Uid :any
  succesMessage=''
  dataProfile ={
    Username:'',
    image:'',
    Bio:'',
    uid:'',
  }
  task:AngularFireUploadTask
  ref:AngularFireStorageReference
  percentages: any;
  constructor(private as:AuthService,private fs:AngularFirestore,private fst:AngularFireStorage) {
    this.as.user.subscribe((user:any)=>{
      this.Uid=user.uid
    })
   }

    ngOnInit(): void {
      this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data:any)=>{
            console.log(data.data())
            this.dataProfile.Username=data.data()['Username'],
            this.dataProfile.image=data.data()['image'],
            this.dataProfile.Bio=data.data()['Bio'],
            this.dataProfile.uid=localStorage.getItem("userConnect")
      })
    }
    update(){
      this.fs.collection("users").doc(this.dataProfile.uid).update({
        Username:this.dataProfile.Username,
        Bio:this.dataProfile.Bio
      }).then(()=>{
        this.succesMessage="Update !"
        window.location.reload()
      })
    }

    uploadImage( event: any) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.fst.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.percentages = this.task.percentageChanges();
    this.task.then((data) => {
      data.ref.getDownloadURL().then(url => {
        this.fs.collection("users").doc(this.Uid).update({
          image: url
        });
      });
    });
  }
}

