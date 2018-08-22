import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {
	HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { HttpService } from './core/http.service';

@Injectable()
export class MgHttpInterceptor implements HttpInterceptor {

	private terminateRequestsSubject = new Subject();
	private numberOfRequestsInProgress = 0;
	private numberOfRequestsInProgressSubject = new Subject<number>();
	private errorsResponsesSubject = new Subject<HttpErrorResponse>();

	constructor(private httpService: HttpService) {
		httpService.setHttpInterceptor(this);
	}

	static getHeaders(...interceptorHeaders: MgInterceptorHeaders[]) {
		return this.addHeaders(new HttpHeaders, ...interceptorHeaders);
	}

	static addHeaders(httpHeaders: HttpHeaders, ...interceptorHeaders: MgInterceptorHeaders[]) {
		interceptorHeaders.forEach(header => httpHeaders = httpHeaders.set(header, 'true'));
		return httpHeaders;
	}

	getNumberOfRequestsInProgress(): Observable<number> {
		return this.numberOfRequestsInProgressSubject.asObservable();
	}

	getErrorsResponses(): Observable<HttpErrorResponse> {
		return this.errorsResponsesSubject.asObservable();
	}

	terminateRequests() {
		this.terminateRequestsSubject.next();
	}

	intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let observableRequest = next.handle(httpRequest);
		const hasHeader = (header: MgInterceptorHeaders) => httpRequest.headers.has(header);

		if (!hasHeader(MgInterceptorHeaders.EXCLUDE_FROM_COUNTING)) {
			this.numberOfRequestsInProgressSubject.next(++this.numberOfRequestsInProgress);
		}

		if (!hasHeader(MgInterceptorHeaders.PREVENT_DEFAULT_CANCELLATION)) {
			observableRequest = observableRequest.takeUntil(this.terminateRequestsSubject);
		}

		if (!hasHeader(MgInterceptorHeaders.PREVENT_DEFAULT_ERROR_HANDLING)) {
			observableRequest = observableRequest.catch((error: any, caught: Observable<HttpEvent<any>>) => {
				if (error instanceof HttpErrorResponse) {
					this.errorsResponsesSubject.next(error);
				}
				return Observable.throw(error);
			});
		}

		if (!hasHeader(MgInterceptorHeaders.EXCLUDE_FROM_COUNTING)) {
			observableRequest = observableRequest.finally(() =>
				this.numberOfRequestsInProgressSubject.next(--this.numberOfRequestsInProgress)
			);
		}

		return observableRequest;
	}

}

export enum MgInterceptorHeaders {
	PREVENT_DEFAULT_ERROR_HANDLING = 'prevent-default-error-handling',
	PREVENT_DEFAULT_CANCELLATION = 'prevent-default-cancellation',
	EXCLUDE_FROM_COUNTING = 'exclude-from-counting'
}
