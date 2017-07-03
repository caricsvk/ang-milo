import {Component, OnInit} from '@angular/core';
import {MiloService} from "./milo.service";

@Component({
	selector: 'milo-root',
	templateUrl: './milo.component.html',
	styleUrls: ['./milo.component.css']
})
export class MiloComponent implements OnInit {

	title = 'milo';

	constructor(public service: MiloService) {
		console.log('AppComponent constructor');
	}

	ngOnInit():void {
		console.log('AppComponent OnInit');
		// this.activatedRoute.queryParams.subscribe(params => {
		// 	this.appService.setState(params);
		// });
		this.service.onStateChange().subscribe(state => {
			// this.router.navigate(['.'], {queryParams: state, preserveFragment: true, relativeTo: this.activatedRoute});
		});
	}

}
