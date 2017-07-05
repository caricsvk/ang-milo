import {Injectable} from '@angular/core';
import {TableState, OrderType} from "./table/table-state";
import {Observable, Observer} from "rxjs/Rx";
import {TableColumn} from "./table/table-column";
import {TableAdapter} from "./table/table-adapter";
import {TableAction} from "./table/table-action";

@Injectable()
export class MiloService implements TableAdapter {

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

	fetchData(tableState:TableState):Promise<[any]> {
		let startIndex = (tableState.page - 1) * tableState.pageSize;
		let endIndex = startIndex + tableState.pageSize;
		return Promise.resolve(this.data.sort((first, second) => {
			if (! tableState.order) {
				return -1;
			}
			let multiConst = tableState.getOrderType() == OrderType.DESC ? -1 : 1;
			return first[tableState.order] < second[tableState.order] ? - 1 * multiConst
				: first[tableState.order] > second[tableState.order] ? multiConst : 0;
		}).slice(startIndex, endIndex));
	}

	fetchCount(tableState:TableState):Promise<number> {
		return Promise.resolve(this.data.length);
	}

	getAllColumns():TableColumn[] {
		let columns:TableColumn[] = [];
		columns.push(new TableColumn("ID", "id", "number"));
		columns.push(new TableColumn("Name", "name"));
		columns.push(new TableColumn("From", "start", "datetime"));
		columns.push(new TableColumn("To", "end", "datetime"));
		columns.push(new TableColumn("Tags", "tags.tag", "entity", (row) =>
			row.tags ? row.tags.map(tagEntity => tagEntity.tag).join(',') : ''));
		return columns;
	}

	getActions():TableAction[] {
		return undefined;
	}

	data = [
		{
			"id": 2,
			"name": "Home",
			"tags": [
				{
					"id": 101,
					"tag": "domov"
				}
			]
		},
		{
			"id": 1,
			"name": "World",
			"tags": [
				{
					"id": 23,
					"tag": "world"
				}
			]
		},
		{
			"id": 3,
			"name": "Life & Culture",
			"tags": [
				{
					"id": 67,
					"tag": "art"
				}
			]
		},
		{
			"id": 4,
			"name": "Tech & Science",
			"tags": [
				{
					"id": 56,
					"tag": "veda"
				},
				{
					"id": 57,
					"tag": "vat"
				}
			]
		},
		{
			"id": 24,
			"name": "Relations & Sex",
			"tags": [
				{
					"id": 20,
					"tag": "laska"
				},
				{
					"id": 60,
					"tag": "vztah"
				},
				{
					"id": 61,
					"tag": "sex"
				}
			]
		},
		{
			"id": 22,
			"name": "Travel",
			"tags": [
				{
					"id": 229,
					"tag": "dovolenk"
				}
			]
		},
		{
			"id": 39,
			"name": "Entertainment",
			"tags": [
				{
					"id": 245,
					"tag": "chillin"
				},
				{
					"id": 231,
					"tag": "inspir"
				}
			]
		},
		{
			"id": 26,
			"name": "Hockey"
		},
		{
			"id": 41,
			"name": "Health",
			"tags": [
			]
		},
		{
			"id": 20,
			"name": "TV & Movies"
		},
		{
			"id": 36,
			"name": "Apps & Games",
			"tags": [
				{}
			]
		},
		{
			"id": 23,
			"name": "Style & Beauty",
			"tags": [
				{
					"id": 74,
					"tag": "style"
				},
				{
					"id": 75,
					"tag": "beauty"
				},
				{
					"id": 62,
					"tag": "moda"
				},
				{
					"id": 63,
					"tag": "styl"
				}
			]
		},
		{
			"id": 37,
			"name": "Internet",
			"tags": []
		},
		{
			"name": "People"
		},
		{
			"id": 16,
			"name": null
		},
		{
			"id": 10,
			"name": "Asia",
			"tags": [
				{
					"id": 134,
					"tag": "azia"
				}
			]
		},
		{
			"id": 33
		},
		{
			"id": 34,
			"name": "Work"
		},
		{
			"id": 42,
			"name": "Space & Physics"
		},
		{
			"id": 31,
			"name": "Personal Finance"
		},
		{
			"id": 30,
			"name": "Race",
			"tags": [
				{
					"id": 39,
					"tag": "nascar"
				},
				{
					"id": 94,
					"tag": "motosport"
				}
			]
		},
		{
			"id": 11,
			"name": "Africa & Middle East"
		},
		{
			"id": 5,
			"name": "Finance & Economics",
			"tags": [
				{
					"id": 43,
					"tag": "money"
				},
				{
					"id": 52,
					"tag": "peniaze"
				}
			]
		},
		{
			"id": 32,
			"name": "Economy"
		}
	];

}
