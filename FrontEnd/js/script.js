
/************************************************
* GESTION DE LA MODALE
*************************************************/
const modal=document.querySelector('.modal');
const flexModal = document.querySelector("#modalFlex");
// On insère du contenu html dans la modale comprenant un en-tête, un titre, un conteneur pour les éléments flex, une ligne horizontale et un pied de page contenant les boutons pour ajouter une photo et supprimer la galerie. 
const innerModal=modal.innerHTML=`
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
</footer>
`
// On sélectionne plusieurs éléments du DOM: la fenêtre modale, l'élément de superposition, le bouton de fermeture et le bouton d'ouverture de la modale, le conteneur flex et le bouton "Ajouter une photos"
const overlay=document.querySelector('.overlay');
const btnCloseModal=document.querySelector('.fa-xmark');
const btnOpenmodal=document.querySelector('.btnModifyWorks');
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
    trashIcon.addEventListener("click", (e) => {
      e.preventDefault;
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
     
   new WorksGallery()
    } else {
        console.error("Erreur lors de la suppression de la carte.");
    }
  } catch (error) {
    console.error(error);
  }
  }
// Le bouton d'ajout d'une image à un gestionnaire d'événements qui remplace le contenu de la modale par un formulaire permettant à l'administrateur d'ajouter une nouvelle oeuvre. Cela inclut la gestion de l'aperçu de l'image, la vérifications des inputs  et la soumission du formulaire
addWorkButton.addEventListener("click", ()=>{
  const flexModal = document.querySelector("#modalFlex");
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
// On permet à la deuxième modale de se fermer au click sur la croix
const btnCloseModal = document.querySelector('.fa-xmark');
btnCloseModal.addEventListener('click', () => {
  closeModal();
});
// La classe ImageUploadForm() gère la logique du formulaire d'ajout d'un work. Elle prend en charge l'aperçu de l'image sélectionnée, la vérification des inputs, et la soumission du formulaire. Les éléments du formulaire, tels que le champ de téléchargement d'image, le titre, la catégorie, etc., sont manipulés ici.
class ImageUploadForm {
  constructor() {
    // Le constructeur est la méthode appelé lorsqu'on crée une instance de la classe. On sélectionne dans ce constructeur les différents éléments du formulaire et on les enregistre en tant qu'attribut pour pouvoir les manipuler par la suite.
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
   // on attache des écouteurs d'événements sur les inputs qui se déclenche quand l'admin saisie qqch et on appelle la méthode checkInputs pour vérifier la validité de l'input ou du formulaire en entier
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
  
  // Gérer la soumission du formulaire et vérifier que le formulaire est valide
  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return;
    }
  // Si il est valide Création d'un tableau avec la récupération des inputs du formulaire
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
      new WorksGallery()
      this.imageInput.value = "";
      this.imagePreview.style.display = "none";
      this.faImg.style.display = "flex";
      this.addPicture.style.display = "flex";
      this.formatImage.style.display = "flex";
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

