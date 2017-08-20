import {OnDestroy} from "@angular/core/core";
import {Subject} from "rxjs/Rx";

export class SubscribingComponent implements OnDestroy {

	onDestroy: Subject<void> = new Subject<void>();

	ngOnDestroy():void {
		this.onDestroy.next();
		this.onDestroy.complete();
	}

}