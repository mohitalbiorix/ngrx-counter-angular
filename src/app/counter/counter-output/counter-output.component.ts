import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {

  counter!: number;
  counter$!: Observable<any>;

  constructor(
    private store: Store<{ counter: CounterState }>
  ) { }

  ngOnInit(): void {
    this.counter$ = this.store.select('counter');
    this.store.select('counter').subscribe(
      data => {
        console.log('counter observable');
        this.counter = data.counter;
      }
    )
  }

}
