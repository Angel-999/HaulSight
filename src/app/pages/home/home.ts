import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToolBarService } from '../../Components/tool-bar/tool-bar.service';
import { SearchBar } from "../../Components/search-bar/search-bar";
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-home',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule, SearchBar,NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


}
