import {Component, OnInit, OnDestroy, ElementRef, AfterViewInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {InterceptedHttp} from "../http.interceptor";

@Component({
	selector: 'milo-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, AfterViewInit, OnDestroy {

	private subscription: Subscription;
	public loadingClass = "small";
	public loadingsCount = 0;

	constructor(private el:ElementRef) {
		window['xel'] = el;
	}

	ngOnInit() {
		this.subscription = InterceptedHttp.getPendingRequests().subscribe(count => this.loadingsCount = count);
	}

	ngAfterViewInit():void {
		var baseUrl = window.location.href.replace(window.location.hash, "");
		this.el.nativeElement.querySelectorAll("[*|href]").forEach(function(element) {
			element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href"));
		});
	}


	ngOnDestroy():void {
		this.subscription.unsubscribe();
	}

	reload() {
		alert('Reload is not implemented yet!');
	}

}
