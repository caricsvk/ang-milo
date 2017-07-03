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
		private orderType: OrderType = OrderType.DESC
	) {
	}

	public clear(): void {
		for (let key in this) {
			if (key != 'page' && key != 'pageSize' && key != 'order' && key != 'orderType') {
				delete this[key];
			}
		}
	}

	public setValue(key: string, value: any) {
		if (key == 'page' || key == 'pageSize') {
			value = parseInt(value);
		}
		this[key] = value;
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
		this.orderType = this.order != column.key ? OrderType.DESC : this.getOppositeOrderType();
		this.order = column.key;
	}

	public getOrderType(): OrderType {
		return this.orderType;
	}

	private getOppositeOrderType(): OrderType {
		return this.orderType === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
	}

	public getUrlSearchParams(): URLSearchParams {
		let params = new URLSearchParams();
		for (let key in this) {
			if (this.hasOwnProperty(key) && this[key] && key != 'page' && key != 'pageSize') {
				params.set(key, "" + this[key])
			}
		}
		let limit: number = this.pageSize ? this.pageSize : 10;
		let page: number = this.page ? this.page : 1;
		params.set('limit', "" + limit);
		params.set('offset', "" + (limit * (page - 1)));
		return params;
	}
}

export enum OrderType {
	ASC, DESC
}