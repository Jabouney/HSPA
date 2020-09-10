import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();

  // Will comes from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  mainEntrance: Array<string> = ['East', 'West', 'South', 'North'];

  propertyView: IPropertyBase = {
    Id: null,
    SellRent: null,
    Name: '',
    PType: null,
    FType: null,
    Price: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private housingService: HousingService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }

  createAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, [Validators.required, Validators.minLength(5)]],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: ['1', Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    });
  }

  //#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfoGroup() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfoGroup() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfoGroup() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfoGroup() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }
// #endregion

//#region <Form Controls>
  get SellRentControl() {
    return this.BasicInfoGroup.controls.SellRent as FormControl;
  }

  get BHKControl() {
    return this.BasicInfoGroup.controls.BHK as FormControl;
  }

  get PTypeControl() {
    return this.BasicInfoGroup.controls.PType as FormControl;
  }

  get FTypeControl() {
    return this.BasicInfoGroup.controls.FType as FormControl;
  }

  get NameControl() {
    return this.BasicInfoGroup.controls.Name as FormControl;
  }

  get CityControl() {
    return this.BasicInfoGroup.controls.City as FormControl;
  }

  get PriceControl() {
    return this.PriceInfoGroup.controls.Price as FormControl;
  }

  get BuiltAreaControl() {
    return this.PriceInfoGroup.controls.BuiltArea as FormControl;
  }

  get CarpetAreaControl() {
    return this.PriceInfoGroup.controls.CarpetArea as FormControl;
  }

  get SecurityControl() {
    return this.PriceInfoGroup.controls.Security as FormControl;
  }

  get MaintenanceControl() {
    return this.PriceInfoGroup.controls.Maintenance as FormControl;
  }

  get FloorNoControl() {
    return this.AddressInfoGroup.controls.FloorNo as FormControl;
  }

  get TotalFloorControl() {
    return this.AddressInfoGroup.controls.TotalFloor as FormControl;
  }

  get AddressControl() {
    return this.AddressInfoGroup.controls.Address as FormControl;
  }

  get LandMarkControl() {
    return this.AddressInfoGroup.controls.LandMark as FormControl;
  }

  get RTMControl() {
    return this.OtherInfoGroup.controls.RTM as FormControl;
  }

  get PossessionOnControl() {
    return this.OtherInfoGroup.controls.PossessionOn as FormControl;
  }

  get AOPControl() {
    return this.OtherInfoGroup.controls.AOP as FormControl;
  }

  get GatedControl() {
    return this.OtherInfoGroup.controls.Gated as FormControl;
  }

  get MainEntranceControl() {
    return this.OtherInfoGroup.controls.MainEntrance as FormControl;
  }

  get DescriptionControl() {
    return this.OtherInfoGroup.controls.Description as FormControl;
  }

//#endregion
//#endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website.');
      console.log(this.addPropertyForm);

      if (this.SellRentControl.value === '2') {
        this.router.navigate(['/rent-property']);
      }
      else {
        this.router.navigate(['/']);
      }

    }
    else {
      this.alertify.error('Please review the form and provid all valid entries.');
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRentControl.value;
    this.property.BHK = this.BHKControl.value;
    this.property.PType = this.PTypeControl.value;
    this.property.Name = this.NameControl.value;
    this.property.City = this.CityControl.value;
    this.property.FType = this.FTypeControl.value;
    this.property.Price = this.PriceControl.value;
    this.property.Security = this.SecurityControl.value;
    this.property.Maintenance = this.MaintenanceControl.value;
    this.property.BuiltArea = this.BuiltAreaControl.value;
    this.property.CarpetArea = this.CarpetAreaControl.value;
    this.property.FloorNo = this.FloorNoControl.value;
    this.property.TotalFloor = this.TotalFloorControl.value;
    this.property.Address = this.AddressControl.value;
    this.property.Address2 = this.LandMarkControl.value;
    this.property.RTM = this.RTMControl.value;
    this.property.AOP = this.AOPControl.value;
    this.property.Gated = this.GatedControl.value;
    this.property.MainEntrance = this.MainEntranceControl.value;
    this.property.Possession = this.PossessionOnControl.value;
    this.property.Description = this.DescriptionControl.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean{
    if (this.BasicInfoGroup.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfoGroup.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfoGroup.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfoGroup.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }

    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid?: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid || (IsCurrentTabValid == null)) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }
}
