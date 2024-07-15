// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'designation'
// })
// export class Designation implements PipeTransform {

//   transform(value: any, ...args: any[]): string {
//     if (value!= '') {
//         // Convert to string and remove commas
//         let designationName = null;

//         Designation.forEach((designation:any) => {
//           if (designation.designationId === va) {
//             designationName = designation.name;
//           }
//         });
      
//         // return designationName;
      
//         // return Designation.filter((designation:any) => {

            
//         // });
//         //value.toLocaleString('en-US', { useGrouping: false });
//       } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
//         // Convert string to number and remove commas
//         return parseFloat(value).toLocaleString('en-US', { useGrouping: false });
//       } else {
//         // If the input is not a number or a numeric string, return as is
//         return value;
//       }
//   }
// }