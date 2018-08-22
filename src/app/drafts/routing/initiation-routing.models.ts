import { BasicLink, MgRouterLink } from '../routing.helper';

export interface InitiationId {
	employeeId?: number,
	policyId?: number,
	moveId?: number
}

export const initiationNavigationData = {
	policySelect: {
		path: 'policy-select',
		data: { title: 'Select policy' }
	},
	employeeDetails: {
		path: 'employee-details',
		data: { title: 'Create employee' }
	},
	policySetup: {
		path: 'policy-setup',
		data: { title: 'Configure policy' }
	},
	costEstimate: {
		path: 'cost-estimate',
		data: { title: 'Cost estimate' }
	},
	confirmation: {
		path: 'confirmation',
		data: { title: 'Confirm' }
	},
};

export class InitiationLink extends MgRouterLink<(params: InitiationId) => any[]> {
	public buildLink = (params: InitiationId) => {
		if (params && (params.moveId === null || params.moveId === undefined)) {
			delete params.moveId;
		}
		const pathArray = this.route.path === null ? [params] : [this.route.path, params];
		return this.parent ? this.parent.buildLink().concat(pathArray) : pathArray;
	}
}

export class InitiationNavigation extends BasicLink {
	POLICY_SELECT = new BasicLink(initiationNavigationData.policySelect, this);
	EMPLOYEE_FORM = new InitiationLink(initiationNavigationData.employeeDetails, this);
	POLICY_SETUP = new InitiationLink(initiationNavigationData.policySetup, this);
	COST_ESTIMATE = new InitiationLink(initiationNavigationData.costEstimate, this);
	CONFIRMATION = new InitiationLink(initiationNavigationData.confirmation, this);
}
