export class TableColumn {

	constructor(
		public name: string,
		public key: string,
		public type?: string,
		private viewFn?: (arg: any) => string,
	    public values?: any[]
	) {
	}

	public view(row: {}): string {
		return this.viewFn ? this.viewFn(row) : row[this.key];
	}

}