import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') AddPropertyForm: NgForm;
  constructor(private router: Router) { }

  ngOnInit() {
    //this.AddPropertyForm.controls['Name'].setValue('Default Value');
    setTimeout(() => {
      this.AddPropertyForm.controls['Name'].setValue('Default Value');
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit(form: NgForm) {
    console.log("Congrats, form submitted.");
    console.log(this.AddPropertyForm);
  }

}
