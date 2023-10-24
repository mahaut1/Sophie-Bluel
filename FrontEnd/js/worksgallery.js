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