/*******************************************************
 *  GESTION DES WORKS ET DU FILTRAGE DES CATEGORIES
 *******************************************************/
    class WorksGallery {
      constructor() {
        // On sélectionne dans le constructeur la galerie, la barre de filtre et on crée bouton Tous. On appelle la méthode loadCategories(), setupEventListeners() et loadWorksAndDisplay()
        this.galleryElement = document.querySelector(".gallery");
        this.filterBar = document.querySelector(".filterBar");
        this.allButton = this.createFilterButton("Tous");
        this.loadCategories();
        this.setupEventListeners();
        this.loadWorksAndDisplay();
      }
  // On charge en asynchrone les éléments de la galerie en appelant la méthode loadWorks() et on les affiche dès le chargement de la page
  async loadWorksAndDisplay() {
    try {
      const works = await this.loadWorks();
      this.displayWorks(works);
    } catch (error) {
      console.error(error);
      console.log("Erreur lors du chargement des works");
    }
  }
   // On charge en asynchrone les éléments de la galerie en appelant la méthode loadWorks(). Si une erreur se produit pendant le chargement, elle affiche un message d'erreur et retourne un tableau vide.
      async loadWorks() {
        try {
          const response = await fetch("http://localhost:5678/api/works");
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          console.log("Erreur lors du chargement des works")
          return [];
        }
      }
    // La méthode diplayWorks prend en argument un tableau de works et rempli la galerie avec les cards contenant chacune une image et un titre
      displayWorks(works) {
        this.galleryElement.innerHTML = "";
        works.forEach((work) => {
          const galleryCard = document.createElement("galleryCard");
          galleryCard.innerHTML = `
            <img src="${work.imageUrl}">
            <h3 class="cardTitle">${work.title}</h3>
          `;
          this.galleryElement.appendChild(galleryCard);
        });
      }
    // La méthode loadCategories() charge les catégories et appelle displayCategories(categories) pour les afficher
      async loadCategories() {
        try {
          const response = await fetch("http://localhost:5678/api/categories");
          const categories = await response.json();
          this.displayCategories(categories);
          this.loadWorks();
        } catch (error) {
          console.error(error);
        }
      }
    // La méthodde displayCategories(categories) prend en argument un tableau de catégorie, crée des boutons de filtres pour chaque catégorie et les ajoute à la barre de filtre. Chaque bouton est associé à un gestionnaire d'événements qui filtre les works en fonction de la catégorie lorqu'il est cliqué
      displayCategories(categories) {
        const allButton = this.createFilterButton("Tous");
        allButton.addEventListener("click", async () => {
        const allWorks = await this.loadWorks();
        this.displayWorks(allWorks);
        });
         this.filterBar.appendChild(allButton);
        categories.forEach((category) => {
          const button = this.createFilterButton(category.name);
          button.addEventListener("click", async () => {
            if (category.name === "Tous") {
              const allWorks = await this.loadWorks();
              this.displayWorks(allWorks);
            } else {
              const worksData = await this.loadWorks();
              const filteredWorks = worksData.filter((work) => work.categoryId === category.id);
              this.displayWorks(filteredWorks);
            }
          });
          this.filterBar.appendChild(button);
        });
       
      }
      // La méthode createFilterButton(texte) permet de créer un bouton avec le texte spécifié et ajoute la classe "Filter"
      createFilterButton(text) {
        const button = document.createElement("button");
        button.innerText = text;
        button.classList.add("FilterButton");
        return button;
      }
    
      setupEventListeners() {
        //  le filtrage est géré dans displayCategories
      }
    }
    // On instancie l'objet gallery qui déclenche l'exécution du code lorsque la page est chargée
    const gallery = new WorksGallery();
    
    
    
  /***********************************************
 * INTERFACE ADMIN
 ***********************************************/
