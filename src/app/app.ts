import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBar } from "./Components/tool-bar/tool-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'HaulSight';
}
