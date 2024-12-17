import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// const p = new Observable<number>((observer) => {
//   observer.next(100);
// })

// p.subscribe(x => console.log(x))

// const subject$$ = new Subject();

// subject$$.subscribe((data) => console.log('A', data));

// subject$$.next(100);

// subject$$.subscribe((data) => console.log('B', data));

// subject$$.next(200);


// const behaviorSubject = new BehaviorSubject(100);

// behaviorSubject.subscribe((data) => console.log('Some', data))

// behaviorSubject.next(200);

// behaviorSubject.subscribe((data) => console.log('Other', data))

const replaySubject = new ReplaySubject(5);
replaySubject.next(1000);

replaySubject.subscribe((data) => console.log('Sub 1', data));

replaySubject.next(100);

for (let i = 1; i <= 10; i++) {
  replaySubject.next(i)
  
}

replaySubject.subscribe((data) => console.log('Sub 2', data));


