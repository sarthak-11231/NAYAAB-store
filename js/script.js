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


function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}


function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add item to cart
function addToCart(button, name, price, image) {
  let cart = getCart();

  cart.push({
    name: String(name),           
    price: Number(price),         
    image: String(image),
    quantity: 1
  });

  saveCart(cart);

  
  const originalText = button.textContent;
  const originalBg = button.style.background;

  button.textContent = "Added ✓";
  button.style.background = "#999";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = originalBg || "#000";
    button.disabled = false;
  }, 1000);
}


function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.length;

  const cartText = document.querySelector(".nav-right a[href='cart.html']");
  if (cartText) {
    cartText.textContent = `CART (${cartCount})`;
  }
}


updateCartCount();



function loadCart() {
  const cart = getCart();
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalDiv = document.getElementById("cartTotal");

  if (!cartItemsDiv || !cartTotalDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalDiv.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    total += Number(item.price);   

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


function removeFromCart(button, index) {
  
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
function clearCart() {
  localStorage.removeItem("cart");
  alert("Thank you! Your cart has been cleared.");
  loadCart();
}



loadCart();



let currentTotal = 0;
let discountApplied = false;

(function showCheckoutTotal() {
  const cart = getCart();
  const totalEl = document.getElementById("checkoutTotal");
  if (!totalEl) return;

  currentTotal = 0;

  cart.forEach(item => {
    currentTotal += Number(item.price);
  });

  
  /*if (currentTotal > 1000) {
    currentTotal = currentTotal * 0.9;
  }*/

  totalEl.textContent = "₹" + Math.round(currentTotal);
})();


function applyCoupon() {
  const input = document.getElementById("couponInput").value.trim();
  const msg = document.getElementById("couponMsg");
  const totalEl = document.getElementById("checkoutTotal");

  if (discountApplied) {
    msg.style.color = "green";
    msg.textContent = "Coupon already applied ✔";
    return;
  }

  if (input === "NAYAAB10") {
    const discount = currentTotal * 0.10;
    currentTotal = currentTotal - discount;

    totalEl.textContent = "₹" + Math.round(currentTotal);
    msg.style.color = "green";
    msg.textContent = "Coupon applied! You saved 10% 🎉";
    discountApplied = true;
  } else {
    msg.style.color = "red";
    msg.textContent = "Invalid coupon code ❌";
  }
}


function makePayment() {
  alert("Payment Successful ✅");
  localStorage.removeItem("cart");
  window.location.href = "product.html";
}

function showPopup(event) {
  event.preventDefault(); 
  alert("thank you for your feedback!");
}

function storeFeedback(event) {
  event.preventDefault();

  const name = document.getElementById("fb-name").value;
  const email = document.getElementById("fb-email").value;
  const phone = document.getElementById("fb-phone").value;
  const message = document.getElementById("fb-message").value;
  const rating = document.querySelector("input[name='rating']:checked").value;

  // Create text content
  const feedbackText =
`----- FEEDBACK -----
Name   : ${name}
Email  : ${email}
Phone  : ${phone}
Rating : ${rating}
Message:
${message}

Date   : ${new Date().toLocaleString()}
---------------------`;

  // Create and download text file
  const blob = new Blob([feedbackText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "feedback.txt";
  link.click();

  alert("Thank you! Feedback saved successfully.");
  event.target.reset();
}

function clearForm() {
  document.getElementById("fb-name").value = "";
  document.getElementById("fb-email").value = "";
  document.getElementById("fb-phone").value = "";
  document.getElementById("fb-message").value = "";

  alert("Thank you for your feedback!");
} 

function toggleOffers() {
  const section = document.getElementById("offersSection");

  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}









