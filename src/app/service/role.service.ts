import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../models/roles';
import { environment } from 'src/environments/environments';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private client:HttpClient) { 


  }

  GetAllRoles(pageIndex:number,pageSize:number,filter:string=""):Observable<{ totalItems: number; roles: Roles[] | null }>
  {
    const httpOptions = {
    observe: 'response' as 'response'};
   return this.client.get<Roles[]>(`${environment.apiUrl}/Roles?pageIndex=${pageIndex}&pageSize=${pageSize}`,httpOptions)
   .pipe(map(x=>
    {
      let header: any = JSON.parse(x.headers.get('x-pagination') || "");
      let totalItems = header['TotalCount'] as number;
      return {totalItems:totalItems,roles:x.body}
    }
   ))
  }
}
