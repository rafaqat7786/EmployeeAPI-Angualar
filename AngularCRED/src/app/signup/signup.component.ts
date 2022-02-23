import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // public signupForm !: FormGroup; 
  // public signupObj = new UserModel();
  signupForm !: FormGroup;
  signupObj : UserModel = new UserModel();

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router,private api: ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:["",Validators.required],
      username:["",Validators.compose([Validators.required,Validators.email])],
      // username:["",Validators.required],
      mobile:["",Validators.required],
      password:["",Validators.required],
      usertype:["",Validators.required]

    })
  }

  signUp(){
    // this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
    // .subscribe(res=>{
    //   alert("Signup Successfull");
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // },err=>{
    //   alert("Something went wrong");
    // })
    this.signupObj.FullName = this.signupForm.value.fullname;
    this.signupObj.UserName = this.signupForm.value.username;
    this.signupObj.Password = this.signupForm.value.password;
    this.signupObj.UserType = this.signupForm.value.usertype;
    this.signupObj.Mobile = this.signupForm.value.mobile;

    console.log("signupObj Value",this.signupObj,"signupForm", this.signupForm.value);

    this.api.signUpDetail(this.signupObj).subscribe(x=>{
      console.log("inside signup api", x);
      alert(x.message);
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
    // err=>{
    //   alert("Something Went Wrong");
    // })

    // this.api.signUp(this.signupObj)
    // .subscribe(res=>{
    //   alert(res.message);
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // })
  }

}