// on crée la barre noire de l'espace admin
  document.querySelector('.editMode').innerHTML=`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="white"/>
</svg>
<p>Mode édition</p>
`
// on crée le stylo et le texte modifier
document.querySelector('.btnModifyWorks').innerHTML=`
<span><i class="fa-regular fa-pen-to-square"></i></span>
<p>modifier</p>
`
// création d'une classe pour encapsuler le comportement lié à la connexion et à la déconnexion de l'administrateur
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
  
  /************************************************
   * GESTION DE LA MODALE
  *************************************************/
  const modal=document.querySelector('.modal');
  // On insère du contenu html dans la modale comprenant un en-tête, un titre, un conteneur pour les éléments flex, une ligne horizontale et un pied de page contenant les boutons pour ajouter une photo et supprimer la galerie. 
  modal.innerHTML=`
  <header id="modalHeader">
  <i class="fa-solid fa-xmark hidden"></i>
  </header>
  <h3 id="titleModal">Galerie photo</h3>
  <div id="modalFlex" class="flex-container"></div>
  <hr id="hr1" />
  <footer id="modalFooter">
  <button class="btn-add-picture" id="btn-add-work">
  Ajouter une photo
  </button>
  <p id="deleteGallery">Supprimer la galerie</p>
  </footer>
  `
  // On sélectionne plusieurs éléments du DOM: la fenêtre modale, l'élément de superposition, le bouton de fermeture et le bouton d'ouverture de la modale, le conteneur flex et le bouton "Ajouter une photos"
  const overlay=document.querySelector('.overlay');
  const btnCloseModal=document.querySelector('.fa-xmark');
  const btnOpenmodal=document.querySelector('.btnModifyWorks');
  const flexModal=document.querySelector("#modalFlex");
  const addWorkButton=document.querySelector(".btn-add-picture");
// Fonction permettant l'ouverture de la modale en rendant les éléments visibles
  const openModal=function(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
    btnCloseModal.classList.remove('hidden')
  }
  // Fonction permettant de fermer la modale
const closeModal=function(){
    console.log('Buton clicked')
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
  }
  // Le bouton d'ajout d'une image à un gestionnaire d'événements qui remplace le contenu de la modale par un formulaire permettant à l'administrateur d'ajouter une nouvelle oeuvre. Cela inclut la gestion de l'aperçu de l'image, la vérifications des inputs  et la soumission du formulaire
addWorkButton.addEventListener("click", ()=>{
  modal.innerHTML=`
  <header id="modal-header">
		<i class="fa-solid fa-arrow-left" id="arrow"></i>
		<i class="fa-solid fa-xmark"></i>
	</header>
  <form id="add-work-form" method="dialog">
  <div id="image-wrapper">
  <label for="file-upload" class="custom-file-upload">
    <i class="fa-regular fa-image"></i>
    <span id="add-pic">+ Ajouter photo</span>
  </label>
  <input id="file-upload" type="file" accept="image/*/png" name="image" required />
  <img src="assets/icons/empty.png" alt="" id="image-preview" />
  <p id="format-image">jpg, png : 4mo max</p>
  </div>
  <label for="titre" id="Titre"> Titre :</label>
  <input type="text" name="title" required id="titre" />
  <label for="catégorie" id="cat"> Catégorie : </label>
  <select name="category" required id="catégorie">
  <option value="">Choisisez une catégorie</option>
  <option value="1">Objets</option>
  <option value="2">Appartements</option>
  <option value="3">Hôtels /& restaurants</option>
  </select>
  <hr id="hr2" />
  <button type="submit" id="btn-validate">Valider</button>
</form>
  `
  // La classe ImageUploadForm() gère la logique du formulaire d'ajout d'un work. Elle prend en charge l'aperçu de l'image sélectionnée, la vérification des inputs, et la soumission du formulaire. Les éléments du formulaire, tels que le champ de téléchargement d'image, le titre, la catégorie, etc., sont manipulés ici.
  class ImageUploadForm {
    constructor() {
      this.uploadInput = document.getElementById("file-upload");
      this.imagePreview = document.getElementById("image-preview");
      this.titleInput = document.getElementById("titre");
      this.addWorkForm = document.querySelector("#add-work-form");
      this.categoryInput = document.getElementById("catégorie");
      this.imageInput = document.getElementById("file-upload");
      this.validateButton = document.getElementById("btn-validate");
      this.faImg = document.querySelector(".fa-image");
      this.addPicture = document.querySelector("#add-pic");
      this.formatImage = document.querySelector("#format-image");
      this.arrow= document.querySelector("#arrow")
  
      this.uploadInput.onchange = this.updateImagePreview.bind(this);
      this.titleInput.addEventListener("input", this.checkInputs.bind(this));
      this.categoryInput.addEventListener("input", this.checkInputs.bind(this));
      this.imageInput.addEventListener("input", this.checkInputs.bind(this));
      this.addWorkForm.addEventListener("submit", this.handleSubmit.bind(this));
    }

    // On mets à jour l'aperçu de l'image et on enlève l'affichage des éléments de l'espace gris pour la remplacer par la photo choisie
    updateImagePreview() {
      const image = new FileReader();
      image.onload = (e) => {
        this.imagePreview.src = e.target.result;
        this.faImg.style.display = "none";
        this.addPicture.style.display = "none";
        this.formatImage.style.display = "none";
        this.imagePreview.style.display = "flex";
      };
      image.readAsDataURL(this.uploadInput.files[0]);
    }
  
    // On vérifie la validité du formulaire et on change la couleur du bouton de validation de gris en vert si les données sont corrects
    checkInputs() {
      if (this.titleInput.value && this.categoryInput.value && this.imageInput.value) {
        this.validateButton.style.backgroundColor = "#1d6154";
        this.validateButton.style.border = "#1d6154";
        this.validateButton.style.color = "white";
      } else {
        this.validateButton.style.backgroundColor = "grey";
      }
    }
  
    // Gérer la soumission du formulaire
    async handleSubmit(event) {
      event.preventDefault();
      if (!this.isFormValid()) {
        return;
      }
  // Création d'un tableau avec la récupération des inputs du formulaire
      const formData = new FormData();
      formData.append("image", this.imageInput.files[0]);
      formData.append("title", this.titleInput.value);
      formData.append("category", this.categoryInput.value);
  
      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: formData,
        });
        const data = await response.json();
        dynamicGallery(data);
        adminGallery(data);
        preventCloseModal.style.display = "flex";
        formularModal.reset();
      } catch (error) {
        alert(error.message);
      }
    }
  
    isFormValid() {
      return this.titleInput.value && this.categoryInput.value && this.imageInput.value;
    }
  }
  
  // Crée une instance de la classe ImageUploadForm pour gérer le formulaire
  const imageForm = new ImageUploadForm();
  
  
})
// Gestion de l'ouverture ou de la fermeture de la modale 
    btnCloseModal.addEventListener('click',closeModal)
    btnOpenmodal.addEventListener('click',openModal)
    overlay.addEventListener('click',closeModal)
   
