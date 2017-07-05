import {TableState} from "./table-state";
import {Observable} from "rxjs/Rx";
import {TableColumn} from "./table-column";
import {TableAction} from "./table-action";

export interface TableAdapter {

	fetchData(tableState: TableState): Promise<[{}]>;
	fetchCount(tableState: TableState): Promise<number>;

	getAllColumns(): TableColumn[];
	getActions(): TableAction[];

	setState(state: {});
	onStateChange(): Observable<{}>;

}