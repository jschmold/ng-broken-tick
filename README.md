## Issues:

  - tickTest: calling `tick` does not advance timer that was started in the constructor
  - zoneTest: attempting to resolve problem in tickTest by `fakeAsync`ing the beforeEach component init causes a "periodic tasks still in queue"

## Expectation:

  - A simple way to be able to initialize the timers during component construction and "tick" works for them


## How to run

```
npm install
ng t
```