// Cette fonction effectue une requête vers l'api pour récupérer les works et les afficher dans la fenêtre modale. Elle renvoie les données sous forme de tableau
const getWorksAdmin= async()=>{
    try{
        console.log("je me connecte à l'api")
        const response= await fetch("http://localhost:5678/api/works");
        const data= await response.json();
        return data;
    }catch (error){
        console.log(error);
    }
}
// Cette fonction prend un tableau de works et les affiche dans la modale.Elle crée une card par works y compris des options pour supprimer chaque work.
const adminGallery = (cards) => {
  console.log("J'affiche les cards dans la modale");
  const flexModal = document.querySelector("#modalFlex");
  flexModal.innerHTML = "";
  
  cards.forEach((card) => {
      console.log("Je crée les cards de la modale");
      // Gérer le contenu des carte
      const adminCardHTML = `
          <div class="flex-item admin-card" data-id="${card.id}"> 
              <i class="fa fa-trash"></i>
              <img src="${card.imageUrl}" class="flex-item">
              <figcaption class="caption-element">éditer</figcaption>
          </div>
      `;
      const adminCardElement = document.createElement('div');
      adminCardElement.innerHTML = adminCardHTML;

      // Ajoute un gestionnaire d'événements de clic à l'icône "fa fa-trash"
      const trashIcon = adminCardElement.querySelector(".fa-trash");
      trashIcon.addEventListener("click", () => {
          // Obtenez l'ID de la carte à supprimer
          const cardId = card.id;
          
          // Appelez une fonction pour supprimer la carte avec cet ID
          deleteWork(cardId);
      });

      flexModal.appendChild(adminCardElement);
  });
}

getWorksAdmin().then((data)=>{
    adminGallery(data)
})
// Cette fonction permet à l'administrateur de supprimer un work
const deleteWork = async (cardId) => {
  try {
      console.log("Suppression de la carte avec l'ID : " + cardId);
      const response = await fetch(`http://localhost:5678/api/works/${cardId}`, {
          method: 'DELETE',
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          console.log("La carte a été supprimée avec succès.");
          // Rafraîchir la galerie après la suppression
          getWorksAdmin().then((data) => {
              adminGallery(data);
          });
          getWorksUser().then((data)=>{
            dynamicGallery(data);
        });
      } else {
          console.error("Erreur lors de la suppression de la carte.");
      }
  } catch (error) {
      console.error(error);
  }
}


