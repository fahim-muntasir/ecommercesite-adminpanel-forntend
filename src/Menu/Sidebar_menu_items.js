import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
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
        title: "Product",
        icon: <InventoryIcon />,
        subMenu: [
            {
                title: "Products",
                icon: <RadioButtonUncheckedIcon />,
                path: "/products",
            },
            {
                title: "Add Product",
                icon: <RadioButtonUncheckedIcon />,
                path: "/products/new",
            },
        ],
    },
    {
        title: "Category",
        icon: <CategoryIcon />,
        subMenu: [
            {
                title: "Categories",
                icon: <RadioButtonUncheckedIcon />,
                path: "/categories",
            },
            {
                title: "Add Category",
                icon: <RadioButtonUncheckedIcon />,
                path: "/categories/new",
            },
            {
                title: "Add Sub-Category",
                icon: <RadioButtonUncheckedIcon />,
                path: "/categories/sub/new",
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
