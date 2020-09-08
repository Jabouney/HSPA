import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IProperty } from '../property-list/IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') AddPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  // Will comes from masters
  propertyTypes: Array<string> = ['House', 'Appartement', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  location: Array<string> = ['East', 'West', 'South', 'North'];

  propertyView: IProperty = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    Type: null
  };

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log("Congrats, form submitted.");
    console.log(this.AddPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
}
