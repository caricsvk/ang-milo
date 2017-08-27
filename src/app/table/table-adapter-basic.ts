import {Observable, Observer, ConnectableObservable} from "rxjs/Rx";
import {TableState} from "./table-state";
import {TableColumn} from "./table-column";
import {TableAdapter} from "./table-adapter";
import {TableAction} from "./table-action";
import {ReplayStore} from "../replay.store";

export abstract class TableAdapterBasic implements TableAdapter {

	private lastFetchedState: string;
	private stateStore: ReplayStore<TableState> = new ReplayStore();

	constructor(state: TableState = new TableState()) {
		this.setState(state);
	}

	private getStateString(state: TableState): string {
		// prevent fetching duplicated state
		let numberToString = (key, value) => typeof value == 'number' ? value + "" : value;
		return JSON.stringify(state, numberToString);
	}

	setState(state: TableState) {
		let newStateString = this.getStateString(state);
		if (this.stateStore && this.lastFetchedState != newStateString) {
			this.lastFetchedState = newStateString;
			this.stateStore.subscriber.next(state);
		}
	}

	onStateChange():Observable<{}> {
		return this.stateStore.observable;
	}

	getActions(): TableAction[] {
		return null;
	}

	abstract fetchData(tableState:TableState):Promise<any>;

	abstract fetchCount(tableState:TableState):Promise<number>;

	abstract getAllColumns():TableColumn[];

}