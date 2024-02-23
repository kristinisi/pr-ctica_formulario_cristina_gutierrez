const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class ManagerView {
  constructor() {
    this.main = document.getElementById("main");
    this.categories = document.getElementById("categories");
    this.menu = document.querySelector(".barra__style");
    this.dishWindow = new Map();
    this.cont = 0;
  }

  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  //Creamos el bind para los enlaces de inicio

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  showCategories() {
    this.categories.replaceChildren();
    const container = document.createElement("section");
    container.id = "section-div";
    this.categories.insertAdjacentHTML(
      "beforeend",
      `<div>
        <a class='categories__enlace' href="#category-list" data-category="Moluscos">
        <img src="./img/_calamar.png" alt="Categoría Moluscos y Cefalopodos">
          <h4>Moluscos y Cefalópodos</h4>
        </a>
      </div>
      <div>
          <a class='categories__enlace' href="#category-list" data-category="Crustaceos">
              <img src="./img/_langosta.png" alt="Categoría Crustaceos">
              <h4>Crustáceos</h4>
          </a>
      </div>
      <div>
          <a class='categories__enlace' href="#category-list" data-category="Pescados">
              <img src="./img/_pez.png" alt="Categoría Pescados">
              <h4>Pescados</h4>
          </a>
      </div>`
    );
    this.categories.appendChild(container);
  }
  showRandomDishes(dishes) {
    this.main.replaceChildren();
    const container = document.createElement("section");
    container.id = "random-dishes";
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="miniSeparador"></div>
        <h3 class="tit">Algunos de nuestros platos...</h3>
      `
    );

    for (const dish of dishes) {
      const div = document.createElement("div");
      div.insertAdjacentHTML(
        "beforeend",
        `
        <div class="plato plato2">
              <img src="${dish.image}">
        </div>`
      );
      container.append(div);
    }
    this.main.appendChild(container);
  }

  showCategoriesInMenu(categories) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.category.name}" class="dropdown-item" href="#productlist">${category.category.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showAllergensInMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navAller" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.allerge.name}" class="dropdown-item" href="#productlist">${allergen.allerge.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showMenuInMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navMenu" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Menús</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#productlist">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  showRestaurantsInMenu(restaurants) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class="nav-link dropdown-toggle" href="#" id="navRest" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.restaurant.name}" class="dropdown-item" href="#productlist">${restaurant.restaurant.name}</a></li>`
      );
    }
    li.append(container);
    this.menu.append(li);
  }

  listDishes(dishes, name, pageTitle) {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    this.main.classList.add("cambiar--fondo");

    const nav = document.createElement("nav");
    nav.id = "migas";
    nav.ariaLabel = "breadcrumbs";
    nav.insertAdjacentHTML(
      "beforeend",
      `
      <ol class="breadcrumb">
       <li class="breadcrumb-item">Inicio</li>
       <li class="breadcrumb-item">${pageTitle}</li>
       <li class="breadcrumb-item active">${name}</li>
      </ol>
      `
    );

    const container = document.createElement("div");
    container.id = "dishes-list";
    container.insertAdjacentHTML(
      "beforeend",
      '<section class="row seccion__plato"></section>'
    );

    for (const dish of dishes) {
      const div = document.createElement("div");
      div.insertAdjacentHTML(
        "beforeend",
        `
        <div class="miniSeparador"></div>
        <div class="plato">
              <a class='imagen' data-name='${dish.name}'>
                <img src="${dish.image}" style="cursor: pointer">
              </a>
              <h4>${dish.name}</h4>
              <p>${dish.description}</p>
          </div>`
      );
      container.children[0].append(div);
    }
    this.main.append(nav);
    container.insertAdjacentHTML("afterbegin", `<h1>${name}</h1>`);
    this.main.append(container);
  }

  //Dos métodos que enlazan el manejador con los elementos de la pagina categoria
  bindDishesCategoryList(handler) {
    const categoryList = document.getElementById("categories");
    const links = categoryList.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#category-list",
          { action: "dishesCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindDishesCategoryListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#category-list",
          { action: "dishesCategoryList", category },
          "#category-list",
          event
        );
      });
    }
  }

  bindDishesAlleregnListInMenu(handler) {
    const navAller = document.getElementById("navAller");
    const links = navAller.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          "#navAller",
          { action: "dishesAllergenList", allergen },
          "#",
          event
        );
      });
    }
  }

  bindDishesMenuListInMenu(handler) {
    const navMenu = document.getElementById("navMenu");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          "#navMenu",
          { action: "dishesMenuList", menu },
          "#",
          event
        );
      });
    }
  }

  showDish(dish) {
    const nav = document.querySelector(".breadcrumb");
    nav.id = "migas_plato";
    const ultimoLi = nav.querySelector(".active");
    ultimoLi.classList.remove("active");
    const li = document.createElement("li");
    li.classList.add("breadcrumb-item", "active");
    li.textContent = "Plato";
    nav.insertAdjacentElement("beforeend", li);

    this.categories.replaceChildren();
    this.main.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container");

    if (dish) {
      container.id = "single-dish";
      const ingredientsList = dish.ingredients.join(", ");
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${dish.image}" class="img-fluid rounded-start">
            </div>  
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${dish.name}</h5>
                <p class="card-text">${dish.description}</p>
                <p class="card-text"><small class="text-body-secondary">${ingredientsList}</small></p>
              </div>
            </div>
          </div>
        </div>
        `
      );
    }
    const bDish = document.createElement("button");
    bDish.id = "btn";
    bDish.dataset.name = dish.name;
    bDish.innerHTML = "Abrir plato en una nueva ventana";

    this.main.append(nav);
    this.main.append(container);
    this.main.append(bDish);
  }

  bindDishClick(handler) {
    const dishlist = document.getElementById("dishes-list");
    const links = dishlist.querySelectorAll("a.imagen");

    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { name } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [name],
          "#single-dish",
          { action: "dish", name },
          "#single-dish",
          event
        );
      });
    }
  }

  showRestaurant(restaurant, name) {
    this.categories.replaceChildren();
    this.main.replaceChildren();

    const nav = document.createElement("nav");
    nav.id = "migas_restaurante";
    nav.ariaLabel = "breadcrumbs";
    nav.insertAdjacentHTML(
      "beforeend",
      `
      <ol class="breadcrumb">
       <li class="breadcrumb-item">Inicio</li>
       <li class="breadcrumb-item">Restaurantes</li>
       <li class="breadcrumb-item active">${name}</li>
      </ol>
      `
    );

    const container = document.createElement("div");
    container.classList.add("container");
    if (restaurant) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card text-bg-dark">
          <img src="${restaurant.restaurant.image}" class="card-img">
          <div class="card-img-overlay">
            <h5 class="card-title">${restaurant.restaurant.name}</h5>
            <p class="card-text">${restaurant.restaurant.description}</p>
          </div>
        </div>
        `
      );
    }
    this.main.append(nav);
    this.main.append(container);
  }

  bindRestaurantListInMenu(handler) {
    const navMenu = document.getElementById("navRest");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.restaurant);

        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          "#restaurant",
          { action: "restaurant", restaurant },
          "#",
          event
        );
      });
    }
  }

  showDishInNewWindow(dish, newWindow) {
    const main = newWindow.document.querySelector("main");
    console.log(main);
    main.replaceChildren();
    let container;
    if (dish) {
      console.log(newWindow);
      newWindow.document.title = `${dish.name}`;
      container = newWindow.document.createElement("div");
      container.classList.add("container");
      container.id = "single-dish";
      const ingredientsList = dish.ingredients.join(", ");
      container.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${dish.image}" class="img-fluid rounded-start">
          </div>  
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${dish.name}</h5>
              <p class="card-text">${dish.description}</p>
              <p class="card-text"><small class="text-body-secondary">${ingredientsList}</small></p>
            </div>
          </div>
        </div>
      </div>
      `
      );
    }
    main.append(container);
  }

  bindShowDishInNewWindow(handler) {
    const bOpen = document.getElementById("btn");
    bOpen.addEventListener("click", (event) => {
      let windowName = `DishWindow${this.cont}`;

      // Abrir la página en una nueva ventana
      let newWindow = window.open(
        "plato.html",
        windowName,
        "width=800, height=330, top=250, left=350, titlebar=yes, toolbar=no, menubar=no, location=no"
      );

      // Verificar si se pudo abrir la ventana
      if (newWindow) {
        this.dishWindow.set(windowName, newWindow); // Agregar la ventana al mapa
        this.cont++;
        console.log(this.dishWindow);
      }

      // Agregar un listener para el evento DOMContentLoaded
      console.log(newWindow);
      newWindow.addEventListener("DOMContentLoaded", () => {
        const dishName = event.target.dataset.name;
        handler(dishName, newWindow);
      });
    });
  }

  showCloseInMenu() {
    const li = document.createElement("li");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class=" href="#" id="navClose" role="button">Cerrar ventanas</a>`
    );
    this.menu.append(li);
  }

  bindCloseInMenu(handler) {
    const navClose = document.getElementById("navClose");
    navClose.addEventListener("click", (event) => {
      handler(this.dishWindow);
    });
  }
}
export default ManagerView;
