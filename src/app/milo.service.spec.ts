import {TestBed, inject} from '@angular/core/testing';
import {MiloService} from "./milo.service";

describe('AppService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MiloService]
		});
	});

	it('should be created', inject([MiloService], (service:MiloService) => {
		expect(service).toBeTruthy();
	}));
});
