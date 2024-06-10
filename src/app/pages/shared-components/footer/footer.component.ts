import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(){}
  ngOnInit(): void {
    const year = new Date().getFullYear();
    document.getElementById("copy-year")!.innerHTML = year.toString();
  }
}
