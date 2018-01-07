import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {TableState} from "./table-state";
import {TableColumn} from "./table-column";
import {TableAction} from "./table-action";
import {TableAdapter} from "./table-adapter";

@Component({
	selector: 'milo-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

	// mandatory
	@Input() private adapter:TableAdapter;

	// optional
	@Input() public showFilters:boolean = null;
	@Input() public makeEmptyRows:boolean = true;

	private actions:TableAction[] = null;

	state:TableState = new TableState(1, 10);
	columns:TableColumn[] = [];
	rows:any[] = [];
	maxPages:number = 1;
	rowsTotalCount:number = 0;

	constructor() {
	}

	ngOnInit():void {
	}

	ngOnChanges(changes:SimpleChanges):void {
		// console.log('MiloTableComponent ngOnChanges');
		this.columns = this.adapter.getAllColumns();
		this.actions = this.adapter.getActions();
		this.adapter.onStateChange().subscribe(state => this.fetch(state));
	}

	private fetch(newState: TableState):void {
		console.log('MiloTableComponent fetching', newState);
		this.state = newState;
		if (!this.state.order) {
			this.state.setOrder(this.columns[0]);
		}
		this.fetchCount(this.state);
		this.adapter.fetchData(this.state).then(data => {
			this.rows = data;
			for (let i = this.rows.length; this.makeEmptyRows && i < this.state.pageSize; i++) {
				this.rows.push(null);
			}
		});

		// set showFilters if there is some value in filters
		for (let i = 0; this.showFilters === null && i < this.columns.length; i++) {
			if (this.state.containsKeyPrefix(this.columns[i].key)) {
				this.showFilters = true;
			}
		}
	}

	private fetchCount(state:TableState):void {
		this.adapter.fetchCount(state).then(count => {
			this.rowsTotalCount = count;
			this.maxPages = parseInt("" + ((state.pageSize + count) / state.pageSize));
		});
	}

	public filter():void {
		// console.log('filter', this.stateForCount);
		this.state.page = 1;
		this.adapter.setState(this.state);
	}

	public changeFilter(column:TableColumn, value:any):void {
		// console.log('changeFilter', value, column);
		this.state.setValue(column, value);
		this.fetchCount(this.state);
	}

	public changeSort(column:TableColumn):void {
		this.state.setOrder(column);
		this.adapter.setState(this.state);
	}

	public changePage(page:number):void {
		let newPage = this.state.page + page;
		if (newPage >= 1 && newPage <= this.maxPages) {
			this.state.page = newPage;
			this.adapter.setState(this.state);
		}
	}

	public changePageSize(size:number):void {
		if (size != this.state.pageSize) {
			this.state.page = 1;
			this.state.pageSize = size;
			this.adapter.setState(this.state);
		}
	}

}
