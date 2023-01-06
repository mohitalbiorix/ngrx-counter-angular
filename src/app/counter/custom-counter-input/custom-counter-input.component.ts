import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  num!: number
  channelName!: string
  constructor(
    private store: Store<{ counter: CounterState }>
  ) { }

  ngOnInit(): void {
    this.store.select('counter').subscribe(
      data => {
        console.log('change channel name observable');
        this.channelName = data.channelName;
      }
    )
  }

  addNumber() {
    this.store.dispatch(customIncrement({ count: +this.num }))
  }

  changeChannelName() {
    this.store.dispatch(changeChannelName())
  }

}
