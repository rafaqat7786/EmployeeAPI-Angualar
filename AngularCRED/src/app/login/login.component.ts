import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup;
  public loginObj = new UserModel();

  constructor(private fromBuilder: FormBuilder, private http: HttpClient, private router: Router,private api : ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      email:[" ",Validators.compose([Validators.required,Validators.email])],
      password:[" ",Validators.required]
    })
  }

  login(){
    
    this.loginObj.UserName = this.loginForm.value.email;
    this.loginObj.Password = this.loginForm.value.password;

    this.api.login(this.loginObj)
    .subscribe(res=>{
      alert(res.message);
      this.router.navigate(['dashboard']);
    })
  }

}
