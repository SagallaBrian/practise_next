import { List } from "@mui/material";

import {
  HomeIcon,
  UsersIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ClockIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  DocumentCheckIcon,
  BellAlertIcon,
  BanknotesIcon,
  CogIcon,
  CalculatorIcon,
  FlagIcon,
  ChevronDownIcon,
  LifebuoyIcon,
  TableCellsIcon,
  ExclamationCircleIcon,
  WalletIcon,
  CreditCardIcon,
  AdjustmentsVerticalIcon,
  MegaphoneIcon,
  WindowIcon,
  AcademicCapIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowsRightLeftIcon,
  TagIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { MenuItemLink } from "@/common/types/menulink";
import MenuItem from "./MenuItem";
function MainSideBar() {
  const menuItems: MenuItemLink[] = [
    {
      href: "/dashboard",
      title: "menu_bar_title_dashboard",
      menuRole: "all",
      icon: HomeIcon,
    },
    {
      href: "/platforms",
      title: "menu_bar_title_platforms",
      menuRole: "all",
      icon: Squares2X2Icon,
    },
    {
      href: "/platform-requests",
      title: "menu_bar_title_platform_requests",
      menuRole: "platformUser",
      icon: DocumentTextIcon,
    },

    {
      href: "/tokens",
      title: "menu_bar_title_tokens",
      menuRole: "token",
      icon: CircleStackIcon,
    },
    {
      href: "/users",
      title: "menu_bar_title_users",
      menuRole: "supersave",
      icon: UsersIcon,
    },
    {
      href: "/news",
      title: "menu_bar_title_news",
      menuRole: "news",
      icon: MegaphoneIcon,
    },
    {
      href: "/popups",
      title: "menu_bar_title_popups",
      menuRole: "popup",
      icon: WindowIcon,
    },
    {
      href: "/notifications",
      title: "menu_bar_title_notifications",
      menuRole: "notification",
      icon: BellAlertIcon,
    },
    {
      href: "/ads-management",
      title: "menu_bar_title_ads_management",
      menuRole: "ads",
      icon: TagIcon,
    },
    {
      href: "/inquiry",
      title: "menu_bar_title_inquiry",
      menuRole: "inquiry",
      icon: ChatBubbleOvalLeftEllipsisIcon,
    },
    {
      href: "/p2u-management",
      title: "menu_bar_title_p2u_management",
      menuRole: "p2u",
      icon: WalletIcon,
      submenu: [
        {
          title: "menu_bar_title_users_rpa_histories",
          href: "/p2u-management/rpa-histories",
          menuRole: "p2u",
          icon: CreditCardIcon,
        },
        {
          title: "menu_bar_title_users_rpa_error_logs",
          href: "/p2u-management/rpa-error-logs",
          menuRole: "p2u",
          icon: ExclamationCircleIcon,
        },
        {
          title: "menu_bar_sub_title_super_save_points_accumulation",
          href: "/p2u-management/points-accumulation",
          menuRole: "p2u",
          icon: AdjustmentsVerticalIcon,
        },
      ],
    },
    {
      href: "/super-save",
      title: "menu_bar_title_super_save",
      menuRole: "supersave",
      icon: ShieldCheckIcon,
      submenu: [
        {
          title: "menu_bar_sub_title_deposit_information",
          href: "/super-save/deposit-information",
          menuRole: "supersave",
          icon: ClipboardDocumentCheckIcon,
        },
        {
          title: "menu_bar_sub_title_withdrawal_information",
          href: "/super-save/withdrawal-information",
          menuRole: "supersave",
          icon: ClipboardDocumentListIcon,
        },
        {
          title: "menu_bar_sub_title_daily_calculation_information",
          href: "/super-save/daily-calculation-information",
          menuRole: "supersave",
          icon: CalculatorIcon,
        },
        {
          title: "menu_bar_sub_title_reserved_vault",
          href: "/super-save/reserved-vault",
          menuRole: "supersave",
          icon: DocumentCheckIcon,
        },
        {
          title: "menu_bar_sub_title_helper_services",
          href: "/super-save/helper-services",
          menuRole: "supersave",
          icon: LifebuoyIcon,
        },
        {
          title: "menu_bar_sub_title_bug_report",
          href: "/super-save/bug-report",
          menuRole: "supersave",
          icon: FlagIcon,
        },
        {
          title: "menu_bar_sub_title_admin_history",
          href: "/super-save/admin-history",
          menuRole: "supersave",
          icon: TableCellsIcon,
        },
        {
          title: "menu_bar_sub_title_education_management",
          href: "/super-save/education-management",
          menuRole: "supersave",
          icon: AcademicCapIcon,
        },
        {
          title: "menu_bar_sub_title_admin_txid_management",
          href: "/super-save/txid-management",
          menuRole: "supersave",
          icon: ArrowsRightLeftIcon,
        },
        {
          title: "menu_bar_sub_title_settings",
          href: "/super-save/setup",
          menuRole: "supersave",
          icon: Cog6ToothIcon,
          submenu: [
            {
              title: "menu_bar_sub_title_msq_transaction_threshold",
              href: "/super-save/setup/msq-standard-amount",
              menuRole: "supersave",
              icon: ClipboardIcon,
            },
            {
              title: "menu_bar_sub_title_super_save_standard_amount",
              href: "/super-save/setup/set-super-save-standard",
              menuRole: "supersave",
              icon: ClipboardDocumentIcon,
            },
            {
              title: "menu_bar_sub_title_super_save_time_setting",
              href: "/super-save/setup/super-save-time-setting",
              menuRole: "supersave",
              icon: ClockIcon,
            },
            {
              title: "menu_bar_sub_title_super_save_bank_fee",
              href: "/super-save/setup/super-save-bank-fee",
              menuRole: "supersave",
              icon: BanknotesIcon,
            },
            {
              title: "menu_bar_sub_title_super_save_notification_time",
              href: "/super-save/setup/super-save-notification-time",
              menuRole: "supersave",
              icon: BellAlertIcon,
            },
            {
              title: "menu_bar_sub_title_super_save_widget_settings",
              href: "/super-save/setup/widgets-settings",
              menuRole: "supersave",
              icon: CogIcon,
            },
          ],
        },
      ],
    },
    {
      href: "/msq_platform_users",
      title: "menu_bar_title_platform_users",
      menuRole: "platformUser",
      icon: LockClosedIcon,
    },
  ];

  return (
    <List>
      {menuItems.map((linkItm) => (
        <MenuItem item={linkItm} key={linkItm.href} />
      ))}
    </List>
  );
}

export default MainSideBar;
