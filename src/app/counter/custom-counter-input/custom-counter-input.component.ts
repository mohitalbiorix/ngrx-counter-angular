import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selector';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  num!: number
  channelName!: string
  channelName$! : Observable<string>;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName)
    this.store.select(getChannelName).subscribe(
      channelName => {
        console.log('change channel name observable');
        this.channelName = channelName
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
