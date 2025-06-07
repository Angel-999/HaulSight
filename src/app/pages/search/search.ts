import { Component, AfterViewInit, ViewChild, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolBarService } from '../../Components/tool-bar/tool-bar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { Result } from "../../Components/result/result";

@Component({
  selector: 'app-search',
  imports: [HttpClientModule, CommonModule, MatCardModule, MatButtonModule, MatChipsModule, RouterModule, Result],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search implements OnInit, AfterViewInit {
  placeholderCount = 0;

  @ViewChild('placeholderCard') placeholderCard!: ElementRef;

  // Fixed height for card placeholder
  readonly cardHeight = 124;

  padding = 0;

  stillSearching: boolean = true;
  searchTerm: string = '';
  filteredItems: any[] = [];
  webKey: string = 'ce8453b4abbdd6b60e7b2f16481dc42000194f81';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toolBarService: ToolBarService
  ) { }

  ngOnInit() {
    this.stillSearching= true;
    this.calculatePlaceholders();
    this.toolBarService.setSearching(true);
    this.route.queryParams.subscribe(params => {
      const searchType = params['type'] || '';
      const searchTerm = params['q'] || '';
      this.searchTerm = searchTerm || 'Nothing';
      this.searchItems(searchType, searchTerm);
    });
  }

  ngAfterViewInit(): void {
    // Measure and calculate placeholders on view init
    setTimeout(() => {
      this.calculatePlaceholders();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.calculatePlaceholders();
  }

  private calculatePlaceholders(): void {
    const gridHeight = window.innerHeight - this.padding - 86; // Subtract toolbar height that is 86px
    const rows = Math.floor(gridHeight / this.cardHeight);
    this.placeholderCount = rows; // Since cards cover full width, only count rows
  }

  searchItems(type: string, term: string) {
    if (!term && !type) {
      this.router.navigateByUrl('');
      return;
    }
    if (!term) {
      this.filteredItems = [];
      return;
    }

    switch (type) {
      case 'name':
        this.callNameApi(term);
        break;
      default:
        this.filteredItems = [];
    }
  }

  callNameApi(name: string) {
    this.filteredItems = [];
    this.stillSearching= true;
    this.http.get<any>(`https://mobile.fmcsa.dot.gov/qc/services/carriers/name/${encodeURIComponent(name)}?webKey=${encodeURIComponent(this.webKey)}`)
      .subscribe(data => {
        console.log(data);
        const results = data.content?.filter((item: any) => item.carrier.allowedToOperate === 'Y') || [];
        this.filteredItems = results.map((item: any) => item.carrier);
        this.toolBarService.setSearching(false);
            this.stillSearching= false;
      }, error => {
        console.error('Error fetching by name:', error);
      });
  }
}
