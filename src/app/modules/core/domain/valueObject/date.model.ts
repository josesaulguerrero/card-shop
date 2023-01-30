export class ISODate {
	public ISOString: string;

	public constructor(string: string) {
		this.ISOString = string;
	}

	public static toDate(string: string): Date {
		return new Date(string);
	}

	public static now(): ISODate {
		return new ISODate(new Date().toISOString());
	}

	public static compareDates(dateOne: ISODate, dateTwo: ISODate): boolean {
		return (
			this.toDate(dateOne.ISOString).getDate() ===
			this.toDate(dateTwo.ISOString).getDate()
		);
	}
}
