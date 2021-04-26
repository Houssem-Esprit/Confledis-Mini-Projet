import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import * as ProductActions from '../app/product/state/product.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Confledis-miniProjet-web';
  @Input() searchText: string;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }


  OnInput(event: any) {
    console.log('Typed text: ', event.target.value);
    this.store.dispatch(ProductActions.setSearchedText({ searchText: event.target.value }));
  }


  onToggle(): void {
    localStorage.theme = localStorage.theme == 'dark' ? 'light' : 'dark';
    console.log('working : ', localStorage.theme);

    if (localStorage.theme === 'dark') {
      console.log('in dark case')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  onFocus(): void {
    this.store.dispatch(ProductActions.SearchInit());
  }

  onFocusOut(): void {
    this.store.dispatch(ProductActions.SearchDone());

  }
}
