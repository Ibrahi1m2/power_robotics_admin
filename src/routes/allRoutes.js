import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

//Charts
import ChartsAppex from "../pages/Charts/charts-appex";
import ChartsJs from "../pages/Charts/charts-chartjs";
import ChartsKnob from "../pages/Charts/charts-knob";
import ChartsC3 from "../pages/Charts/charts-c3";
import ChartsSparkLine from "../pages/Charts/charts-sparkline";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"

//Icons
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import Iconion from "../pages/Icons/Iconion"
import IconFontawesome from "../pages/Icons/IconFontawesome"
import IconThemify from "../pages/Icons/IconThemify"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconTypicons from "../pages/Icons/IconTypicons"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormUpload from "../pages/Forms/FormUpload"
import FormXeditable from "../pages/Forms/FormXeditable"
import Products from "../pages/Products"


const userRoutes = [
  // //calendar
  { path: "/calendar", component: <Calendar /> },

  // // //profile
  { path: "/profile", component: <UserProfile /> },

  // //Charts
  { path: "/apex-charts", component: <ChartsAppex /> },
  { path: "/charts-chartjs", component: <ChartsJs /> },
  { path: "/charts-knob", component: <ChartsKnob /> },
  { path: "/charts-c3", component: <ChartsC3 /> },
  { path: "/sparkline-charts", component: <ChartsSparkLine /> },

  // // Icons
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-ion", component: <Iconion /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icons-themify", component: <IconThemify /> },
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-typicons", component: <IconTypicons /> }, 
  
  // // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DatatableTables /> },
  { path: "/tables-responsive", component: <ResponsiveTables /> },
  { path: "/tables-editable", component: <EditableTables /> },

  // // Maps
  { path: "/maps-google", component: <MapsGoogle /> },
  { path: "/maps-vector", component: <MapsVector /> },

  // // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-xeditable", component: <FormXeditable /> },
  { path: "/products", component: <Products /> },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
]

export { userRoutes, authRoutes }