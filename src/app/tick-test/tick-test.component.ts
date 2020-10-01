import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { first, filter } from 'rxjs/operators';

@Component({
  selector: 'app-tick-test',
  templateUrl: './tick-test.component.html',
  styleUrls: ['./tick-test.component.scss']
})
export class TickTestComponent implements OnInit {

  public testThis$: Subject<boolean>;

  constructor(
    @Inject('TICK_CALLBACK') private readonly cb: () => void,
  ) {
    this.testThis$ = new BehaviorSubject<boolean>(false);
    timer(10_000).subscribe(() => this.testThis$.next(true));
  }

  public ngOnInit(): void {
  }

  public submit(): void {
    // call the callback after 10s
    this.testThis$
      .pipe(first(), filter(a => !!a))
      .subscribe(() => this.cb());
  }

}
