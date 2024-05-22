export interface MenuItemLink {
  id?: string;
  href: string;
  title: string;
  icon: any;
  submenu?: MenuItemLink[];
  menuRole?: string;
}
