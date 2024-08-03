export const environment = {
  production: false,
  api: {
    host: 'http://localhost:8080/api',
    endpoints: {
      users: {
        path: "/users",
        login: "/login/",
        loginRefresh: "/login/refresh-token",
        logout: "/logout/",
        delete: "/delete/",
        changPassword: "/changepassword/",
        inactivate: "/inactivate/",
        client: "/client/",
        createClient: "/client/create/",
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
        redirect: false,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "",
        icon: "fa-solid fa-user-pen",
        type: "USER_PROFILE_MENU"
      },
      {
        name: "Cerrar sesion",
        redirect: false,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "",
        icon: "fa-solid fa-right-from-bracket",
        type: "USER_PROFILE_MENU"
      },

    ],

  }

};
