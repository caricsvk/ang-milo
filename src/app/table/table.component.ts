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

	private state:TableState = new TableState(1, 10);
	private stateForCount:TableState = new TableState(1, 10);
	private actions:TableAction[] = null;
	private columns:TableColumn[] = [];
	private rows:any[] = [];
	private maxPages:number = 1;
	private rowsTotalCount:number = 0;

	constructor() {
	}

	ngOnInit():void {
	}

	ngOnChanges(changes:SimpleChanges):void {
		// console.log('MiloTableComponent ngOnChanges');
		this.columns = this.adapter.getAllColumns();
		this.actions = this.adapter.getActions();
		this.adapter.onStateChange().subscribe(state => this.init(state));
	}

	private init(params: {}):void {
		console.log('MiloTableComponent init', params);
		this.state.reset(params);
		this.stateForCount.reset(params);
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
		for (let i = 1; this.showFilters == null && i < this.columns.length; i++) {
			if (this.state[this.columns[i].getQueryKey()]) {
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
		this.stateForCount.page = 1;
		this.adapter.setState(this.stateForCount);
	}

	public changeFilter(column:TableColumn, value:any):void {
		// console.log('changeFilter', value, column);
		let query = column.getQuery(value);
		this.stateForCount[query.key] = query.value;
		this.fetchCount(this.stateForCount);
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
