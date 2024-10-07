// import
import React from 'react';
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import User from 'views/Dashboard/User';
import EmployeeRegistrationForm from 'components/Employee/EmployeeRegistrationForm';
// import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Onu Los Table",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    icon: <CreditIcon color='inherit' />,
    component: User,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Complaint",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Employee",
    icon: <CreditIcon color='inherit' />,
    component: EmployeeRegistrationForm,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Network",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color='inherit' />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Sign Out",
    icon: <DocumentIcon color='inherit' />,
    component: SignIn,
    layout: "/auth",
  },
];
export default dashRoutes;
