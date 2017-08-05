export class TableAction {

	constructor(
		public name: string,
		public trigger: (arg: any) => void,
	    private showed?: (arg: any) => boolean
	) {
	}

	public show(row: any): boolean {
		return typeof this.showed === 'function' && row ? this.showed(row) : true;
	}

}