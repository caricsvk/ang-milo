import {OnDestroy} from "@angular/core/core";
import {Subject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

export class SubscribingComponent implements OnDestroy {

	onDestroySubject: Subject<any> = new Subject<any>();
	onDestroy: Observable<any> = Observable.from(this.onDestroySubject);

	ngOnDestroy():void {
		this.onDestroySubject.next();
		this.onDestroySubject.complete();
	}

}
