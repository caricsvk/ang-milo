import {Component, OnInit, Input} from '@angular/core';

@Component({
	selector: 'milo-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

	// class: {warning, positive, info, error}
	static notifications: {message, cssClass}[] = [];

	constructor() {
	}

	ngOnInit() {
		// NotificationComponent.notifications.push({message: 'Tadaaa', cssClass: 'positive'});
		// NotificationComponent.notifications.push({message: 'Oh yea', cssClass: 'error'});
	}

	static info(message: string) {
		NotificationComponent.notifications.push({message: message, cssClass: 'info'});
	}

	static error(message: string) {
		NotificationComponent.notifications.push({message: message, cssClass: 'error'});
	}

	static warning(message: string) {
		NotificationComponent.notifications.push({message: message, cssClass: 'warning'});
	}

	static success(message: string) {
		NotificationComponent.notifications.push({message: message, cssClass: 'positive'});
	}

	get notifications() {
		return NotificationComponent.notifications;
	}

}
