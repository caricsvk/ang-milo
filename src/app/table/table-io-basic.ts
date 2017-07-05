import {Observable, Observer} from "rxjs/Rx";
import {TableIo} from "./table-io";
import {TableState} from "./table-state";
import {TableColumn} from "./table-column";

export abstract class TableIoBasic implements TableIo {

	private state: {} = {};
	private stateObserver: Observer<{}>;
	private stateObservable: Observable<{}> = Observable.create(observer => {
		observer.next(this.state);
		this.stateObserver = observer;
	});

	constructor() {
	}

	setState(state:{}) {
		this.state = state;
		if (this.stateObserver) {
			this.stateObserver.next(state);
		}
	}

	onStateChange():Observable<{}> {
		return this.stateObservable;
	}

	abstract fetchData(tableState:TableState):Promise<any>;

	abstract fetchCount(tableState:TableState):Promise<number>;

	abstract getAllColumns():TableColumn[];

}