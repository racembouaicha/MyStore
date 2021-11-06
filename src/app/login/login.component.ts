import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageError=''
  constructor(private sa:AuthService,private route:Router,public afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  login(f:any){
    let data=f.value
    this.sa.singIn(data.email,data.password)
    .then((user)=>{alert("Login Done")
    this.route.navigate(['/'])
    localStorage.setItem("userConnect",user.user.uid)
  })
    .catch(()=>{
     // alert("error")
      this.messageError='incorrect Email or Password'
  })
  }

 
}
