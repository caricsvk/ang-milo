import {ConnectableObservable, Subscriber, Observable} from "rxjs/Rx";

export class ReplayStore<T> {

	private _observable: ConnectableObservable<T>;
	private _subscriber: Subscriber<T>;

	constructor() {
		this._observable = Observable.create((subscriber: Subscriber<T>) => this._subscriber = subscriber).publishReplay(1);
		this._observable.connect();
	}

	get observable():ConnectableObservable<T> {
		return this._observable;
	}

	get subscriber():Subscriber<T> {
		return this._subscriber;
	}
}