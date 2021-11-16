import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';

import { AuthService } from '../Services/auth.service';
/*import {  moveIn } from '../router.animations';*/


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  /*animations:[moveIn()],
  host:{'[@moveIn]':'s'}*/
})
export class LoginComponent implements OnInit {
  messageError=''
  public location:any
  constructor(private sa:AuthService,private route:Router,public afAuth:AngularFireAuth,private fs:AngularFirestore) { }

  ngOnInit(): void {
  }

  login(f:any){
    let data=f.value
    this.sa.singIn(data.email,data.password)
    .then((user)=>{
    localStorage.setItem("userConnect",user.user.uid)
    alert("Login Done")
    this.route.navigate(['/'])
    
  })
    .catch(()=>{
     // alert("error")
      this.messageError='incorrect Email or Password'
  })
  }

  signinWithGoogle(){
    const googleAuthProvider =new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider).then((user)=>{
      localStorage.setItem("userConnect",user.user.uid)//permet de sauvgarder le uid dans le localStorage dans un variable userConnect
      this.fs.collection("users").doc(user.user.uid).set({
      uid:user.user.uid,
      Username:user.user.displayName,
      email:user.user.email,
      image:user.user.photoURL,
      }
    );
    
  })
  }
 
}
