import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  totalItems = 0;
  pageSize = 2;
  currentPage = 1;
  items!: Observable<Roles[]|null>

  constructor(private roleService: RoleService) {

  }
  ngOnInit(): void {
    debugger
    this.items = this.roleService.GetAllRoles(this.currentPage, this.pageSize).pipe(map(x => {
      this.totalItems=x.totalItems;
      return x.roles
    })); // Adjust for 0-based indexing
  }


  pageChanged(event: any) {
    debugger
    //this.items = this.roleService.GetAllRoles(event.page, event.itemsPerPage); // Adjust for 0-based indexing
    this.items = this.roleService.GetAllRoles(event.page, event.itemsPerPage).pipe(map(x => {
      this.totalItems=x.totalItems;
      return x.roles
    })); 
    // this.currentPage = event.page;
    // this.items = this.getData(this.currentPage - 1, this.pageSize);
  }

}
