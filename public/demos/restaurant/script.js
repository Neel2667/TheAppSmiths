// Global Configuration & State
let restaurantData = null;
const cart = [];

// DOM Elements
const navTitle = document.getElementById('nav-title');
const heroTitle = document.getElementById('hero-title');
const heroTagline = document.getElementById('hero-tagline');
const aboutContent = document.getElementById('about-content');
const categoryTabs = document.getElementById('category-tabs');
const menuGrid = document.getElementById('menu-grid');
const reviewsGrid = document.getElementById('reviews-grid');
const contactAddress = document.getElementById('contact-address');
const hoursList = document.getElementById('hours-list');
const callLink = document.getElementById('call-link');
const directionsLink = document.getElementById('directions-link');

const cartOverlay = document.getElementById('cart-overlay');
const cartPanel = document.getElementById('cart-panel');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// Fetch and load data
async function loadRestaurantData() {
  try {
    const response = await fetch('./config.json');
    restaurantData = await response.json();
    
    populateSiteInfo();
    renderCategoryTabs();
    renderMenuItems(); // Shows all initially
    renderReviews();
    
  } catch (error) {
    console.error("Error loading restaurant configuration:", error);
  }
}

// Populate generic business info
function populateSiteInfo() {
  document.title = `${restaurantData.restaurantName} | Authentic Italian`;
  navTitle.textContent = restaurantData.restaurantName.split("'")[0] + "'";
  heroTitle.textContent = restaurantData.restaurantName;
  heroTagline.textContent = restaurantData.tagline;
  aboutContent.textContent = restaurantData.aboutText;
  contactAddress.textContent = restaurantData.address;
  
  // Call & directions links
  callLink.href = `tel:${restaurantData.phone.replace(/[^0-9+]/g, '')}`;
  directionsLink.href = restaurantData.mapsLink;
  
  // Hours list
  hoursList.innerHTML = '';
  Object.entries(restaurantData.hours).forEach(([days, hours]) => {
    const row = document.createElement('div');
    row.className = 'hours-row';
    row.innerHTML = `
      <span class="hours-day">${days}</span>
      <span class="hours-time">${hours}</span>
    `;
    hoursList.appendChild(row);
  });
}

// Render tabs dynamically
function renderCategoryTabs() {
  categoryTabs.innerHTML = '';
  
  // Add 'All' tab
  const allBtn = document.createElement('button');
  allBtn.className = 'tab-btn active';
  allBtn.textContent = 'All Specialties';
  allBtn.onclick = () => filterCategory('All', allBtn);
  categoryTabs.appendChild(allBtn);

  // Add individual category tabs
  restaurantData.menu.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = cat.category;
    btn.onclick = () => filterCategory(cat.category, btn);
    categoryTabs.appendChild(btn);
  });
}

// Switch categories and toggle active class
let activeCategory = 'All';
function filterCategory(category, activeBtn) {
  activeCategory = category;
  
  // Update active style
  const buttons = categoryTabs.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
  
  renderMenuItems();
}

// Render menu cards
function renderMenuItems() {
  menuGrid.innerHTML = '';
  
  restaurantData.menu.forEach(cat => {
    // Check if category matches filter
    if (activeCategory !== 'All' && cat.category !== activeCategory) return;
    
    cat.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <div class="menu-card-header">
          <h3>${item.name}</h3>
          <span class="price">$${item.price}</span>
        </div>
        <p class="menu-card-desc">${item.desc}</p>
        <button class="add-to-bag-btn" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
          + Add to Bag
        </button>
      `;
      menuGrid.appendChild(card);
    });
  });
}

// Render client google reviews
function renderReviews() {
  reviewsGrid.innerHTML = '';
  
  restaurantData.reviews.forEach(review => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-author">— ${review.author} (Google Maps Review)</div>
    `;
    reviewsGrid.appendChild(card);
  });
}

// Cart Management Logic
function toggleCart() {
  cartOverlay.classList.toggle('active');
  cartPanel.classList.toggle('active');
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  
  updateCartUI();
  
  // Quick bounce animation on cart nav button
  const cartBtn = document.querySelector('.cart-btn');
  cartBtn.classList.add('scale-105');
  setTimeout(() => cartBtn.classList.remove('scale-105'), 200);
}

function removeFromCart(name) {
  const itemIdx = cart.findIndex(item => item.name === name);
  if (itemIdx !== -1) {
    cart.splice(itemIdx, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  // Count items
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

  // Populate drawer items
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="empty-state">Your order bag is empty. Explore our menu to add mouthwatering dishes!</div>`;
  } else {
    cart.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cart-item-card';
      card.innerHTML = `
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-qty">Qty: ${item.qty}</div>
          <button class="remove-item-btn" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')">Remove</button>
        </div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      `;
      cartItems.appendChild(card);
    });
  }
}

// WhatsApp Order API dispatcher
function submitWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Please add items to your cart before sending your order!");
    return;
  }

  let message = `🍽️ *New Order Request - ${restaurantData.restaurantName}*\n\n`;
  message += `Here is my order request:\n\n`;

  cart.forEach(item => {
    message += `• *${item.qty}x* ${item.name} ($${(item.price * item.qty).toFixed(2)})\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `\n💵 *Total Estimate:* $${total.toFixed(2)}\n\n`;
  message += `Please confirm my order and let me know the preparation time. Thank you!`;

  const encodedMsg = encodeURIComponent(message);
  // Send via direct WhatsApp API
  const link = `https://wa.me/${restaurantData.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;
  window.open(link, '_blank');
}

// Initialise page
window.onload = loadRestaurantData;
