import { Component } from "@angular/core";

@Component({
    selector:'app-navbar',
    template:`<section id="section-related-resources">

    <style>
      .btn-tag {
        background-color: var(--mdb-tertiary-bg) !important;
        text-transform: capitalize !important;
        /* margin-bottom: 10px; */
        
        box-shadow: none;
      }
          
      .btn-tag:hover {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .25), 0 3px 10px 5px rgba(0, 0, 0, 0.05) !important;
      }

      nav ul {
    list-style-type: none;
  }
  
  nav ul li {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    /* background-color: black;     */
    border-radius: 6px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: black;
  }
  
  nav ul li.active-link a {
    color: black; /* Change to the color you want */
    font-weight: 600;
    border-bottom: 1px solid;
    /* border-left: 1px solid;
    border-right: 1px solid;
    border-top: 1px solid; */
  }
  /* nav ul li.active-link{
    background: aqua;
  } */
  .text-start{
    margin-top: 2%;
    margin-right: 2%;
  }
  nav ul{
    margin: 0;
  }
  .btn-tag{
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .25), 0 3px 10px 5px rgba(0, 0, 0, 0.05) !important;
  }
    </style>

        <!-- <h2 style="DISPLAY: NONE;
        ">Related resources</h2> -->

    <!--Chips with links-->
    <div class="justify-content-start text-start w-100 row">
        <!-- <nav>
            <ul>
                <li routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
                    <a routerLink="" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Employee Details Summary</a>
                </li>
                <li routerLinkActive="active-link">                
                    <a data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                    Employment History</a>
                </li>
                <li  routerLinkActive="active-link">
                    <a data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Documentation</a>
                </li>
                <li  routerLinkActive="active-link">
                    <a data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Contact Details</a>
                </li>
                <li  routerLinkActive="active-link">
                    <a data-mdb-ripple-init="" class="btn btn-tag btn-rounded col " data-mdb-close="true">
                        Nomination Details</a>
                </li>
                <li  routerLinkActive="active-link">
                    <a data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Education Details</a>
                </li>
                <li  routerLinkActive="active-link">
                    <a data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Bank Details</a>
                </li>
            </ul>
        </nav> -->
        <nav>
            <ul>
                <li routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
                    <a routerLink="/employeeData" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Summary
                    </a>
                </li>
                <li routerLinkActive="active-link">
                    <a routerLink="/emp-employement-history" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                       Work History
                    </a>
                </li>
                <li routerLinkActive="active-link">
                    <a routerLink="/emp-documents" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Documentation
                    </a>
                </li>
                <li routerLinkActive="active-link">
                    <a routerLink="/emp-contact-details" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Contacts
                    </a>
                </li>
                <li routerLinkActive="active-link">
                    <a routerLink="/emp-nominee-details" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Nominee
                    </a>
                </li>
                <li routerLinkActive="active-link">
                    <a routerLink="/emp-education-details" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Educations Details
                    </a>
                </li>
                <li routerLinkActive="active-link">
                    <a routerLink="/emp-bank-details" data-mdb-ripple-init="" class="btn btn-tag btn-rounded col" data-mdb-close="true">
                        Bank Details
                    </a>
                </li>
            </ul>
        </nav>
    </div>

  </section>
  <hr>`
})

export class subNav{

}