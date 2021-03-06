import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MiloComponent} from "./milo.component";

describe('MiloComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				MiloComponent
			],
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(MiloComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have as title 'milo'`, async(() => {
		const fixture = TestBed.createComponent(MiloComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('milo');
	}));

	it('should render title in a h1 tag', async(() => {
		const fixture = TestBed.createComponent(MiloComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('Welcome to milo!!');
	}));
});
