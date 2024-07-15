import { Injectable } from '@angular/core';
import { Designation } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor() { }

  getDesignationNameById(designationId: string): string | null {
    for (const designation of Designation) {
      if (designation.designationId === designationId) {
        return designation.name;
      }
    }
    return null;
  }
}
