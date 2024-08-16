export const environment = {
  production: false,
  configuration: {
    typeAuthenticator: "0",
    defaultUrlRedirect: "portal/login"
  },
  api: {
    host: 'http://127.0.0.1:8000/api',
    endpoints: {
      users: {
        login: "/users/login/",
        loginRefresh: "/login/refresh-token",
        logout: "/logout/",
        delete: "/delete/",
        changPassword: "/changepassword/",
        inactivate: "/inactivate/",
        client: "/users/client/",
        createClient: "/users/client/create/",
        getClientById: "/users/client/%s/",
        getAllStaff: "/users/staff/?page=",
        createStaff: "/users/staff/create/",
        getAllClient: "/users/client/?page=",
        deleteUser: "/users/client/delete/%s",
        findAllProjects: "/projects/",
        createProject: "/projects/create/"
      }
    }
  },
  navbarConfiguration: {
    title: "Agro-Inversiones",
    srcLogo: "./assets/logo.png",
    logoRedirect: false,
    urlLogoRedirect: "/portal/home",
    altLogo: "Agro-Inversiones",
    typeNavbar: "CUSTOM",
    navbarOptions: [
      {
        name: "Administrar usuarios",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/user/management",
        icon: "fa fa-line-chart",
        type: "MENU"
      },
      {
        name: "Administrar proyectos",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/project/management",
        icon: "fa fa-address-card",
        type: "MENU"
      },
      {
        name: "Nosotros",
        redirect: false,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "",
        icon: "fa fa-users",
        type: "MENU"
      }, {
        name: "Editar usuario",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "/portal/user/profile",
        icon: "fa-solid fa-user-pen",
        type: "USER_PROFILE_MENU"
      }
    ],

  }

};
