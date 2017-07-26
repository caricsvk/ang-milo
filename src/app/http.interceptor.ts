import {Injectable} from "@angular/core";
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response} from "@angular/http";
import {Observable, Subscriber} from "rxjs/Rx";

@Injectable()
export class InterceptedHttp extends Http {

	private static pendingRequests = 0;
	private static pendingRequestsSubscriber: Subscriber<number> = Subscriber.create();
	private static pendingRequestsObservable: Observable<number> = Observable.create(subscriber =>
		InterceptedHttp.pendingRequestsSubscriber = subscriber);

	constructor(backend: ConnectionBackend,
	            defaultOptions: RequestOptions) {
		super(backend, defaultOptions);
	}

	static getPendingRequests(): Observable<number> {
		return InterceptedHttp.pendingRequestsObservable;
	}

	request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
		InterceptedHttp.pendingRequestsSubscriber.next(++ InterceptedHttp.pendingRequests);
		return super.request(url, options).do(
			(res: Response) => InterceptedHttp.pendingRequestsSubscriber.next(-- InterceptedHttp.pendingRequests),
			(error: any) => InterceptedHttp.pendingRequestsSubscriber.next(-- InterceptedHttp.pendingRequests)
		);
	}

	// get(url: string, options?: RequestOptionsArgs): Observable<Response> {
	// 	console.log('get request');
	// 	return super.get(url, options).do(
	// 		(res: Response) => {console.log('get response ok')},
	// 		(error: any) => {console.log('get response failure')}
	// 	);
	// }
	//
	// post(url:string, body:any, options?:RequestOptionsArgs):Observable<Response> {
	// 	return super.post(url, body, options).do(
	// 		(res: Response) => {},
	// 		(error: any) => {}
	// 	);
	// }
}