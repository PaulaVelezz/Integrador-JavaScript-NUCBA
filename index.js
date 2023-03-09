//lista de productos
const productsData = [
    {
		id: 1,
		name: "Focaccia Perugia",
		price: 600,
		category: "Destacados",
        description: "Tomates Cherrys y Alcachofas.",
		img: "assets/focaccia 1-14564802.jpg",
	},
	{
		id: 2,
		name: "Focaccia Lecce",
		price: 650,
		category: "Vegano",
        description: "Cebolla Caramelizada y Tomillo.",
		img: "assets/focaccia 2-12335533.jpg",
	},
    {
		id: 3,
		name: "Focaccia Nápoles",
		price: 750,
		category: "Nuevos",
        description:"Cherrys, Alcachofas y Cebolla Morada.",
		img: "assets/focaccia 7.jpg",
	},
    {
		id: 4,
		name: "Focaccia Venecia",
		price: 500,
		category: "Vegetariano",
        description:"Cherrys, Aceitunas Verdes y Romero.",
		img:"assets/focaccia 8.jpg",
	},
    {
		id: 5,
		name: "Focaccia Trieste",
		price: 550,
		category: "Vegano",
        description:"Aceitunas Negras, Tomillo y Romero.",
		img: "assets/focaccia 10.jpg",
	},
    {
		id: 6,
		name: "Focaccia Roma",
		price: 700,
		category: "Vegetariano",
        description: "Cebolla Caramelizada, Mozzarella y Albaca.",
		img: "assets/focaccia 15.jpg",
	},
    {
		id: 7,
		name: "Focaccia Génova",
		price: 650,
		category: "Destacados",
        description: "Mix de Cherrys y Cebolla Morada.",
		img: "assets/focaccia 6.webp",
	},
    {
		id: 8,
		name: "Focaccia Palermo",
		price: 750,
		category: "Nuevos",
        description: "Camarones, Jamón, Zuccini y Pesto.",
		img: "assets/focaccia 17.jpg",
	},
    {
		id: 9,
		name: "Focaccia Pompeya",
		price: 750,
		category: "Destacados",
        description: "Higos, Queso Azul, Miel y Albaca.",
		img: "assets/focaccia 18.jpg",
	},
    {
		id: 10,
		name: "Focaccia Clasica",
		price: 500,
		category: "Vegano",
        description: "Aceite de oliva, Sal Gruesa y Romero.",
		img: "assets/focaccia 6.jpg",
	},
    {
		id: 11,
		name: "Dip 1",
		price: 150,
		category: "Dips",
        description: "Aceite de Oliva y Aceto Balsamico.",
		img: "assets/aceites.jpg",
	},
    {
		id: 12,
		name: "Dip 2",
		price: 100,
		category: "Dips",
        description: "Aceite de Oliva con Romero y Tomillo.",
		img: "assets/aceites 2.jpg",
	},
]
// division de cards
const splitProducts = (size) => {
	let dividedProducts = [];

	for (let i = 0; i < productsData.length; i += size) {
		dividedProducts.push(productsData.slice(i, i + size));
	}
	return dividedProducts;
};

const productsController = {
	dividedProducts: splitProducts(3),
	nextProductsIndex: 1,
	productsLimit: splitProducts(3).length,
};

// Contenedor de productos
const products = document.querySelector(".products-container");
// contenedor de las categorías
const categories = document.querySelector(".categories");
// Un htmlCollection de botones de todas las categorías (mostrar el dataset)
const categoriesList = document.querySelectorAll(".category");
// Botón de ver más
const btn__load = document.querySelector(".btn__load");

// abrir y cerrar menu
const btn__bar = document.querySelector(".menu__label");
//menu
const bars__menu = document.querySelector (".navbar__list");


const renderProduct = (product) => {
	const {id, name, price, description, img } = product;
	return `
		<div class="product">
			<img src="${img}">
			<div class="product__info">
            	<h3>${name}</h3>
            	<p>${description}</p> 
            	<p>$ ${price}</p>
			</div>
            	<button 
				class="btn-add",
				data-id="${id}"
				data-name="${name}"
			    data-price="${price}
			    data-img="${img}"
				data-description="${description}"
		             > Agregar <i class="fa-solid fa-cart-plus"></i>
				</button>            
    	</div>  
    `;
};

const renderDividedProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
};

const renderFilteredProducts = (category) => {
	const productsList = productsData.filter((product) => {
		return product.category === category;
	});
	products.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (index = 0, category = undefined) => {
	if (!category) {
		renderDividedProducts(index);
		return;
	}
	renderFilteredProducts(category);
};

const changeShowMoreBtnState = (category) => {
	if (!category) {
		btn__load.classList.remove("hidden");
		return;
	}
	btn__load.classList.add("hidden");
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove("active");
			return;
		}
		categoryBtn.classList.add("active");
	});
};

const changeFilterState = (e) => {
	const selectedCategory = e.target.dataset.category;
	changeShowMoreBtnState(selectedCategory);
	changeBtnActiveState(selectedCategory);
};

const applyFilter = (e) => {
	if (!e.target.classList.contains("category")) {
		return;
	} else {
		changeFilterState(e);
	}
	if (!e.target.dataset.category) {
		products.innerHTML = "";
		renderProducts();
	} else {
		renderProducts(0, e.target.dataset.category);
		productsController.nextProductsIndex = 0;
	}
};

const isLastIndexOf = () => {
	return (
		productsController.nextProductsIndex === productsController.productsLimit
	);
};
const showMoreProducts = () => {
	renderProducts(productsController.nextProductsIndex);
	productsController.nextProductsIndex++;
	if (isLastIndexOf()) {
		btn__load.classList.add("hidden");
	}
};

const toggleMenu = () => {
	bars__menu.classList.toggle("open-menu");
};

const init = () => {
    renderProducts ();
    categories.addEventListener("click",applyFilter);
    btn__load.addEventListener ("click",showMoreProducts);
	btn__bar.addEventListener("click",toggleMenu);
};

init();