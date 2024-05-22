import { usePathname } from "next/navigation";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { MenuItemLink } from "@/common/types/menulink";

function MenuItem({ item }: { item: MenuItemLink }) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      <ListItem
        key={item.href}
        disablePadding
        className={`flex items-center ${
          isActive(item.href)
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        <ListItemButton component={Link} href={item.href} passHref>
          <item.icon className="h-5 w-5 mr-3" />
          <ListItemText primary={item.menuRole} />
        </ListItemButton>
      </ListItem>
      {isActive(item.href) && item.submenu && (
        <List className="pl-4">
          {item.submenu.map((subItem) => (
            <MenuItem key={subItem.href} item={subItem} />
          ))}
        </List>
      )}
    </>
  );
}

export default MenuItem;
