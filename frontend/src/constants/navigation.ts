export enum sidebarMenuItems {
  OVERVIEW = 'overview',
  VISUALIZATION = 'visualization',
  VIEW_TEAMS = 'view teams',
  ADD_TEAM = 'add team',
  VIEW_DOMAINS = 'view domains',
  ADD_DOMAIN = 'add domain',
}

export const sidebarMenuItemLabels = {
  [sidebarMenuItems.OVERVIEW]: 'Project Overview',
  [sidebarMenuItems.VISUALIZATION]: 'Visualization',
  [sidebarMenuItems.VIEW_TEAMS]: 'View all project teams',
  [sidebarMenuItems.ADD_TEAM]: 'Add new team to project',
  [sidebarMenuItems.VIEW_DOMAINS]: 'View all domains',
  [sidebarMenuItems.ADD_DOMAIN]: 'Add new domain',
};

export enum headerMenuItems {
  TEAMS = 'teams',
  PROJECTS = 'projects',
  DASHBOARD = 'dashboard',
}

export const headerMenuItemLabels = {
  [headerMenuItems.TEAMS]: 'Teams',
  [headerMenuItems.PROJECTS]: 'Projects',
  [headerMenuItems.DASHBOARD]: 'Dashboard',
};
