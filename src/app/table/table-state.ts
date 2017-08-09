import {URLSearchParams} from "@angular/http";
import {TableColumn} from "./table-column";

export class TableState {

	/**
	 *
	 * @param page
	 * @param pageSize
	 * @param orderType
	 * @param order
	 */
	constructor(
		public page: number = 1,
		public pageSize: number = 10,
		public order?: string,
		private orderType: string = "DESC"
	) {
	}

	public static create(params: {}): TableState {
		let result = new TableState();
		for (let key in params) {
			result.setValue(key, params[key]);
		}
		return result;
	}

	public setValue(columnOrString: TableColumn | string, value: any) {
		if (typeof columnOrString === 'string') {
			var key: string = columnOrString;
		} else {
			let column: TableColumn = columnOrString;
			let query = this.makeQuery(column, value);
			var key: string = query.key;
			value = query.value;
			// reset both _exact and _empty options for boolean
			if (column.type == 'boolean') {
				delete this[column.key + '_exact'];
				delete this[column.key + '_empty'];
			}
		}
		if (key == 'page' || key == 'pageSize') {
			value = parseInt(value);
		}
		if (typeof value != 'function') {
			this[key] = value;
		}
	}

	public getValue(columnOrString: TableColumn | string): any {
		if (typeof columnOrString === 'string') {
			var key: string = columnOrString;
		} else {
			var key = this.makeQuery(columnOrString).key;
			// use 'null' value instead of true for empty boolean
			if (columnOrString.type === 'boolean' && key.endsWith('_empty') && this[key]) {
				return null;
			}
		}
		let minMaxIndex = key.indexOf("_minmax");
		if (minMaxIndex >= 0) {
			let keyWithoutSuffix: string = key.substr(0, minMaxIndex);
			return {min: this[keyWithoutSuffix + "_min"], max: this[keyWithoutSuffix + "_max"]};
		}
		return this[key];
	}

	public setOrder(column: TableColumn): void {
		this.orderType = this.order != column.key ? "DESC": this.getOppositeOrderType();
		this.order = column.key;
	}

	public getOrderType(): string {
		return this.orderType;
	}

	private getOppositeOrderType(): string {
		return this.orderType === "ASC" ? "DESC": "ASC";
	}

	public getUrlSearchParams(): URLSearchParams {
		let params = new URLSearchParams();
		for (let key in this) {
			if (this.hasOwnProperty(key) && this.isValueSet(this[key]) && key != 'page' && key != 'pageSize') {
				params.set(key, "" + this[key])
			}
		}
		let limit: number = this.pageSize ? this.pageSize : 10;
		let page: number = this.page ? this.page : 1;
		params.set('limit', "" + limit);
		params.set('offset', "" + (limit * (page - 1)));
		return params;
	}

	public containsKeyPrefix(searchedPrefix: string): boolean {
		for (let key in this) {
			if (this.hasOwnProperty(key) && this.isValueSet(this[key]) && key.startsWith(searchedPrefix)) {
				return true;
			}
		}
		return false;
	}

	private isValueSet(value: any): boolean {
		return value != null && value !== undefined && value !== '';
	}

	// export enum TableColumnType { TEXT, BOOLEAN, NUMBER, DATE, TIME, DATETIME }

	public makeQuery(column: TableColumn, filterValue?: any): {key: string, value: any} {
		switch (column.type) {
			case 'entity':
				var filterType = '_wild';
				// var urlKey = this.name + "." + this.filterKey + (this.entityData ? "_exact" : "_wild");
				// if (typeof this.state == 'object' && this.state != null) { // with entity data
				// 	var state = [];
				// 	for (var i = 0; i < this.state.length; i++) {
				// 		state.push(this.state[i][this.filterKey]);
				// 	}
				// 	urlKey, state;
				// } else { // with not entity data
				// 	urlKey, this.state;
				// }
				break;
			case 'date':
			case 'time':
			case 'datetime':
			case 'number': // allow to put _min / _max filterType through filterValue
				if (filterValue) {
					for (let key in filterValue) {
						var filterType = '_' + key;
						filterValue = filterValue[key] && column.type != 'number' ? filterValue[key].getTime() : filterValue[key];
					}
				} else {
					filterType = '_minmax';
				}
				break;
			case 'exact':
				var filterType = '_exact';
				break;
			case 'boolean':
				filterType = '_exact';
				let checkValueForEmptiness = filterValue == undefined && typeof this[column.key + filterType] == 'undefined';
				if (filterValue === null || checkValueForEmptiness) {
					filterType = '_empty';
					filterValue = true;
				}
				break;
			case 'min':
				var filterType = '_min';
				break;
			case 'max':
				var filterType = '_max';
				break;
			default:
				var filterType = '_wild';
				break;
		}
		return {
			key: column.key + filterType,
			value: filterValue
		};
	}
}