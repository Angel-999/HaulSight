import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-tool-bar',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './tool-bar.html',
  styleUrl: './tool-bar.css'
})
export class ToolBar {
}
