import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToolBarService } from './tool-bar.service';
import { SearchBar } from "../search-bar/search-bar";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tool-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatProgressBarModule,
    SearchBar,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.css'
})
export class ToolBar {
    isLoading = true;
    constructor(private toolBarService: ToolBarService) {
      this.toolBarService.currentlySearching$.subscribe(isSearching => this.isLoading = isSearching);
    }
}
