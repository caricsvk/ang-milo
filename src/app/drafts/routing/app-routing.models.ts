import { BasicLink, NavigationSpecialPermissions } from './routing.helper';
import { MovesNavigation } from './moves/moves-routing.models';
import { MobilityAnalyticsNavigation } from './mobility-analytics/mobility-analytics-routing.module';
import { ToolsNavigation } from './tools/tools-routing.models';
import { InitiationNavigation } from './initiation/initiation-routing.models';
import { PermissionType } from './core/user.service.models';

export const AppNavigationData = {
  home: {
    path: 'home',
    data: { title: 'Home', inMainMenu: true }
  },
  initiation: {
    path: 'initiation',
    data: { title: 'Initiate single move', inRightMenu: true, permission: PermissionType.Initiation }
  },
  rolesPermissions: {
    path: 'roles-permissions',
    data: { title: 'Manage Roles', inMainMenu: true, permission: PermissionType.ManageRoles }
  },
  moves: {
    path: 'moves',
    data: { title: 'Moves', inMainMenu: true, permission: PermissionType.ViewMoves }
  },
  analytics: {
    path: 'analytics',
    data: { title: 'Mobility Analytics', inMainMenu: true, permission: PermissionType.ViewAnalytics }
  },
  tools: {
    path: 'tools',
    data: { title: 'Tools', inMainMenu: true, permission: NavigationSpecialPermissions.HasVisibleChildren }
  },
  searchResults: {
    path: 'search-results',
    data: { title: 'Search Results' }
  },
  bulkUpload: {
    path: 'bulk-upload',
    data: { title: 'Initiate multiple moves', inRightMenu: true, permission: PermissionType.UseBulkUpload }
  }
};

export class AppNavigation extends BasicLink {
  HOME = new BasicLink(AppNavigationData.home, this);
  MOVES = new MovesNavigation(AppNavigationData.moves, this);
  TOOLS = new ToolsNavigation(AppNavigationData.tools, this);
  INITIATION = new InitiationNavigation(AppNavigationData.initiation, this);
  BULK_UPLOAD = new BasicLink(AppNavigationData.bulkUpload, this);
  SEARCH_RESULTS = new BasicLink(AppNavigationData.searchResults, this);
  ROLES_PERMISSIONS = new BasicLink(AppNavigationData.rolesPermissions, this);
}

