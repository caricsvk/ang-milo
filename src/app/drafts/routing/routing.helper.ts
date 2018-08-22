import { Observable } from 'rxjs/Observable';

export type MgRoute = {
	path: any,
	queryParams?: any,
	data: MgRouteData
}

export type MgRouteData = {
	title: string,
	inMainMenu?: boolean,
	inUserMenu?: boolean,
	inRightMenu?: boolean,
	permission?: string,
}

export enum NavigationSpecialPermissions {
	HasVisibleChildren = 'HAS_VISIBLE_CHILDREN_PERMISSION'
}

/**
 * TODO document better how this works and what is it good for
 */
export abstract class MgRouterLink<F extends Function> {

	constructor(protected route: MgRoute,
				protected parent?: MgRouterLink<any>) { }

	abstract buildLink: F;

	/* TODO refactor this, split to getting by 'searchedUrl' and without it to make it clear if we search for parent's links
     or current link children */
	/**
	 * find relative menu links
	 * @param {any[]} searchedLinkParts
	 * @returns {{link: any[]; label: string}[]}
	 */
	getMenuLinks(searchedUrl?: any[] | string, menuType: 'main' | 'right' | 'user' = 'main', permissions?: Observable<string[]>): Observable<{link: any[], label: string}[]> {
		const searchedLinkParts = this.transformToParts(searchedUrl);
		const matchedLink = searchedLinkParts ? this.findMatch(searchedLinkParts) : this;
		if (!matchedLink) {
			return Observable.of([]);
		}
		const builtMatchedLink = matchedLink.buildLink();
		const linksForMenu = searchedUrl && matchedLink.parent ? matchedLink.parent : matchedLink;
		if (!permissions) {
			permissions = this.getPermissions();
		}
		return permissions.map(userPermissions =>
			linksForMenu.getLinks().map(link => {
				let linkData = link.route.data;
				let isDesiredMenuLink = (menuType === 'main' && linkData.inMainMenu) ||
					(menuType === 'right' && linkData.inRightMenu) ||
					(menuType === 'user' && linkData.inUserMenu);
				let hasPermission = !linkData.permission || userPermissions.includes(linkData.permission);
				let hasToHaveChildren = NavigationSpecialPermissions.HasVisibleChildren === linkData.permission;
				if (hasToHaveChildren) {
					link.getMenuLinks(undefined, menuType, Observable.of(userPermissions))
						.subscribe(links => hasPermission = links.length >= 1)
				}
				if (!isDesiredMenuLink || !hasPermission) {
					return undefined;
				}

				let matchedParams = this.extractParams(searchedLinkParts, builtMatchedLink);
				return {
					link: link.buildLink().map((part: any) => part === undefined ? matchedParams.shift() : part),
					queryParams: link.route.queryParams,
					label: link.route.data.title ? link.route.data.title : link.route.path
				}
			}).filter(menuLink => menuLink)
		);
	}

	/**
	 * searches in this and its children for matching url
	 * @param {string[] | string} urlPath
	 * @param dontTransform
	 * @returns {MgRouterLink<any>}
	 */
	findMatch(urlPath: string[] | string): MgRouterLink<any> {
		const urlPathParts = urlPath instanceof Array ? urlPath : this.transformToParts(urlPath);
		if (this.areSame(this, urlPathParts)) {
			return this;
		}
		const thisObjectLinks = this.getLinks();
		let foundLink = thisObjectLinks.find(link => this.areSame(link, urlPathParts));
		if (foundLink) {
			return foundLink;
		}
		for (let i = 0; i < thisObjectLinks.length; i ++) {
			const childLinks = thisObjectLinks[i].getLinks();
			for (let j = 0; j < childLinks.length; j ++) {
				let foundLink = childLinks[j].findMatch(urlPathParts);
				if (foundLink) {
					return foundLink;
				}
			}
		}
	}

	/**
	 * compare if start of url path matches this link
	 * @param {string[] | string} urlPath
	 * @returns {boolean}
	 */
	startsLike(urlPath: string[] | string) {
		const urlParts = urlPath instanceof Array ? urlPath : this.transformToParts(urlPath);
		return !this.buildLink().find((part: string, index: number) => part !== undefined && urlParts[index] !== part)
	}

	getTitle() {
		return this.route && this.route.data ? this.route.data.title : '';
	}

	protected getPermissions(): Observable<string[]> {
		return this.parent ? this.parent.getPermissions() : Observable.of([]);
	}

	protected getLinks(): MgRouterLink<any>[] {
		const result: MgRouterLink<any>[] = [];
		// beware that getOwnPropertyNames acts differently for lambda methods and standard methods
		const knownKeys = Object.getOwnPropertyNames(MgRouterLink.prototype).concat(['parent']);
		for (let key in this) {
			if (knownKeys.includes(key)) {
				continue;
			}
			const value = typeof <any>this[key] === 'function' ? <any>this[key]() : <any>this[key];
			if (value instanceof MgRouterLink) {
				result.push(value);
			}
		}
		return result;
	}

	private areSame(link: MgRouterLink<any>, searchedLink: any[]) {
		const builtLink = link.buildLink();
		return builtLink.length === searchedLink.length && this.startsLike(searchedLink);
	}

	private transformToParts(urlPathParts: string[] | string) {
		if (typeof urlPathParts === 'string') {
			urlPathParts = urlPathParts.split('?')[0].split('/');
			urlPathParts[0] = urlPathParts[0] ? urlPathParts[0] : '/';
		}
		if (urlPathParts) { // matrix params fix
			const splitByMatrix = (part: string) => part.includes(';') ? part.split(/;(.+)/).slice(0, -1) : [part];
			urlPathParts = urlPathParts.map(splitByMatrix).reduce((result, val) => (result || []).concat(val));
		}
		return <string[]> urlPathParts;
	}

	private extractParams(searchedLinkParts: string[], matchedLink: string[]) {
		return !searchedLinkParts ? [] : searchedLinkParts.filter(
			(part: string, index: number) => matchedLink[index] === undefined).map(param => {
			const result: {[key: string]: string} | string = param.includes('=') ? {} : param;
			param.split(';').forEach(keyValueStr => {
				const keyValue = keyValueStr.split('=');
				result[keyValue[0]] = keyValue[1];
			});
			return result;
		});
	}
}

export class BasicLink extends MgRouterLink<() => any[]> {
	public buildLink = () => {
		const pathArray = this.route.path === null ? [] : [this.route.path]; // ignore null, keep undefined
		return this.parent ? this.parent.buildLink().concat(pathArray) : pathArray;
	}
}
