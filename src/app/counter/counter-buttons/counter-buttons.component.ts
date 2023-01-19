import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from 'src/app/store/app.state';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  // increment counter action
  onIncrementBtn() {
    this.store.dispatch(increment());
  }

  // decrement counter action
  onDecrementBtn() {
    this.store.dispatch(decrement());
  }

  // reset counter action
  onResetBtn() {
    this.store.dispatch(reset());
  }

}
