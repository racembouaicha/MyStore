import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy {

  isUser:any
  getUser:Subscription
  constructor(private af:AngularFireAuth,private route:Router,private as:AuthService ) { 
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
