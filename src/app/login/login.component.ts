import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageError=''
  constructor(private sa:AuthService,private route:Router) { }

  ngOnInit(): void {
  }

  login(f:any){
    let data=f.value
    this.sa.singIn(data.email,data.password)
    .then(()=>{alert("Login Done")
    this.route.navigate(['/'])
  })
    .catch(()=>{
     // alert("error")
      this.messageError='incorrect Email or Password'
  })
  }
}
