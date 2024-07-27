export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
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
