export class TableAction {

	constructor(
		public name: string,
		public trigger: (arg: any) => void,
	    private showed?: (arg: {}) => boolean
	) {
	}

	public show(row: {}): boolean {
		return this.showed ? this.showed(row) : true;
	}

}