import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolBarService } from '../../Components/tool-bar/tool-bar.service';


@Component({
  selector: 'app-profile',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  //variables
  searchTerm: string = '';
  filteredItem: any = null;
  webKey: string = 'ce8453b4abbdd6b60e7b2f16481dc42000194f81';
  //constructor
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private toolBarService: ToolBarService) { }
ngOnInit() {
    this.toolBarService.setSearching(true);
    this.route.queryParams.subscribe(params => {
      const searchType = params['type'] || '';
      const searchTerm = params['q'] || '';
      searchTerm ? this.searchTerm = searchTerm : this.searchTerm = 'Nothing';
      // Now use searchTerm to filter or query your data
      this.searchItems(searchType,searchTerm);
    });
  }
searchItems(type: string, term: string) {
  if(!term && !type){
    this.router.navigateByUrl('');
    return;
  }
  if (!term) {
      this.filteredItem = [];
    return;
  }

  switch(type) {
    case 'usdot':
      this.callUSDOTApi(term);
      break;
    case 'docket':
      this.callDocketApi(term);
      break;
    default:
      // If type unknown, clear or handle differently
      this.filteredItem = [];
  }
}
callUSDOTApi(usdot: string) {
  this.http.get<any>(`https://mobile.fmcsa.dot.gov/qc/services/carriers/${encodeURIComponent(usdot)}?webKey=${encodeURIComponent(this.webKey)}`)
    .subscribe(data => {
      this.filteredItem = data.content.carrier;
      this.toolBarService.setSearching(false);
    }, error => {
      console.error('Error fetching by USDOT:', error);
    });
}
callDocketApi(docket: string) {
  this.http.get<any>(`https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/${encodeURIComponent(docket)}?webKey=${encodeURIComponent(this.webKey)}`)
    .subscribe(data => {
      console.log(data);
      this.filteredItem = data.content[0].carrier;
      this.toolBarService.setSearching(false);
    }, error => {
      console.error('Error fetching by USDOT:', error);
    });
}
}
