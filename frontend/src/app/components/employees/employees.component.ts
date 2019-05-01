import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

declare var M: any;


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})

export class EmployeesComponent implements OnInit {
  show : boolean = false;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }
 
  addEmployee(form: NgForm) {
    // ver datos en consola
    // console.log(form.value);
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          console.log(res);
          this.resetForm(form);
          M.toast({ html: 'Updated Successfuly' }, 'rounded');
          this.getEmployees();
        })
    } else {

      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          // console.log(res);
          this.resetForm(form);
          M.toast({ html: 'save Successfuly' }, 'rounded');
          this.getEmployees();
        });
    }
  }
  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
        console.log(res);
      })
  }
  editEmployee(employee: Employee) {
    // console.log('entra');
    this.employeeService.selectedEmployee = employee;
    return this.show = false;
    // this.employeeService.putEmployee()
  }

  deleteEmployee(_id: string) {
    if(confirm('estas seguro de eliminar ? ')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          // console.log(res)
          // this.resetForm();
          M.toast({ html: 'Delete Successfuly' }, 'rounded');
          this.getEmployees();
        })
    }

  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
      this.getEmployees();
    }

  }
}
