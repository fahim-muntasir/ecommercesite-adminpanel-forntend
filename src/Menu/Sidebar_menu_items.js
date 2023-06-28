import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";

const Sidebar_menu_items = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        path: "/",
    },
    {
        title: "Users",
        icon: <GroupIcon />,
        subMenu: [
            {
                title: "Users",
                icon: <RadioButtonUncheckedIcon />,
                path: "/users",
            },
            {
                title: "Add User",
                icon: <RadioButtonUncheckedIcon />,
                path: "/users/new",
            },
        ],
    },
    {
        title: "Setting",
        icon: <SettingsInputComponentIcon />,
        path: "/setting",
    },
];

export default Sidebar_menu_items;
