import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy {
  dataProfile ={
    Username:'',
    image:'',
    Bio:'',
    uid:'',
  }
  isUser:any
  getUser:Subscription
  constructor(private af:AngularFireAuth,private route:Router,private as:AuthService,private fs:AngularFirestore ) { 
    this.getUser=this.as.user.subscribe(user=>{
      if(user){
        this.isUser=true
      }else{
        this.isUser=false
      }
    })
  }
  ngOnDestroy(): void {
    this.getUser.unsubscribe()
  }

  ngOnInit(): void {
    //userConnect c'est un variable contenant le valeur uid d'apres le page login 
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data:any)=>{
      console.log(data.data())
      this.dataProfile.Username=data.data()['Username'],
      this.dataProfile.image=data.data()['image'],
      this.dataProfile.uid=localStorage.getItem("userConnect")
})
  }
  logout(){
    this.af.signOut()
    .then(()=>{
      //alert("Logout")
      localStorage.removeItem("userConnect")
      this.route.navigate(['/login'])
    })
    .catch(()=>{
      alert("Error")
    })
  }
}
