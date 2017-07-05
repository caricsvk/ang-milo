import {Observable, Observer, ConnectableObservable} from "rxjs/Rx";
import {TableState} from "./table-state";
import {TableColumn} from "./table-column";
import {TableAdapter} from "./table-adapter";
import {TableAction} from "./table-action";

export abstract class TableAdapterBasic implements TableAdapter {

	private state: {} = {};
	private stateObserver: Observer<{}>;
	private stateObservable: ConnectableObservable<{}> = Observable.create(observer => this.stateObserver = observer).publishReplay(1);

	constructor() {
		this.stateObservable.connect();
		this.stateObserver.next(this.state);
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

	getActions(): TableAction[] {
		return null;
	}

	abstract fetchData(tableState:TableState):Promise<any>;

	abstract fetchCount(tableState:TableState):Promise<number>;

	abstract getAllColumns():TableColumn[];

}