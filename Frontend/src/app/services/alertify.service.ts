import { Injectable } from '@angular/core';
import * as alertJS from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

success(message: string){
  alertJS.success(message);
}

warning(message: string){
  alertJS.warning(message);
}

error(message: string){
  alertJS.error(message);
}

}
