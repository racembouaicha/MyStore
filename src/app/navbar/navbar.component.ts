import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUser:any
  constructor(private af:AngularFireAuth,private route:Router,private as:AuthService) { 
    this.as.user.subscribe(user=>{
      if(user){
        this.isUser=true
      }else{
        this.isUser=false
      }
    })
  }

  ngOnInit(): void {
  }
  logout(){
    this.af.signOut()
    .then(()=>{
      //alert("Logout")
      this.route.navigate(['/login'])
    })
    .catch(()=>{
      alert("Error")
    })
  }
}
