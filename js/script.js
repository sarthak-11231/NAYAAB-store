const products = [
  {
    name: "Black Stud Earrings",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61yZ1ZK0H9L._AC_UL320_.jpg",
    description: "Stylish black stud earrings for men",
    category: "Earrings"
  },
  {
    name: "Silver Ring",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61oQX9m8F9L._AC_UL320_.jpg",
    description: "Premium silver ring for men",
    category: "Rings"
  },
  {
    name: "Leather Strap Watch",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/71KQ6+3zGWL._AC_UL320_.jpg",
    description: "Classic leather strap watch for men",
    category: "Watches"
  }
];

// Show products only on product.html
if (document.getElementById("product-list")) {
  const container = document.getElementById("product-list");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">₹${product.price}</p>
      <p><strong>${product.category}</strong></p>
    `;

    container.appendChild(card);
  });
}

function makePayment() {
  alert("Payment Successful ✅ (Demo)");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

function changeImg(mainId, imgPath) {
  document.getElementById(mainId).src = imgPath;
}

function openModal(imgSrc) {
  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("imgModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("imgModal").style.display = "none";
}

// =========================
// ADD TO CART LOGIC
// =========================

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add item to cart
function addToCart(button, name, price, image) {
  let cart = getCart();

  cart.push({
    name: name,
    price: price,
    image: image,
    quantity: 1
  });

  saveCart(cart);

  // Button feedback animation
  const originalText = button.textContent;
  const originalBg = button.style.background;

  button.textContent = "Added ✓";
  button.style.background = "#999"; // gray
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = originalBg || "#000";
    button.disabled = false;
  }, 1000);
}


// Update cart count in navbar
function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.length;

  const cartText = document.querySelector(".nav-right a[href='cart.html']");
  if (cartText) {
    cartText.textContent = `CART (${cartCount})`;
  }
}

// Run on page load
updateCartCount();

// =========================
// CART PAGE LOGIC
// =========================

function loadCart() {
  const cart = getCart();
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalDiv = document.getElementById("cartTotal");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalDiv.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartItemsDiv.innerHTML += `
      <div class="product-card" style="flex-direction:row;gap:20px;margin-bottom:20px;">
        <img src="${item.image}" style="width:120px;height:120px;object-fit:contain;">
        <div style="flex:1;">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <button class="btn" onclick="removeFromCart(this, ${index})">
            Remove
          </button>
        </div>
      </div>
    `;
  });

  cartTotalDiv.textContent = "Total: ₹" + total;
}

// Remove item
function removeFromCart(button, index) {
  // Visual feedback
  const originalText = button.textContent;
  const originalBg = button.style.background;

  button.textContent = "Removed ✕";
  button.style.background = "#999";
  button.disabled = true;

  setTimeout(() => {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCart();
  }, 800);
}


// Load cart on page open
loadCart();

// =========================
// CHECKOUT / PAYMENT LOGIC
// =========================

function makePayment() {
  alert("Payment Successful ✅");

  // Clear cart
  localStorage.removeItem("cart");

  // Redirect to shop
  window.location.href = "product.html";
}

// Show total on checkout page
(function showCheckoutTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalEl = document.getElementById("checkoutTotal");
  if (!totalEl) return;

  let total = 0;
  cart.forEach(item => total += item.price);

  totalEl.textContent = "₹" + total;
})();



