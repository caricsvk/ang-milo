import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {environment} from "./environments/environment";
import {MiloModule} from "./app/milo.module";

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MiloModule);
