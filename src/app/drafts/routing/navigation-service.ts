import { Injectable } from '@angular/core';
import { AppNavigation } from '../app-routing.models';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InitiationId } from '../initiation/initiation-routing.models';

@Injectable()
export class NavigationService extends AppNavigation {

	static get initialRoute () { return {path: '/', data: {title: ''}} }

	private userPermissions: Observable<string[]>;

	constructor(private router: Router,
				private http: HttpClient,
				private userService: UserService) {
		super(NavigationService.initialRoute);
		this.userPermissions = this.userService.getPermissions();
	}

	protected getPermissions(): Observable<string[]> {
		return this.userPermissions;
	}

	navigateByEmployeeId(employeeId: string, moveId?: string, assignmentEndingSoon?: boolean) {
		if (!employeeId) { return }

		this.http.get<EmployeeLink>(`/hr-search/${employeeId}/employee-link${moveId ? '?moveId=' + moveId : ''}`).subscribe(employeeLink => {
			switch (employeeLink.type) {

				case EmployeeLinkType.InitiationEmployeeForm:
					this.router.navigate(this.INITIATION.EMPLOYEE_FORM.buildLink(employeeLink.id));
					break;

				case EmployeeLinkType.InitiationPolicyConfiguration:
					this.router.navigate(this.INITIATION.POLICY_SETUP.buildLink(employeeLink.id));
					break;

				case EmployeeLinkType.InitiationCostEstimate:
					this.router.navigate(this.INITIATION.COST_ESTIMATE.buildLink(employeeLink.id));
					break;

				case EmployeeLinkType.InitiationCostEstimateBasic:
					this.router.navigate(this.INITIATION.COST_ESTIMATE.buildLink(employeeLink.id).concat(['basic']));
					break;

				case EmployeeLinkType.InitiationConfirmation:
					this.router.navigate(this.INITIATION.CONFIRMATION.buildLink(employeeLink.id));
					break;

				case EmployeeLinkType.InitiationMovesSummary:
				default:
					if (assignmentEndingSoon) {
						this.router.navigate(this.MOVES.MOVE(employeeLink.id).EMPLOYEE_PROFILE.buildLink());
					} else {
						this.router.navigate(this.MOVES.MOVE(employeeLink.id).SUMMARY.buildLink());
					}
					return;
			}
		})
	}

}

export interface EmployeeLink {
	type: EmployeeLinkType
	id: InitiationId
}

export enum EmployeeLinkType {
	InitiationEmployeeForm = 'SOME_KEY',
	InitiationPolicyConfiguration = 'ANOTHER_KEY',
	InitiationCostEstimate = 'BLA',
}

