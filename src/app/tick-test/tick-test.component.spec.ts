/**
 * The problem in this one is that I am expecting `tick` to advance the
 * time for the timer that was created in the constructor, but it is not working
 */



import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TickTestComponent } from './tick-test.component';

describe('TickTestComponent', () => {
  let component: TickTestComponent;
  let fixture: ComponentFixture<TickTestComponent>;

  let callback: jasmine.Spy;

  beforeEach(async(() => {

    callback = jasmine.createSpy('TICK_CALLBACK');

    TestBed.configureTestingModule({
      providers: [
        { provide: 'TICK_CALLBACK', useValue: callback },
      ],
      declarations: [ TickTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be true after 10s', fakeAsync(() => {
    tick(10_001);

    component.submit();
    expect(callback).toHaveBeenCalled();
  }));
});
