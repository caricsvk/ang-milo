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
		public page: number,
		public pageSize: number,
		public order?: string,
		private orderType: string = "DESC"
	) {
	}

	public reset(params: {}): void {
		for (let key in this) {
			if (typeof this[key] != 'function' && key != 'page' && key != 'pageSize' && key != 'order'
				&& key != 'orderType') {
				delete this[key];
			}
		}
		for (let key in params) {
			this.setValue(key, params[key]);
		}
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

	private isValueSet(value: any): boolean {
		return value != null && value !== undefined && value !== '';
	}
}