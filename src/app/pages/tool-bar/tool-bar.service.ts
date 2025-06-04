import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolBarService {
  private toolBarSubject = new BehaviorSubject<boolean>(false);
  currentlySearching$ = this.toolBarSubject.asObservable();

  setSearching(isSearching: boolean) {
    this.toolBarSubject.next(isSearching);
  }
}
