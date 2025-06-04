import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
searchQuery: string = '';

  constructor(private router: Router) {}

goToSearch() {
  const query = this.searchQuery.trim();
  if (!query) return;

  let type = 'name'; // default


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
