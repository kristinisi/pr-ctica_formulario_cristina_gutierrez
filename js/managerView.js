import {
  newCategoryValidation,
  newDishValidation,
  newRestaurantValidation,
} from "../js/validation.js";

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

  //Creación de shows

  showCategories(categories) {
    this.categories.replaceChildren();
    const container = document.createElement("section");
    container.id = "section-div";
    container.classList.add("row");
    for (const category of categories) {
      this.categories.insertAdjacentHTML(
        "beforeend",
        `<div>
            <a class='categories__enlace' href="#category-list" data-category=${category.category.name}>
            <img src=${category.category.image} alt=${category.category.name}>
              <h4>${category.category.name}</h4>
              
            </a>
          </div>`
      );
      console.log(category.category.image);
    }

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
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.category.name}" class="dropdown-item" href="#productlist">${category.category.name}</a></li>`
      );
    }
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
    container.id = "np-Allergens";
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
    const navRest = document.getElementById("navRest");
    const container = navRest.nextElementSibling;
    container.replaceChildren();
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.restaurant.name}" class="dropdown-item" href="#productlist">${restaurant.restaurant.name}</a></li>`
      );
    }
    // const li = document.createElement("li");
    // li.classList.add("nav-item", "dropdown");
    // li.insertAdjacentHTML(
    //   "beforeend",
    //   `<a class="nav-link dropdown-toggle" href="#" id="navRest" role="button"     data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>`
    // );
    // const container = document.createElement("ul");
    // container.classList.add("dropdown-menu");
    // for (const restaurant of restaurants) {
    //   container.insertAdjacentHTML(
    //     "beforeend",
    //     `<li><a data-restaurant="${restaurant.restaurant.name}" class="dropdown-item" href="#productlist">${restaurant.restaurant.name}</a></li>`
    //   );
    // }
    // li.append(container);
    // this.menu.append(li);
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

  showDishInNewWindow(dish, newWindow) {
    const main = newWindow.document.querySelector("main");
    console.log(main);
    main.replaceChildren();
    let container;
    if (dish) {
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

  showCloseInMenu() {
    const li = document.createElement("li");
    li.insertAdjacentHTML(
      "beforeend",
      `<a class=" href="#" id="navClose" role="button">Cerrar ventanas</a>`
    );
    this.menu.append(li);
  }

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Adminitración</a>'
    );
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear restaurante</a></li>'
    );

    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  showNewCategoryForm() {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    // if (this.categories.children.length > 1)
    //   this.categories.children[1].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nueva categoría</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form id="formulario-cat" name="fNewCategory" role="form" class="row g-3" novalidate> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="ncName">Nombre *</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="ncName" name="ncName" placeholder="Título de categoría" value="" required> 
            <div class="invalid-feedback">El nombre es obligatorio.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="ncImg">Nombre de la imagen *</label> 
          <div class="input-group"> 
            <input type="file" class="form-control" id="ncImg" name="ncImg" placeholder="Nombre con extensión de la imagen" value="" required> 
            <div class="invalid-feedback">La imagen no es válida.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-12 mb-3"> 
          <label class="form-label" for="ncDescription">Descripción</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="" required> 
            <div class="invalid-feedback"></div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="mb-12"> 
          <button class="btn btn-primary" type="submit">Enviar</button> 
          <button class="btn btn-primary" type="reset">Cancelar</button> 
        </div> 
      </form>`
    );
    this.main.append(container);
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> ya está creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveCategoryForm(categories) {
    for (let category of categories) {
    }
    this.main.replaceChildren();
    this.categories.replaceChildren();
    const container = document.createElement("section");
    container.id = "remove-category";
    container.classList.add("row");
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
					<div class='categories__enlace categories-eliminar' href="#category-list" data-category=${category.category.name}>
					<img src=${category.category.image} alt=${category.category.name}>
						<h4>${category.category.name}</h4>
						<p>${category.category.description}</p>
            <button class="btn btn-primary" data-category="${category.category.name}" type='button'>Eliminar</button>
					</div>
				`
      );
    }

    this.categories.appendChild(container);
  }

  showRemoveCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría <strong>${cat.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3">
          <i class="bi bi-exclamation-triangle"></i> La categoría <strong>${cat.name}</strong> no se ha podido borrar.
        </div>`
      );
    }
    messageModal.show();
  }

  showNewDishForm(categories, allergens) {
    this.main.replaceChildren();
    this.categories.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npBrand">Nombre *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="npName" name="npName"
						placeholder="Nombre" value="" required>
					<div class="invalid-feedback">El nombre es oblicatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npModel">Ingredientes *</label>
				<div class="input-group">
					<input type="text" class="form-control" id="npIngredients" name="npIngredients"
						placeholder="Ingredientes" value="" required>
					<div class="invalid-feedback">Los ingredientes son obligatorios.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-12 mb-3"> 
          <label class="form-label" for="npImg">Nombre de la imagen *</label> 
          <div class="input-group"> 
            <input type="file" class="form-control" id="npImg" name="ncpImg" placeholder="Nombre con extensión de la imagen" value="" required> 
            <div class="invalid-feedback">La imagen no es válida.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> `
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npModel">Descripción *</label>
				<div class="input-group">
					<textarea class="form-control" id="npDescription" name="npDescription" rows="4" required></textarea>
					<div class="invalid-feedback"></div>
					<div class="invalid-feedback">El plato debe tener una descripción.</div> 
            <div class="valid-feedback">Correcto.</div> 
				</div>
			</div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
				<label class="form-label" for="npCategories">Categorías *</label>
				<div class="input-group">
					<label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="npCategories" id="npCategories" multiple required>
					</select>
					<div class="invalid-feedback">El plato debe pertenecer al menos a una categoría.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>`
    );

    const npCategories = form.querySelector("#npCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.category.name}">${category.category.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
    		<label class="form-label" for="npAllergens">Alérgenos </label>
    		<div class="input-group">
    			<label class="input-group-text" for="npAllergens"><i class="bi bi-card-checklist"></i></label>
    			<select class="form-select" name="npAllergens" id="npAllergens" multiple>
    			</select>
    			<div class="valid-feedback">Correcto.</div>
    		</div>
    	</div>`
    );

    const np_Allergens = document.getElementById("np-Allergens");
    const npAllergens = form.querySelector("#npAllergens");
    console.log(np_Allergens);
    console.log(allergens);
    for (const allerge of allergens) {
      console.log(allerge);
      console.log(allerge.allerge.name);
      npAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allerge.allerge.name}">${allerge.allerge.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>`
    );

    container.append(form);
    this.main.append(container);
  }

  showNewDishModal(done, dish, error) {
    console.log(dish);
    console.log("---------------------");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato creado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.npName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveDishForm(categories, allergens) {
    this.main.replaceChildren();
    this.categories.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-dish";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fDelDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npCategories">Categorías del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpCategories" id="rpCategories">
						<option disabled selected>Selecciona una categoría</option>
					</select>
				</div>
			</div>`
    );
    const rpCategories = form.querySelector("#rpCategories");
    for (const category of categories) {
      rpCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.category.name}">${category.category.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
				<label class="form-label" for="npAllegens">Alérgenos del producto</label>
				<div class="input-group">
					<label class="input-group-text" for="rpAllergens"><i class="bi bi-card-checklist"></i></label>
					<select class="form-select" name="rpAllergens" id="rpAllergens">
						<option disabled selected>Selecciona un alérgeno</option>
					</select>
				</div>
			</div>`
    );
    const np_Allergens = document.getElementById("np-Allergens");
    const rpAllergens = form.querySelector("#rpAllergens");
    console.log(np_Allergens);
    console.log(allergens);
    for (const allerge of allergens) {
      rpAllergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allerge.allerge.name}">${allerge.allerge.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="dish-list" class="container my-3"><div class="row"></div></div>'
    );

    this.main.append(container);
  }

  showRemoveDishList(dishes) {
    const listContainer = document
      .getElementById("dish-list")
      .querySelector("div.row");
    listContainer.replaceChildren();

    let exist = false;
    for (const dish of dishes) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="card mb-3" style="max-width: 600px;">
              <div class="col-md-12 mb-3">
              <div class="col-md-4">
                <img src="${dish.image}" class="img-fluid rounded-start">
              </div>  
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${dish.name}</h5>
                  <p class="card-text">${dish.description}</p>
                  <p class="card-text"><small class="text-body-secondary">${dish.ingredients}</small></p>
                </div>
              </div>
          </div>
          <div class="bottom-wrap"> <a href="#" data-name="${dish.name}" class="btn btn-primary float-right"> Eliminar </a></div>
        `
      );
    }
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>'
      );
    }
  }

  showRemoveDishModal(done, dish, error) {
    const dishList = document.getElementById("dish-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato no existe en el restaurante.</div>'
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = dishList.querySelector(
          `a.btn[data-name="${dish.name}"]`
        );
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewRestaurantForm() {
    this.categories.replaceChildren();
    this.main.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo restaurante</h1>'
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form id="formulario-res" name="fNewRestaurant" role="form" class="row g-3" novalidate> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="nrName">Nombre *</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="nrName" name="nrName" placeholder="Nombre del restaurante" value="" required> 
            <div class="invalid-feedback">El nombre es obligatorio.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-6 mb-3"> 
          <label class="form-label" for="nrImg">Nombre de la imagen *</label> 
          <div class="input-group"> 
            <input type="file" class="form-control" id="nrImg" name="nrImg" placeholder="Nombre con extensión de la imagen" value="" required> 
            <div class="invalid-feedback">La imagen no es válida.</div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="col-md-12 mb-3"> 
          <label class="form-label" for="nrDescription">Descripción</label> 
          <div class="input-group"> 
            <input type="text" class="form-control" id="nrDescription" name="nrDescription" value="" required> 
            <div class="invalid-feedback"></div> 
            <div class="valid-feedback">Correcto.</div> 
          </div> 
        </div> 
        <div class="mb-12"> 
          <button class="btn btn-primary" type="submit">Enviar</button> 
          <button class="btn btn-primary" type="reset">Cancelar</button> 
        </div> 
      </form>`
    );
    this.main.append(container);
  }

  showNewRestaurantModal(done, res, error) {
    console.log(error);
    console.log(res);
    console.log("...........................");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${res.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El restaurante <strong>${res.name}</strong> ya está creado.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.nrName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  //Creacion de binds
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
    console.log(navCats);
    const links = navCats.nextElementSibling.querySelectorAll("a");
    console.log(links);
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

  bindRestaurantListInMenu(handler) {
    const navRest = document.getElementById("navRest");
    console.log(navRest);
    const links = navRest.nextElementSibling.querySelectorAll("a");
    console.log(links);
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
      newWindow.addEventListener("DOMContentLoaded", () => {
        const dishName = event.target.dataset.name;
        handler(dishName, newWindow);
      });
    });
  }

  bindCloseInMenu(handler) {
    const navClose = document.getElementById("navClose");
    navClose.addEventListener("click", (event) => {
      handler(this.dishWindow);
    });
  }

  bindAdminMenu(
    hNewCategory,
    hRemoveCategory,
    hNewDishForm,
    hRemoveDish,
    hNewRestaurant
  ) {
    const newCategoryLink = document.getElementById("lnewCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });
    const delCategoryLink = document.getElementById("ldelCategory");
    delCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });
    const newProductLink = document.getElementById("lnewDish");
    newProductLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewDishForm,
        [],
        "#new-dish",
        { action: "newDish" },
        "#",
        event
      );
    });
    const delProductLink = document.getElementById("ldelDish");
    delProductLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        { action: "removeDish" },
        "#",
        event
      );
    });
    const newRestaurantLink = document.getElementById("lnewRestaurant");
    newRestaurantLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewRestaurant,
        [],
        "#new-restaurant",
        { action: "newRestaurant" },
        "#",
        event
      );
    });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  //creamos el bind para ambos select de borrado
  bindRemoveDishSelects(hCategories, hAllergens) {
    const rpCategories = document.getElementById("rpCategories");
    rpCategories.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-dish",
        {
          action: "removeDishByCategory",
          category: event.currentTarget.value,
        },
        "#remove-dish",
        event
      );
    });
    const rpAllergens = document.getElementById("rpAllergens");
    rpAllergens.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hAllergens,
        [event.currentTarget.value],
        "#remove-dish",
        {
          action: "removeDishByAllergen",
          allergen: event.currentTarget.value,
        },
        "#remove-dish",
        event
      );
    });
  }

  bindRemoveDish(handler) {
    const dishList = document.getElementById("dish-list");
    const buttons = dishList.querySelectorAll("a.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.name);
        event.preventDefault();
      });
    }
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }
}
export default ManagerView;
