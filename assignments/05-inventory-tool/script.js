
let products = [
    {
        name: "Volleyball Shoes",
        price: 89.99,
        description: "Lightweight shoes designed for quick movement on the court.",
        image: "shoes.jfif",
        category: "shoes",
        selected: false

    },

    {
        name: "Knee pads",
        price: 24.99,
        description: "Protective knee pads for diving and playing on hard courts.",
        image: "kneepads.webp",
        category: "protection",
        selected: false

    },

    {
        name: "Volleyball",
        price: 39.99,
        description: "A durable indoor volleyball for practices and games.",
        image: "volleyball.webp",
        category: "equipment",
        selected: false
    },

    {
        name: "Water Bottle",
        price: 14.99,
        description: "Large reusable water bottle for practices and workouts.",
        image: "waterbottle.webp",
        category: "accessories",
        selected: false
    },

    {
        name: "Gym Bag",
        price: 44.99,
        description: "Spacious bag for shoes, clothes, and volleyball equipment.",
        image: "gymbag.jfif",
        category: "accessories",
        selected: false
    },

    {
        name: "Training Hoodie",
        price: 49.99,
        description: "Comfortable hoodie for warmups and traveling to games.",
        image: "hoodie.webp",
        category: "clothing",
        selected: false

    }
]

let starterProducts = JSON.parse(JSON.stringify(products));
let localStorageKey = "storeProducts";
let savedProducts = localStorage.getItem(localStorageKey);

if (savedProducts != null) {
    products = JSON.parse(savedProducts);
}

let cart = [];

function updateSelectedButton() {
    let selectedProducts = products.filter(function(product) {
        return product.selected;
    });

    let selectedButton = document.querySelector("#selectedButton");

    if (selectedProducts.length == 0) {
        selectedButton.disabled = true;
        selectedButton.innerHTML = "Add Selected to Cart";
    } else {
        selectedButton.disabled = false;
        selectedButton.innerHTML = "Add " + selectedProducts.length + " Items to Cart";
    }
}

let selectedButton = document.querySelector("#selectedButton");

selectedButton.addEventListener("click", function() {
    let selectedProducts = products.filter(function(product) {
        return product.selected;
    });

    for (let i=0; i< selectedProducts.length; i++) {
        cart.push(selectedProducts[i]);
    }

    for (let i= 0; i < selectedProducts.length; i++) {
        selectedProducts[i].selected = false;
    }
    renderCart();
    renderProducts();
    updateSelectedButton();
});

function renderProduct(product) {
    let card = document.createElement("div");

    let image = document.createElement("img");
    image.src = product.image;
    card.append(image);

    let name = document.createElement("h2");
    name.innerHTML = product.name;
    card.append(name);

    let price = document.createElement("p");
    price.innerHTML = "$" + product.price;
    card.append(price);

    let description = document.createElement("p");
    description.innerHTML = product.description;
    card.append(description);
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", function() {
        product.selected = checkbox.checked;
        
        if (checkbox.checked) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
        updateSelectedButton();
    });
    card.append(checkbox);

    let button = document.createElement("button");
    button.innerHTML = "Add to Cart";

    button.addEventListener("click", function() {
        cart.push(product);
        renderCart();
    });
    card.append(button);
    

    document.querySelector("#productsDiv").append(card);
}

function renderCart() {
    let cartDiv = document.querySelector("#cartDiv");
    cartDiv.innerHTML = "";

    let title = document.createElement("h2");
    title.innerHTML = "Cart";
    cartDiv.append(title);

    for (let i = 0; i < cart.length; i ++) {
        let item = document.createElement("p");
        item.innerHTML = cart[i].name + " - $" + cart[i].price;
        cartDiv.append(item);
    }

    let prices = cart.map(function(product) {
        return product.price;
    });
    let total = 0;
    for (let i = 0; i < prices.length; i++){
        total = total + prices[i];
    }
    
    let totalText = document.createElement("p");
    totalText.innerHTML = "Total: $" + total + " (" + cart.length + " items).";
    cartDiv.append(totalText);
}

function renderProducts() {
    let productsDiv = document.querySelector("#productsDiv");
    productsDiv.innerHTML = "";

    products.forEach(renderProduct);
}

let categoryFilter = document.querySelector("#categoryFilter");
categoryFilter.addEventListener("change", function() {
    let selectedCategory = categoryFilter.value;
    let filteredProducts;
    if (selectedCategory == "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(function(product) {
            return product.category == selectedCategory;
        });
    }

    let productsDiv = document.querySelector("#productsDiv");
    productsDiv.innerHTML = "";

    filteredProducts.forEach(renderProduct);
});

let sortSelect = document.querySelector("#sortSelect");

sortSelect.addEventListener("change", function() {
    let sortedProducts = products;
    if (sortSelect.value == "priceLow"){
        sortedProducts.sort(function(a,b) {
            return a.price - b.price;
        });
    } else if (sortSelect.value == "priceHigh") {
        sortedProducts.sort(function(a,b) {
            return b.price - a.price;
        });
    }

    let productsDiv = document.querySelector("#productsDiv");
    productsDiv.innerHTML = "";

    sortedProducts.forEach(renderProduct);
})

renderProducts();

let productForm = document.querySelector("#productForm");
let nameInput = document.querySelector("#nameInput");
let priceInput = document.querySelector("#priceInput");
let descriptionInput = document.querySelector("#descriptionInput")
let categoryInput = document.querySelector("#categoryInput");
let imageInput = document.querySelector("#imageInput");
let formMessage = document.querySelector("#formMessage");


productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let newProduct = {
        name: nameInput.value,
        price: Number(priceInput.value),
        description: descriptionInput.value,
        image: imageInput.value,
        category: categoryInput.value,
        selected: false
    };

    let existingProducts = products.filter(function(product) {
        return product.name.toLowerCase() == newProduct.name.toLowerCase();
    });

    if (existingProducts.length > 0) {
        formMessage.innerHTML = "A product with this name already exists.";
    } else {
        products.push(newProduct);
        localStorage.setItem(localStorageKey, JSON.stringify(products));
        renderProducts();
        productForm.reset();
        formMessage.innerHTML = "";
    }
});

let resetButton = document.querySelector("#resetButton");

resetButton.addEventListener("click", function() {
    localStorage.removeItem(localStorageKey);
    products = JSON.parse(JSON.stringify(starterProducts));
    renderProducts();
});