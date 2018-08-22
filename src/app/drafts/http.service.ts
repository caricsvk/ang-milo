import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
	ConfirmationDialogComponent,
	ConfirmationDialogData,
	ConfirmationDialogOnCloseResult
} from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { MgHttpInterceptor } from '../http.interceptor';

@Injectable()
export class HttpService {

	private httpInterceptor: MgHttpInterceptor;
	// private noErrorHandlingResponses

	constructor(private dialog: MatDialog) {
	}

	setHttpInterceptor(httpInterceptor: MgHttpInterceptor) {
		this.httpInterceptor = httpInterceptor;

		httpInterceptor.getErrorsResponses().subscribe(errorResponse => {
			if (errorResponse.status === 500) {
				window.open('/error/404', '_self');
			} else if (errorResponse.status >= 401) {
				this.showErrorDialog(errorResponse.status);
			}
		});
	}

	getNumberOfRequestsInProgress(): Observable<number> {
		return this.httpInterceptor.getNumberOfRequestsInProgress();
	}

	terminateRequests() {
		this.httpInterceptor.terminateRequests();
	}

	private showErrorDialog(errorCode: number) {
		let data;
		switch (errorCode) {
			case 401:
				data = new ConfirmationDialogData('Session expired', 'Your session has expired.', 'Log In', null);
				break;
			case 403:
				data = new ConfirmationDialogData('Access denied', 'Your permissions are not properly set to see this page.', 'Go Back', null);
				break;
			default:
				data = new ConfirmationDialogData('Unexpected error', 'We are sorry, an unexpected server error has occurred.', 'Reload page', 'Continue');
				break;
		}
		this.dialog.open(ConfirmationDialogComponent, {width: '400px', data}).afterClosed().subscribe(
			(response: ConfirmationDialogOnCloseResult) => {
				if (errorCode === 401) {
					location.href = '/?redirect=/';
				} else if (errorCode === 403) {
					history.back();
				} else if (response && response.confirmed) {
					location.reload();
				}
			});
	}

}
