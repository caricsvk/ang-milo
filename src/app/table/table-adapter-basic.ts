import {Observable, Observer, ConnectableObservable} from "rxjs/Rx";
import {TableState} from "./table-state";
import {TableColumn} from "./table-column";
import {TableAdapter} from "./table-adapter";
import {TableAction} from "./table-action";

export abstract class TableAdapterBasic implements TableAdapter {

	private state: TableState;
	private lastFetchedState: string;
	private stateObserver: Observer<TableState>;
	private stateObservable: ConnectableObservable<TableState> = Observable.create(observer => this.stateObserver = observer).publish();

	constructor(state: TableState = new TableState()) {
		this.stateObservable.connect();
		this.setState(state);
	}

	private getStateString(state: TableState): string {
		// prevent fetching duplicated state
		let numberToString = (key, value) => typeof value == 'number' ? value + "" : value;
		return JSON.stringify(state, numberToString);
	}

	setState(state: TableState) {
		let newStateString = this.getStateString(state);
		if (this.stateObserver && this.lastFetchedState != newStateString) {
			this.lastFetchedState = newStateString;
			this.state = state;
			this.stateObserver.next(state);
		}
	}

	getState(): TableState {
		return this.state;
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