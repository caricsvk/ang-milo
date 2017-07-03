import {TableState} from "./table-state";
import {Observable} from "rxjs/Rx";
import {TableColumn} from "./table-column";

export interface TableService {

	fetchData(tableState: TableState): Promise<[{}]>;
	fetchCount(tableState: TableState): Promise<number>;
	getAllColumns(): TableColumn[];
	setState(state: {});
	onStateChange(): Observable<{}>;

}