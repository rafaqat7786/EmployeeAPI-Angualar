import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formvalue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd! : boolean;
  showUpdate! : boolean;

  constructor(private formbuilder: FormBuilder,private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formvalue.value.firstName;
    this.employeeModelObj.LastName = this.formvalue.value.lastName;
    this.employeeModelObj.Email = this.formvalue.value.email;
    this.employeeModelObj.Mobile = this.formvalue.value.mobile;
    this.employeeModelObj.Salary = this.formvalue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
       this.employeeData = res.employeeDetails;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.Id = row.id;
    this.formvalue.controls['firstName'].setValue(row.firstName);
    this.formvalue.controls['lastName'].setValue(row.lastName);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['mobile'].setValue(row.mobile);
    this.formvalue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formvalue.value.firstName;
    this.employeeModelObj.LastName = this.formvalue.value.lastName;
    this.employeeModelObj.Email = this.formvalue.value.email;
    this.employeeModelObj.Mobile = this.formvalue.value.mobile;
    this.employeeModelObj.Salary = this.formvalue.value.salary;

    this.api.updateEmployee(this.employeeModelObj)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployee();
    })
  }

}
