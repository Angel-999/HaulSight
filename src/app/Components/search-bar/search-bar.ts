import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToolBarService } from '../../Components/tool-bar/tool-bar.service';

@Component({
  selector: 'app-search-bar',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
searchQuery: string = '';

  constructor(private router: Router, private toolBarService: ToolBarService) { }
 ngOnInit(): void {
   this.toolBarService.setSearching(false);
 }
  goToSearch() {
    let query = this.searchQuery.trim();
    let type = 'name'; // default
    // Detect and handle "MC" or "MX" with digits
    const mcMxMatch = query.match(/^(MC|MX)[\s-]*(\d{6,})$/i);
    if (mcMxMatch) {
      // Extract only the last 6 digits
      const digits = mcMxMatch[2].slice(-6);
      query = digits;
      type = 'docket';
    } else {
      // Remove "MC" prefix generally if present (and not matched above)
      query = query.replace(/^MC\s*/i, '');

      if (/^\d{1,6}$/.test(query)) {
        type = 'docket';
      } else if (/^\d{6,8}$/.test(query)) {
        type = 'usdot';
      }
    }

    if (!query) return;




    // Detect Docket: usually all digits, length between 1-6 (example)
    if (/^\d{1,6}$/.test(query)) {
      type = 'docket';
    }
    // Detect USDOT: usually all digits, length between 6-8 (example)
    else if (/^\d{6,8}$/.test(query)) {
      type = 'usdot';
    }
    this.router.navigate(['/search'], { queryParams: { type, q: query } });
  }
}
