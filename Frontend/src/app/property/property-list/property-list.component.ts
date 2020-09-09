import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  PropertiesList: Array<IPropertyBase> ;

  constructor(private route: ActivatedRoute, private housingservice: HousingService) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString()) {
      this.sellRent = 2; //Means we are on rent-property URL else we are on base URL
    }
    this.housingservice.getAllProperties(this.sellRent).subscribe(
      data => {
        this.PropertiesList = data;
        console.log(data);
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
}
