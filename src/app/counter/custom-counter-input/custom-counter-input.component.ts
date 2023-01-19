import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
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
    private store: Store<AppState>,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    // get channelName using selector
    this.channelName$ = this.store.select(getChannelName)
    this.store.select(getChannelName).subscribe(
      channelName => {
        console.log('change channel name observable');
        this.channelName = channelName
      }
    )
  }

  // add number action
  addNumber() {
    if(!this.num){
      this.toasterService.warning("Please enter a number!")
    }
    else{
      this.store.dispatch(customIncrement({ count: +this.num }))
    }
  }

  // change channel action
  changeChannelName() {
    this.store.dispatch(changeChannelName())
  }

}
