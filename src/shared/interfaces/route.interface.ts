export interface IRoute {
  url: string;
  name: string;
  iconName: string;
  showIfAuthenticated: boolean;
  dontShowIfAuthenticated: boolean;
}
