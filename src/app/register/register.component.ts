import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sa:AuthService,private route:Router,private fs:AngularFirestore,public afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }
  register(f:any){
    console.log(f.value);
   let data=f.value
    
    this.sa.signUp(data.email,data.password).then((user)=>{
      localStorage.setItem("userConnect",user.user.uid)
      alert("Registration Done")
      this.fs.collection("users").doc(user.user.uid).set({
        Username:data.Username,
        Bio:data.Bio,
        email:data.email,
        uid:user.user.uid,
        image:'data:image/jpeg;base64,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'
      }).then(()=>{
        this.route.navigate(['/login'])
      })
      
    }).catch(()=>{
      console.log("error")
    })
  }

  signinWithGoogle(){
    const googleAuthProvider =new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider).then((user)=>{
      this.fs.collection("users").doc(user.user.uid).set({
      uid:user.user.uid,
      Username:user.user.displayName,
      email:user.user.email,
      image:user.user.photoURL,
      }
    );
    
  }
    )}}