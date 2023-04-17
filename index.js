//lista de productos
const productsData = [
    {
		id: 1,
		name: "Focaccia Perugia",
		price: 600,
		category: "Destacados",
        description: "Tomates Cherrys y Alcachofas.",
		img: "./assets/focaccia 1-14564802.jpg",
	},
	{
		id: 2,
		name: "Focaccia Lecce",
		price: 650,
		category: "Vegano",
        description: "Cebolla Caramelizada y Tomillo.",
		img: "./assets/focaccia 2-12335533.jpg",
	},
    {
		id: 3,
		name: "Focaccia Nápoles",
		price: 750,
		category: "Nuevos",
        description:"Cherrys, Alcachofas y Cebolla Morada.",
		img: "./assets/focaccia 7.jpg",
	},
    {
		id: 4,
		name: "Focaccia Venecia",
		price: 500,
		category: "Vegetariano",
        description:"Cherrys, Aceitunas Verdes y Romero.",
		img:"./assets/focaccia 8.jpg",
	},
    {
		id: 5,
		name: "Focaccia Trieste",
		price: 550,
		category: "Vegano",
        description:"Aceitunas Negras, Tomillo y Romero.",
		img: "./assets/focaccia 10.jpg",
	},
    {
		id: 6,
		name: "Focaccia Roma",
		price: 700,
		category: "Vegetariano",
        description: "Cebolla Caramelizada, Mozzarella y Albaca.",
		img: "./assets/focaccia 15.jpg",
	},
    {
		id: 7,
		name: "Focaccia Génova",
		price: 650,
		category: "Destacados",
        description: "Mix de Cherrys y Cebolla Morada.",
		img: "./assets/focaccia 6.webp",
	},
    {
		id: 8,
		name: "Focaccia Palermo",
		price: 750,
		category: "Nuevos",
        description: "Camarones, Jamón, Zuccini y Pesto.",
		img: "./assets/focaccia 17.jpg",
	},
    {
		id: 9,
		name: "Focaccia Pompeya",
		price: 750,
		category: "Destacados",
        description: "Higos, Queso Azul, Miel y Albaca.",
		img: "./assets/focaccia 18.jpg",
	},
    {
		id: 10,
		name: "Focaccia Clasica",
		price: 500,
		category: "Vegano",
        description: "Aceite de oliva, Sal Gruesa y Romero.",
		img: "./assets/focaccia 6.jpg",
	},
    {
		id: 11,
		name: "Dip 1",
		price: 150,
		category: "Dips",
        description: "Aceite de Oliva y Aceto Balsamico.",
		img: "./assets/aceites.jpg",
	},
    {
		id: 12,
		name: "Dip 2",
		price: 100,
		category: "Dips",
        description: "Aceite de Oliva con Romero y Tomillo.",
		img: "./assets/aceites 2.jpg",
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

const cart__btn = document.querySelector(".cart__btn");
//carrito menu
const cart__menu = document.querySelector(".cart");
// abrir y cerrar menu
const btn__bar = document.querySelector(".menu__label");
//menu
const bars__menu = document.querySelector (".navbar__list");

const productsCarrito = document.querySelector(".cart__container");

const total = document.querySelector (".total");

const deleteBtn = document.querySelector(".btn__delete");
const buyBtn = document.querySelector(".btn__buy");

//addmodal
const successModal = document.querySelector(".add__modal");

//probando otra forma de armar el carrito
const openPanelBtn = document.getElementById("open-panel");
const closePanelBtn = document.getElementById("close-panel");
const cartPanel = document.querySelector (".cart");


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const renderProduct = (product) => {
	const {id, name, price, description, img } = product;
	return `
		<div class="product" data-aos="fade-down">
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
			    data-price="${price}"
			    data-img="${img}"
				data-description="${description}"
		             > Añadir al carrito <i class="fa-solid fa-cart-plus"></i>
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
	if (cart__menu.classList.contains
		("open-cart")) {
			cart__menu.classList.remove
			("open-cart")
			return;
		}
		overlay.classList.toggle
		("show-overley");
};

const toggleCart = () =>{
	cart__menu.classList.toggle("open-cart");
	if (bars__menu.classList.contains("open-menu")) {
		bars__menu.classList.remove
		("open-menu");
		return;
	}
	overlay.classList.toggle
	("show-overley");
};

const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar__links")) {
		return;
	}
	bars__menu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
	if (
		!bars__menu.classList.contains
		("open-menu") && 
		!cart__menu.classList.contains
		("open-cart")
		) {
		return;
	}
	bars__menu.classList.remove("open-menu");
	cart__menu.classList.remove("open-cart");
	overlay.classList.remove
	("show-overley");
};

//probando otra forma de armar el carrito
openPanelBtn.onclick = () => {
	cartPanel.classList.add("open");
	openPanelBtn.classList.add("hide");
	bars__menu.classList.remove("open-menu");
};

closePanelBtn.onclick = () => {
	cartPanel.classList.remove("open");
	openPanelBtn.classList.remove("hide");
};

const renderCarritoProduct = (carritoProduct) => {
	const {id, name, img, quantity, price} = carritoProduct;
	return `
	<div class="cart__item">
		<img src="${img}" alt="">
		<div class="item__data">
			<h3 class="item__title">${name}</h3>
			<span class="item__price">$ ${price}</span>
		</div>
		<div class="item__quantity__controller">
			<span class="quantity__controller__down" data-id=${id}>-</span>
			<span class="item__quantity">${quantity}</span>
			<span class="quantity__controller__up" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderCarrito = () => {
	if (!cart.length) {
		productsCarrito.innerHTML = `<p class= "empty__msg"> No hay productos en tu carrito.</p>`;
		return;
	}
	productsCarrito.innerHTML = cart.map(renderCarritoProduct).join("");
};

const getCarritoTotal = () => {
	return cart.reduce((acc, cur) => {
		return acc + Number(cur.price) * cur.quantity;
	}, 0);
};

const showTotal = () => {
	total.innerHTML = `${getCarritoTotal()} $`;
};

const disableBtn = (btn) => {
	if(!cart.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCarrito();
	showTotal();
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
};

const addCartProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) {
		return;
	}
	const {id, name, price, img} = e.target.dataset;

	const product = productData (id, name, price, img);

	if (cartProductExists(product)) {
		addUnittoProduct(product);
	} else {
		createProductCart(product);
	}

	checkCartState();
};

const productData = (id, name, price, img) => {
	return {id, name, price, img};
};

const cartProductExists = (product) => {
	return cart.find((item) => {
		return item.id === product.id;
	});
};

const addUnittoProduct = (product) =>{
	cart = cart.map((carritoProduct) => {
		return carritoProduct.id === product.id 
		? {...carritoProduct, quantity: carritoProduct.
			quantity +1} 
			: carritoProduct;
	});
};

const createProductCart = (product) =>{
	cart = [
		...cart,
		{
			...product,
			quantity: 1,
		},
	];
};


const quantityControllerDownBtn = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	if (existingCartProduct.quantity === 1) {
		if (window.confirm ("¿Desea eliminar el producto del carrito?")) 
		{
			removeProductfromCart(existingCartProduct);
		}
		return;
	}
	removeProductUnit(existingCartProduct);
};

const removeProductfromCart = (existingProduct) => {
	cart = cart.filter ((product) => product.id !== 
	existingProduct.id);
	checkCartState();
};

const removeProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id ?
		 {...product, quantity: Number(product.quantity) - 1}
		  : product;
	});
};

