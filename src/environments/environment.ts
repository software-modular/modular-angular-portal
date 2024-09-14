export const environment = {
  production: false,
  configuration: {
    typeAuthenticator: "0",
    defaultUrlRedirect: "portal/home"
  },
  api: {
    host: 'https://app.agrofin.com.co/api',
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
        getAgreementByUserId: "/users/client/contractor/",
        enableInversionsByUserId: "/users/client/contractor-activate/",
        getAllClient: "/users/client/?page=",
        updateClient: "/users/client/update/%s",
        uploadContractUser: "/users/client/contractor-upload/",
        updateStaff: "/users/staff/update/%s/",
        deleteStaff: "/users/staff/delete/%s",
        deleteClient: "/users/client/delete/%s",
        findAllProjects: "/projects/",
        findAllPublicProjects: "/projects/view/",
        findProjectById: "/projects/",
        findPublicProjectById: "/projects/view/",
        createProject: "/projects/create/",
        deleteProject: "/projects/delete/",
        updateProjectInformation: "/projects/update/%s/",
        updateProjectCrop: "/projects/crops/update/",
        updateProjectOwner: "/users/owner/update/",
        updateProjectInvestment: "/projects/investments/update/",
        updateProjectPrepurcharse: "/projects/prepurcharses/update/",
        createProjectPrepurcharse: "/projects/prepurcharses/create/",
        createTransaction: "/transactions/create/",
        findTrasactionById: "/transactions/",
        findAllTrasactions: "/transactions/"

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
        name: "Mis inversiones",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/project/investment",
        icon: "",
        type: "MENU",
        roleView: "USER",
        items: []
      },
      {
        name: "Inversiones",
        redirect: true,
        showOption: true,
        disableOption: false,
        cssClass: "",
        cssStyle: "",
        urlRedirect: "portal/project/investment",
        icon: "",
        type: "MENU",
        roleView: "ADMIN",
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

  },
  aditionalInfo: {
    whatsappNumber: "3156627242",
    whatsappDefaultMessage: "Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20la%20gestión%20de%20un%20contrato%20para%20inversiones%20en%20la%20plataforma%20Agrofin.%20¿Podrían%20proporcionarme%20detalles%20sobre%20los%20requisitos,%20el%20proceso%20y%20las%20opciones%20disponibles?%20Agradezco%20su%20pronta%20respuesta."
  }
};
