import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private sa:AuthService,private route:Router,private fs:AngularFirestore) { }

  ngOnInit(): void {
  }
  register(f:any){
    console.log(f.value);
   let data=f.value
    
    this.sa.signUp(data.email,data.password).then((user)=>{
      alert("Registration Done")
      this.fs.collection("users").doc(user.user.uid).set({
        Username:data.Username,
        Bio:data.Bio,
        email:data.email,
        uid:user.user.uid
      }).then(()=>{
        this.route.navigate(['/login'])
      })
      
    }).catch(()=>{
      console.log("error")
    })
  }
}