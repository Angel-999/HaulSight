import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- Add this
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolBarService } from '../../Components/tool-bar/tool-bar.service';


@Component({
  selector: 'app-search',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  searchTerm: string = '';
  items: any[] = [];
  filteredItem: any = null;
  webKey: string = 'ce8453b4abbdd6b60e7b2f16481dc42000194f81';
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
      this.filteredItem = null;
    return;
  }

  switch(type) {
    case 'name':
      this.callNameApi(term);
      break;
    case 'usdot':
      this.callUSDOTApi(term);
      break;
    case 'docket':
      this.callDocketApi(term);
      break;
    default:
      // If type unknown, clear or handle differently
      this.filteredItem = null;
  }
}

callNameApi(name: string) {
  this.http.get<any>(`https://mobile.fmcsa.dot.gov/qc/services/carriers/name/${encodeURIComponent(name)}?webKey=${encodeURIComponent(this.webKey)}`)
    .subscribe(data => {
      const results = data.content?.filter((item: any) => item.carrier.allowedToOperate === 'Y') || [];
      this.filteredItem = results.map((item: any) => item.carrier);
      this.filteredItem = this.filteredItem[0];
      this.toolBarService.setSearching(false);
    }, error => {
      console.error('Error fetching by name:', error);
    });
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
