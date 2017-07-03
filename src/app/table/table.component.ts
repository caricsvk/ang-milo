import {Component, Input, OnInit} from "@angular/core";
import {TableState} from "./table-state";
import {TableColumn} from "./table-column";
import {TableAction} from "./table-action";
import {TableService} from "./table-data-source";

@Component({
	selector: 'milo-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	// mandatory
	@Input() private service:TableService;

	// optional
	@Input() private allowedColumns:string[] = null;
	@Input() public actions:TableAction[] = [];
	@Input() public showFilters:boolean = null;
	@Input() public makeEmptyRows:boolean = true;

	private state:TableState = new TableState(1, 10);
	private stateForCount:TableState = new TableState(1, 10);
	private columns:TableColumn[] = [];
	private rows:any[] = [];
	private maxPages:number = 1;
	private rowsTotalCount:number = 0;

	constructor() {
		console.log('MiloTableComponent constructor', this.service);
	}

	ngOnInit():void {
		console.log('MiloTableComponent onInit', this.service);
		this.columns = this.service.getAllColumns().filter(
			column => !this.allowedColumns || this.allowedColumns.indexOf(column.key) >= 0);
		this.service.onStateChange().subscribe(state => this.init(state));
	}

	private init(params: {}):void {
		// console.log('MiloTableComponent init', params);
		this.state.clear();
		this.stateForCount.clear();
		for (let key in params) {
			this.state.setValue(key, params[key]);
			this.stateForCount.setValue(key, params[key]);
		}
		if (!this.state.order) {
			this.state.setOrder(this.columns[0]);
		}
		this.fetchCount(this.state);
		this.service.fetchData(this.state).then(data => {
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
		this.service.fetchCount(state).then(count => {
			this.rowsTotalCount = count;
			this.maxPages = parseInt("" + ((state.pageSize + count) / state.pageSize));
		});
	}

	public filter():void {
		// console.log('filter', this.stateForCount);
		this.stateForCount.page = 1;
		this.service.setState(this.stateForCount);
	}

	public changeFilter(column:TableColumn, value:any):void {
		// console.log('changeFilter', value, column);
		let query = column.getQuery(value);
		this.stateForCount[query.key] = query.value;
		this.fetchCount(this.stateForCount);
	}

	public changeSort(column:TableColumn):void {
		this.state.setOrder(column);
		this.service.setState(this.state);
	}

	public changePage(page:number):void {
		let newPage = this.state.page + page;
		if (newPage >= 1 && newPage <= this.maxPages) {
			this.state.page = newPage;
			this.service.setState(this.state);
		}
	}

	public changePageSize(size:number):void {
		if (size != this.state.pageSize) {
			this.state.page = 1;
			this.state.pageSize = size;
			this.service.setState(this.state);
		}
	}

}
