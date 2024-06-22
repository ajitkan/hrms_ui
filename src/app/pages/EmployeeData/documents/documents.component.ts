import { Component } from '@angular/core';

@Component({
  selector: 'emp-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
docList:any;
constructor(){

}
ngOnInit(){
  if(sessionStorage.getItem("documentDetails")!=null){
    this.docList = JSON.parse(sessionStorage.getItem("documentDetails")as string)
  }
}}
