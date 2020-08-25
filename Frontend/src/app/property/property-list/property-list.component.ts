import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from './IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  PropertiesList: Array<IProperty> ;

  constructor(private housingservice: HousingService) { }

  ngOnInit() {
    this.housingservice.getAllProperties().subscribe(
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
