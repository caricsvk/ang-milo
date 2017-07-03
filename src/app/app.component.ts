import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";

@Component({
	selector: 'milo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'milo';

	constructor(public appService: AppService) {
		console.log('AppComponent constructor');
	}

	ngOnInit():void {
		console.log('AppComponent OnInit');
		// this.activatedRoute.queryParams.subscribe(params => {
		// 	this.appService.setState(params);
		// });
		this.appService.onStateChange().subscribe(state => {
			// this.router.navigate(['.'], {queryParams: state, preserveFragment: true, relativeTo: this.activatedRoute});
		});
	}

}
