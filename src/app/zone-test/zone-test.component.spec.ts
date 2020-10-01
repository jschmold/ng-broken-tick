/**
 * The issue with this file is that this always has periodic timers left in queue.
 *
 * I suspect this is a result of the fakeAsync being in the beforeEach, and then the "zone"
 * being destroy by falling out of scope with a timer still running
 */



import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ZoneTestComponent } from './zone-test.component';

describe('ZoneTestComponent', () => {
  let component: ZoneTestComponent;
  let fixture: ComponentFixture<ZoneTestComponent>;

  let callback: jasmine.Spy;

  beforeEach(async(() => {

    callback = jasmine.createSpy('FAKEASYNC_CALLBACK');
    TestBed.configureTestingModule({
      providers: [
        { provide: 'ZONE_CALLBACK', useValue: callback },
      ],
      declarations: [ ZoneTestComponent ],
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ZoneTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(fakeAsync(() => tick(Infinity)));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to submit after 10s', fakeAsync(() => {
    component.submit();
    expect(callback).not.toHaveBeenCalled();
    tick(10_001);
    component.submit();
    expect(callback).toHaveBeenCalled();
  }));
});
