import {Injectable} from '@angular/core';

@Injectable()
export class MiloService {

	constructor() {
	}

	getData() {
		return this.data;
	}

	private data = [
		{
			"id": 2,
			"name": "Home",
			"enabled": false,
			"tags": [
				{
					"id": 101,
					"tag": "domov"
				}
			]
		},
		{
			"id": 1,
			"name": "World",
			"enabled": false,
			"tags": [
				{
					"id": 23,
					"tag": "world"
				}
			]
		},
		{
			"id": 3,
			"name": "Life & Culture",
			"tags": [
				{
					"id": 67,
					"tag": "art"
				}
			]
		},
		{
			"id": 4,
			"name": "Tech & Science",
			"enabled": true,
			"tags": [
				{
					"id": 56,
					"tag": "veda"
				},
				{
					"id": 57,
					"tag": "vat"
				}
			]
		},
		{
			"id": 24,
			"name": "Relations & Sex",
			"enabled": true,
			"tags": [
				{
					"id": 20,
					"tag": "laska"
				},
				{
					"id": 60,
					"tag": "vztah"
				},
				{
					"id": 61,
					"tag": "sex"
				}
			]
		},
		{
			"id": 22,
			"name": "Travel",
			"enabled": true,
			"tags": [
				{
					"id": 229,
					"tag": "dovolenk"
				}
			]
		},
		{
			"id": 39,
			"name": "Entertainment",
			"enabled": true,
			"tags": [
				{
					"id": 245,
					"tag": "chillin"
				},
				{
					"id": 231,
					"tag": "inspir"
				}
			]
		},
		{
			"id": 26,
			"name": "Hockey"
		},
		{
			"id": 41,
			"name": "Health",
			"tags": [
			]
		},
		{
			"id": 20,
			"name": "TV & Movies",
			"enabled": true
		},
		{
			"id": 36,
			"name": "Apps & Games",
			"tags": [
				{}
			]
		},
		{
			"id": 23,
			"name": "Style & Beauty",
			"enabled": false,
			"tags": [
				{
					"id": 74,
					"tag": "style"
				},
				{
					"id": 75,
					"tag": "beauty"
				},
				{
					"id": 62,
					"tag": "moda"
				},
				{
					"id": 63,
					"tag": "styl"
				}
			]
		},
		{
			"id": 37,
			"name": "Internet",
			"enabled": true,
			"tags": []
		},
		{
			"name": "People",
			"enabled": true,
		},
		{
			"id": 16,
			"enabled": false,
			"name": null
		},
		{
			"id": 10,
			"name": "Asia",
			"enabled": true,
			"tags": [
				{
					"id": 134,
					"tag": "azia"
				}
			]
		},
		{
			"id": 33
		},
		{
			"id": 34,
			"enabled": true,
			"name": "Work"
		},
		{
			"id": 42,
			"enabled": true,
			"name": "Space & Physics"
		},
		{
			"id": 31,
			"enabled": true,
			"name": "Personal Finance"
		},
		{
			"id": 30,
			"enabled": false,
			"name": "Race",
			"tags": [
				{
					"id": 39,
					"tag": "nascar"
				},
				{
					"id": 94,
					"tag": "motosport"
				}
			]
		},
		{
			"id": 11,
			"name": "Africa & Middle East"
		},
		{
			"id": 5,
			"name": "Finance & Economics",
			"tags": [
				{
					"id": 43,
					"tag": "money"
				},
				{
					"id": 52,
					"tag": "peniaze"
				}
			]
		},
		{
			"id": 32,
			"name": "Economy"
		}
	];

}
