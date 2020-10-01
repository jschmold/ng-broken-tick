import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SolutionComponent } from './solution.component';

describe('SolutionComponent', () => {
  let component: SolutionComponent;
  let fixture: ComponentFixture<SolutionComponent>;

  let callback: jasmine.Spy;

  beforeEach(async(() => {
    callback = jasmine.createSpy('CALLBACK');

    TestBed.configureTestingModule({
      providers: [
        { provide: 'TICK_CALLBACK', useValue: callback },
      ],
      declarations: [ SolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should break if we do not detect changes', fakeAsync(() => {
    component.submit();
    expect(callback).not.toHaveBeenCalled();

    tick(10_001);
    component.submit();
    expect(callback).not.toHaveBeenCalled();
  }));

  it('should wait 10s to submit', fakeAsync(() => {
    fixture.detectChanges();
    component.submit();
    expect(callback).not.toHaveBeenCalled();

    tick(10_001);
    component.submit();
    expect(callback).toHaveBeenCalled();
  }));
});
