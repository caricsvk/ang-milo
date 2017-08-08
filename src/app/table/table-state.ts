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

	public setValue(key: string, value: any) {
		if (key == 'page' || key == 'pageSize') {
			value = parseInt(value);
		}
		if (typeof value != 'function') {
			this[key] = value;
		}
	}

	public getValue(key: string): any {
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
}