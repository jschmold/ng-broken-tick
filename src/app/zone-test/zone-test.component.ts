import { Component, OnInit, Inject } from '@angular/core';
import { timer, BehaviorSubject, Subject } from 'rxjs';
import { first, filter } from 'rxjs/operators';

@Component({
  selector: 'app-zone-test',
  templateUrl: './zone-test.component.html',
  styleUrls: ['./zone-test.component.scss']
})
export class ZoneTestComponent implements OnInit {

  public enabled$: Subject<boolean>;

  constructor(
    @Inject('ZONE_CALLBACK') private readonly cb: () => void
  ) {
    this.enabled$ = new BehaviorSubject<boolean>(false);
    // timer(10_000).subscribe(() => this.enabled$.next(true));
  }

  public ngOnInit(): void {
    // moving this to the constructor has no effect
    timer(10_000).subscribe(() => this.enabled$.next(true));
  }

  public submit(): void {
    this.enabled$
      .pipe(first(), filter(a => !!a))
      .subscribe(() => this.cb());
  }
}
