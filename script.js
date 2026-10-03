// ---------- MENU DATA ----------
var menuItems = [
    {
        id: 1,
        name: "Chicken Zinger Burger",
        price: 199,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 2,
        name: "Veg Zinger Burger",
        price: 169,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500"
    },
    {
        id: 3,
        name: "Double Down Burger",
        price: 259,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
    },
    {
        id: 4,
        name: "8pc Hot & Crispy Bucket",
        price: 599,
        category: "Buckets",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500"
    },
    {
        id: 5,
        name: "5pc Chicken Bucket",
        price: 429,
        category: "Buckets",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500"
    },
    {
        id: 6,
        name: "Popcorn Chicken Large",
        price: 229,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500"
    },
    {
        id: 7,
        name: "Chicken Fries",
        price: 149,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
        id: 8,
        name: "French Fries Large",
        price: 119,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500"
    },
    {
        id: 9,
        name: "Pepsi 500ml",
        price: 60,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500"
    },
    {
        id: 10,
        name: "7UP 500ml",
        price: 60,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500"
    }
];

// Cart array
var cart = [];

// ---------- SHOW MENU ON PAGE LOAD ----------
function showMenu(category) {
    var menuList = document.getElementById("menuList");
    menuList.innerHTML = "";

    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems[i];

        // Skip if filter applied
        if (category !== "All" && item.category !== category) {
            continue;
        }

        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML =
            '<img src="' + item.image + '" alt="' + item.name + '">' +
            '<div class="card-content">' +
                '<h3>' + item.name + '</h3>' +
                '<p class="price">₹' + item.price + '</p>' +
                '<button class="add-btn" onclick="addToCart(' + item.id + ')">Add to Cart</button>' +
            '</div>';

        menuList.appendChild(card);
    }
}

// ---------- CATEGORY FILTER ----------
function showCategory(category, button) {
    var allButtons = document.querySelectorAll(".cat-btn");
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active");
    }
    button.classList.add("active");
    showMenu(category);
}

// ---------- ADD TO CART ----------
function addToCart(id) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
        }
    }

    if (found === false) {
        for (var j = 0; j < menuItems.length; j++) {
            if (menuItems[j].id === id) {
                cart.push({
                    id: menuItems[j].id,
                    name: menuItems[j].name,
                    price: menuItems[j].price,
                    quantity: 1
                });
            }
        }
    }

    updateCart();
    openCart();
}

// ---------- UPDATE CART DISPLAY ----------
function updateCart() {
    var cartBody = document.getElementById("cartBody");
    var cartNumber = document.getElementById("cartNumber");
    var totalPrice = document.getElementById("totalPrice");
    var cartTotalBox = document.getElementById("cartTotalBox");

    var totalItems = 0;
    var totalAmount = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-cart">Cart is empty</p>';
        cartTotalBox.style.display = "none";
        cartNumber.innerHTML = "0";
        return;
    }

    cartBody.innerHTML = "";

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        totalItems = totalItems + item.quantity;
        totalAmount = totalAmount + (item.price * item.quantity);

        var div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML =
            '<div>' +
                '<h4>' + item.name + '</h4>' +
                '<small>₹' + item.price + ' x ' + item.quantity + ' = ₹' + (item.price * item.quantity) + '</small>' +
            '</div>' +
            '<div class="qty-buttons">' +
                '<button onclick="reduceQty(' + item.id + ')">-</button>' +
                '<button onclick="increaseQty(' + item.id + ')">+</button>' +
            '</div>';

        cartBody.appendChild(div);
    }

    cartNumber.innerHTML = totalItems;
    totalPrice.innerHTML = totalAmount;
    cartTotalBox.style.display = "block";
}

// ---------- QUANTITY BUTTONS ----------
function increaseQty(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = cart[i].quantity + 1;
        }
    }
    updateCart();
}

function reduceQty(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = cart[i].quantity - 1;

            // Remove item if quantity becomes 0
            if (cart[i].quantity === 0) {
                cart.splice(i, 1);
            }
        }
    }
    updateCart();
}

// ---------- OPEN / CLOSE CART ----------
function openCart() {
    document.getElementById("cartBox").classList.add("show");
    document.getElementById("overlay").classList.add("show");
}

function closeCart() {
    document.getElementById("cartBox").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

// ---------- CHECKOUT FORM ----------
function showForm() {
    document.getElementById("checkoutForm").classList.add("show");
    document.getElementById("cartBody").style.display = "none";
    document.getElementById("cartTotalBox").style.display = "none";
}

function backToCart() {
    document.getElementById("checkoutForm").classList.remove("show");
    document.getElementById("cartBody").style.display = "block";
    document.getElementById("cartTotalBox").style.display = "block";
}

// ---------- PLACE ORDER ----------
function placeOrder() {
    var name = document.getElementById("customerName").value;
    var phone = document.getElementById("customerPhone").value;
    var address = document.getElementById("customerAddress").value;

    // Simple validation
    if (name === "" || phone === "" || address === "") {
        alert("Please fill all details!");
        return;
    }

    if (phone.length !== 10) {
        alert("Phone number must be 10 digits!");
        return;
    }

    // Calculate total
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        total = total + (cart[i].price * cart[i].quantity);
    }

    // Show success screen
    document.getElementById("successMessage").innerHTML =
        "Thank you <b>" + name + "</b>!<br>Your order of ₹" + total +
        " is placed.<br>Delivering to: " + address;

    document.getElementById("successBox").classList.add("show");
    closeCart();
}

// ---------- START AGAIN ----------
function startAgain() {
    cart = [];
    updateCart();
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("successBox").classList.remove("show");
    backToCart();
    window.scrollTo(0, 0);
}

// ---------- SCROLL TO MENU ----------
function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// ---------- START ----------
showMenu("All");
updateCart();