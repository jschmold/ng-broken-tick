import { Component, OnInit, Inject } from '@angular/core';
import { Subject, BehaviorSubject, timer } from 'rxjs';
import { first, filter } from 'rxjs/operators';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  private canSubmit$: Subject<boolean>;

  constructor(
    @Inject('TICK_CALLBACK')
    private readonly cb: () => void
  ) {
    this.canSubmit$ = new BehaviorSubject<boolean>(false);
  }

  public ngOnInit(): void {
    timer(10_000).subscribe(() => this.canSubmit$.next(true));
  }

  public submit(): void {
    this.canSubmit$
      .pipe(first(), filter(a => !!a))
      .subscribe(() => this.cb());
  }

}
