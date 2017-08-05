export class TableColumn {

	constructor(
		public name: string,
		public key: string,
		public type?: string,
		private viewFn?: (arg: any) => string
	    // public filterView?: string
	) {
	}

	public view(row: {}): string {
		return this.viewFn ? this.viewFn(row) : row[this.key];
	}

	public getQueryKey(): string {
		return this.getQuery(null).key;
	}

	public getQuery(filterValue: any): {key: string, value: any} {
		switch (this.type) {
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
						filterValue = filterValue[key] && this.type != 'number' ? filterValue[key].getTime() : filterValue[key];
					}
				} else {
					filterType = '_minmax';
				}
				break;
			case 'boolean':
			case 'exact':
				var filterType = '_exact';
				var filterType = '_exact';
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
			key: this.key + filterType,
			value: filterValue
		};
	}

}

export enum TableColumnType {
	TEXT, BOOLEAN, NUMBER, DATE, TIME, DATETIME
}