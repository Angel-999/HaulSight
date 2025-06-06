import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchBar } from "../../Components/search-bar/search-bar";
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-home',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule, SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


}
