export const environment = {
  production: false,
  configuration: {
    typeAuthenticator: "0",
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
        getClientById: "/users/client/%s/"
      }
    }
  },
  navbarConfiguration: {
    title: "Agro-Inversiones",
    srcLogo: "./assets/logo.png",
    logoRedirect: false,
    urlLogoRedirect: "#",
    altLogo: "Agro-Inversiones",
    typeNavbar: "CUSTOM",
    navbarOptions: [
      {
        name: "Invierte",
        redirect: false,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "",
        icon: "fa fa-line-chart",
        type: "MENU"
      },
      {
        name: "Proyectos",
        redirect: false,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "",
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
