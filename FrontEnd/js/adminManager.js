class AdminManager {
    constructor() {
      // on stocke le tocken dans le sessionStorage, on selectionne le bouton de connexion, la barre de filtre, le mode edition et le bouton modifier, puis on appelle la méthode init() pour initialiser le gestionnaire
      this.token = sessionStorage.getItem("token");
      this.loginButton = document.querySelector("#ButtonLogin");
      this.filter = document.querySelector(".filterBar");
      this.editBar = document.querySelector(".editMode");
      this.editGalleryButton = document.querySelector(".btnModifyWorks");
      this.init();
    }
    // La méthode init() initialise le gestionnaire. Elle met à jour l'apparence du bouton de connexion en appelant la méthode updateLoginButton, elle met à jour l'interface en appelant la méthode updateInterface() et un gestionnaire d'événements est ajouté au bouton de connexion pour basculer entre la connexion et la déconnexion 
    init() {
      console.log("Initialisation de l'AdminManager");
      this.updateLoginButton();
      this.updateInterface();
      this.loginButton.addEventListener("click", () => this.toggleLogin());
    }
    
    // La méthode isLogged() vérifie la connexion de l'utilisateur en regardant si un tocken est stocké dans la session.
    isLogged() {
      return this.token ? true : false;
    }
    // La méthode toggleLogin() permet de basculer entre la connexion et la deconnexion. Si l'utilisateur est déjà connecté la méthode logout() est appelé pour le déconnecter sinon init() est appelée pour le connecter
    toggleLogin() {
      if (this.isLogged()) {
        this.logout();
      } else {
        this.init();
      }
    }
    // La méthode logout() supprime le token de la session, ce qui déconnecte l'administrateur, ensuite on recharge la page refléter l'état de déconnexion
    logout() {
      sessionStorage.removeItem("token");
      console.log("Déconnecté");
      window.location.reload();
    }
    // La méthode updateLoginButton() met à jour le texte du bouton de connexion en fonction de l'état de connexion de l'administrateur
    updateLoginButton() {
      console.log("Mise à jour du bouton de connexion");
      if (this.isLogged()) {
        this.loginButton.href = '#';
        this.loginButton.innerText = "Logout";
      } else {
        this.loginButton.href = 'login.html'; 
        this.loginButton.innerText = "Login";
      }
    }
    // Si l'administrateur est connecté, la barre de filtre est masquée tandis que la barre de mode d'édition et le bouton modifier sont affichés
    updateInterface() {
      console.log("Mise à jour de l'interface d'administration");
      if (this.isLogged()) {
        console.log("Affichage des boutons d'administration lorsque l'administrateur est connecté");
        this.filter.style.display = "none";
        this.editBar.style.display = "flex";
        this.editGalleryButton.style.display = "inline-flex";
      }
    }
    }
    // En dehors de la classe, on ajoute un gestionnaire d'événement attaché à l'objet window qui s'éxécute lorsque la page est chargée. Cela crée une intance de la classe AdminManager et initialise le gestionnaire d'administration.
    window.addEventListener("load", () => {
    const adminManager = new AdminManager();
    });