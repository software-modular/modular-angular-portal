export const environment = {
  production: false,
  configuration: {
    typeAuthenticator: "0",
    defaultUrlRedirect: "portal/home"
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
        updateClient: "/users/client/update/%s",
        updateStaff: "/users/staff/update/%s/",
        deleteStaff: "/users/staff/delete/%s",
        deleteClient: "/users/client/delete/%s",
        findAllProjects: "/projects/",
        createProject: "/projects/create/"
      }
    }
  },
  navbarConfiguration: {
    title: "Agro-Inversiones",
    srcLogo: "./assets/img/logo.png",
    logoRedirect: false,
    urlLogoRedirect: "/portal/home",
    altLogo: "Agro-Inversiones",
    typeNavbar: "CUSTOM",
    urlRedirectCloseSession: "/portal/home",
    navbarOptions: [
      {
        name: "Inicio",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/home",
        icon: "",
        type: "MENU",
        roleView: "ALL",
        items: []
      },
      {
        name: "Proyectos",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/project",
        icon: "",
        type: "MENU",
        roleView: "ALL",
        items: []
      },
      {
        name: "Administrar usuarios",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/user/management",
        icon: "",
        type: "MENU",
        roleView: "ADMIN",
        items: []
      },
      {
        name: "Administrar proyectos",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/project/management",
        icon: "",
        roleView: "ADMIN",
        type: "MENU",
      }, {
        name: "Informacion de perfil",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "/portal/user/profile",
        icon: "fa-solid fa-user-pen",
        type: "USER_PROFILE_MENU",
        roleView: "ALL",
      }
    ],

  }

};
