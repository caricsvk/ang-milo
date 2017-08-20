import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
	transform(totalSeconds: number, showSeconds = false): string {
		let result = showSeconds ? (totalSeconds % 60) + "s" : "";
		let minutes: number = totalSeconds / 60;
		result = Math.floor(minutes) % 60 + "m " + result;
		let hours: number = minutes / 60;
		result = Math.floor(hours) % 24 + "h " + result;
		let days: number = hours / 24;
		if (Math.floor(days) > 0) {
			result = Math.floor(days) + "d " + result;
		}
		return result;
	}
}