const quantityControllerUpBtn = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	addUnittoProduct(existingCartProduct);
};

const quantityController = (e) => {
	if (e.target.classList.contains("quantity__controller__down")) {
		quantityControllerDownBtn(e.target.dataset.id)
	} else if (e.target.classList.contains("quantity__controller__up")) {
		quantityControllerUpBtn(e.target.dataset.id)
	}
	checkCartState();
};

const vaciamosCartItems = () => {
	cart = [];
	checkCartState();
};

const validacionCartAction = (confirmMsg, successMsg) =>{
	if(!cart.length) return;

	if (window.confirm(confirmMsg)) {
		vaciamosCartItems();
		alert(successMsg);
	}
};

const buyComplete = () => {
	validacionCartAction("¿Desea finalizar su compra?",
	"¡Gracias por su compra!");
};

const deleteCart = () =>{
	validacionCartAction("¿Desea vaciar su carrito?",
	"Su carrito se vacio con exito!");
};


//  modal add
const showSuccessModal = (msg) => {
	successModal.classList.add("active__modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active__modal");
	}, 1500);
};

const init = () => {
    renderProducts();
    categories.addEventListener("click",applyFilter);
    btn__load.addEventListener ("click",showMoreProducts);
	btn__bar.addEventListener("click",toggleMenu);
	cart__btn.addEventListener("click",toggleCart);
	bars__menu.addEventListener("click", closeOnClick);
	window.addEventListener("scroll", closeOnScroll);
	document.addEventListener("DOMContentLoaded", renderCarrito);
	document.addEventListener("DOMContentLoaded", showTotal);
	products.addEventListener("click", addCartProduct);
	productsCarrito.addEventListener("click", quantityController);
	buyBtn.addEventListener("click", buyComplete);
	deleteBtn.addEventListener("click", deleteCart);
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
};

init();