import {Component, OnInit} from '@angular/core';
import {MiloService} from "./milo.service";
import {TableState} from "./table/table-state";
import {Observable, Observer, ConnectableObservable} from "rxjs/Rx";
import {TableColumn} from "./table/table-column";
import {TableAction} from "./table/table-action";
import {TableAdapter} from "./table/table-adapter";

@Component({
	selector: 'milo-root',
	templateUrl: './milo.component.html',
	styleUrls: ['./milo.component.css']
})
export class MiloComponent implements OnInit {

	public title = 'milo';
	public table;

	constructor(private service: MiloService) {
		console.log('AppComponent constructor');
		this.table = new MiloTestTable(service);
	}

	ngOnInit():void {
		console.log('AppComponent OnInit');
		// this.activatedRoute.queryParams.subscribe(params => {
		// 	this.appService.setState(params);
		// });
		this.table.onStateChange().subscribe(state => {
			console.log('state changed', state);
			// this.router.navigate(['.'], {queryParams: state, preserveFragment: true, relativeTo: this.activatedRoute});
		});
	}
}

class MiloTestTable implements TableAdapter {

	private state: TableState = new TableState();
	private stateObserver: Observer<{}>;
	private stateObservable: ConnectableObservable<TableState> = Observable.create(observer => this.stateObserver = observer).publishReplay(1);

	constructor(private service: MiloService) {
		this.stateObservable.connect();
		this.stateObserver.next(this.state);
	}

	setState(state:TableState) {
		this.state = state;
		if (this.stateObserver) {
			this.stateObserver.next(state);
		}
	}

	onStateChange():Observable<TableState> {
		return this.stateObservable;
	}

	fetchData(tableState:TableState):Promise<[any]> {
		let startIndex = (tableState.page - 1) * tableState.pageSize;
		let endIndex = startIndex + tableState.pageSize;
		return Promise.resolve(this.service.getData().sort((first, second) => {
			if (! tableState.order) {
				return -1;
			}
			let multiConst = tableState.getOrderType() == "DESC" ? -1 : 1;
			return first[tableState.order] < second[tableState.order] ? - 1 * multiConst
				: first[tableState.order] > second[tableState.order] ? multiConst : 0;
		}).slice(startIndex, endIndex));
	}

	fetchCount(tableState:TableState):Promise<number> {
		return Promise.resolve(this.service.getData().length);
	}

	getAllColumns():TableColumn[] {
		let columns:TableColumn[] = [];
		columns.push(new TableColumn("ID", "id", "number"));
		columns.push(new TableColumn("Name", "name"));
		columns.push(new TableColumn("Enabled", "enabled", "boolean"));
		columns.push(new TableColumn("From", "start", "datetime"));
		columns.push(new TableColumn("To", "end", "datetime"));
		columns.push(new TableColumn("Tags", "tags.tag", "entity", (row) =>
			row.tags ? row.tags.map(tagEntity => tagEntity.tag).join(',') : ''));
		return columns;
	}

	getActions():TableAction[] {
		return undefined;
	}

}
