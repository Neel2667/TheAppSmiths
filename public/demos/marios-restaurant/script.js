// Global Cart and Reservation State
const cart = [];
let activeZone = "Cozy Candlelit Alcove"; // Default zone

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Site Content
  initializeSite();
  
  // Setup Menu Navigation & Rendering
  renderCategoryTabs();
  renderMenuItems("All");
  
  // Setup Customer Reviews
  renderReviews();
  
  // Setup Interaction Listeners
  setupListeners();
  
  // Scroll Animation Trigger (Intersection Observer)
  setupScrollAnimations();
});

// Populate all data fields from data.js
function initializeSite() {
  // Page Title
  document.title = `${restaurantData.restaurantName} | Premium Dining NC`;
  
  // Brand Header & Hero
  document.getElementById("brand-name").innerHTML = restaurantData.restaurantName.replace("Mario's", "Mario's <span>Restaurant</span>");
  document.getElementById("hero-heading").textContent = restaurantData.restaurantName;
  document.getElementById("hero-tagline").textContent = restaurantData.tagline;
  
  // About / Story
  document.getElementById("about-description").textContent = restaurantData.aboutText;
  
  // Location Address
  document.getElementById("info-address").textContent = restaurantData.address;
  document.getElementById("map-iframe").src = `https://maps.google.com/maps?q=${encodeURIComponent(restaurantData.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  // Set link hrefs
  document.getElementById("call-action-btn").href = `tel:${restaurantData.phone.replace(/[^0-9]/g, '')}`;
  document.getElementById("maps-action-btn").href = restaurantData.mapsLink;
  
  // Populate Operating Hours
  const hoursTable = document.getElementById("hours-table");
  hoursTable.innerHTML = "";
  Object.entries(restaurantData.hours).forEach(([days, time]) => {
    const row = document.createElement("div");
    row.className = "hours-row";
    row.innerHTML = `
      <span class="hours-days">${days}</span>
      <span class="hours-times">${time}</span>
    `;
    hoursTable.appendChild(row);
  });
}

// Render dynamic tab buttons for menu categories
function renderCategoryTabs() {
  const tabsContainer = document.getElementById("category-tabs");
  tabsContainer.innerHTML = "";
  
  // Add 'All Specialties' Tab
  const allBtn = document.createElement("button");
  allBtn.className = "tab-btn active";
  allBtn.textContent = "All Specialties";
  allBtn.addEventListener("click", () => {
    toggleActiveTab(allBtn);
    renderMenuItems("All");
  });
  tabsContainer.appendChild(allBtn);
  
  // Add individual category tabs
  restaurantData.menu.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.textContent = cat.category;
    btn.addEventListener("click", () => {
      toggleActiveTab(btn);
      renderMenuItems(cat.category);
    });
    tabsContainer.appendChild(btn);
  });
}

function toggleActiveTab(selectedBtn) {
  const buttons = document.querySelectorAll("#category-tabs .tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  selectedBtn.classList.add("active");
}

// Render menu cards based on selected filter
function renderMenuItems(categoryFilter) {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";
  
  restaurantData.menu.forEach(cat => {
    if (categoryFilter !== "All" && cat.category !== categoryFilter) return;
    
    cat.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card reveal active"; // Standard entry class
      card.innerHTML = `
        <div class="menu-card-img-wrapper">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="menu-card-content">
          <div class="menu-card-details">
            <div class="menu-card-header">
              <h3>${item.name}</h3>
              <span class="menu-card-price">$${item.price}</span>
            </div>
            <p class="menu-card-desc">${item.desc}</p>
          </div>
          <button class="add-bag-btn" onclick="addToCart('${item.name.replace(/'/g, "\\'")}', ${item.price})">
            🛒 Add to Bag
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  });
}

// Render static customer reviews
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  container.innerHTML = "";

  const reviews = restaurantData.reviews;

  // Split reviews into two rows (first half / second half, repeating for seamless loop)
  const mid = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, mid);
  const row2 = reviews.slice(mid);

  // Helper: generate avatar initials from name
  function getInitials(name) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  }

  // Helper: pick a warm accent color per initial letter
  const colors = ["#a83d2c","#c29958","#7a5c44","#b35c32","#8c6f55","#c07040"];
  function getColor(name) {
    return colors[name.charCodeAt(0) % colors.length];
  }

  // Build a single review card HTML
  function buildCard(rev) {
    const initials = getInitials(rev.author);
    const color = getColor(rev.author);
    return `
      <div class="marquee-card">
        <div class="mc-quote-icon">"</div>
        <div class="mc-stars">${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}</div>
        <p class="mc-text">${rev.text}</p>
        <div class="mc-author">
          <div class="mc-avatar" style="background:${color}">${initials}</div>
          <div class="mc-author-info">
            <span class="mc-name">${rev.author}</span>
            <span class="mc-badge">✓ Verified Google Review</span>
          </div>
        </div>
      </div>
    `;
  }

  // Create a marquee row
  function createMarqueeRow(reviewsArr, direction) {
    const track = document.createElement("div");
    track.className = `marquee-track ${direction === "right" ? "marquee-rtl" : ""}`;

    // Triple the cards for seamless infinite loop
    const allCards = [...reviewsArr, ...reviewsArr, ...reviewsArr];
    track.innerHTML = allCards.map(buildCard).join("");

    const row = document.createElement("div");
    row.className = "marquee-row";
    row.appendChild(track);
    return row;
  }

  container.appendChild(createMarqueeRow(row1, "left"));
  container.appendChild(createMarqueeRow(row2, "right"));
}


// Event Listeners for Header effects, Cart Overlay
function setupListeners() {
  const header = document.querySelector("header");
  
  // Header scroll class toggle
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Seating plan interaction
  const zoneSelectors = document.querySelectorAll(".zone-selector");
  zoneSelectors.forEach(sel => {
    sel.addEventListener("click", () => {
      // Toggle active states
      zoneSelectors.forEach(z => z.classList.remove("active"));
      sel.classList.add("active");
      
      // Update state
      activeZone = sel.getAttribute("data-zone");
      
      // Update visual highlight in tables preview
      updateTablesHighlight(sel.getAttribute("data-class"));
    });
  });
}

// Highlight preview nodes based on selected seating zone
function updateTablesHighlight(highlightClass) {
  const tables = document.querySelectorAll(".preview-table");
  tables.forEach(t => t.classList.remove("highlight"));
  
  const matches = document.querySelectorAll(`.preview-table.${highlightClass}`);
  matches.forEach(m => m.classList.add("highlight"));
}

// Scroll Intersection triggers
function setupScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => observer.observe(el));
}

// Cart Sidebar Visibility
function toggleCart() {
  document.getElementById("cart-overlay").classList.toggle("active");
  document.getElementById("cart-panel").classList.toggle("active");
}

// Add Item to Shopping Cart Bag
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  
  updateCartUI();
  
  // Quick feedback animation on cart nav buttons
  const btns = document.querySelectorAll(".cart-btn");
  btns.forEach(b => {
    b.classList.add("scale-105");
    b.style.borderColor = "var(--accent-gold)";
    setTimeout(() => {
      b.classList.remove("scale-105");
      b.style.borderColor = "rgba(223, 184, 118, 0.2)";
    }, 200);
  });
}

// Adjust Item quantity in Cart Drawer
function changeQty(name, amount) {
  const item = cart.find(item => item.name === name);
  if (!item) return;
  
  item.qty += amount;
  if (item.qty <= 0) {
    const idx = cart.indexOf(item);
    cart.splice(idx, 1);
  }
  
  updateCartUI();
}

// Update Cart Badge and Drawer DOM contents
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  
  // Update badge counters
  document.querySelectorAll(".cart-count-badge").forEach(el => {
    el.textContent = totalItems;
  });
  
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty-state">Your order bag is empty.<br>Browse the menu to add delicious homemade dishes!</div>`;
    document.getElementById("subtotal-price").textContent = "$0.00";
    document.getElementById("tax-price").textContent = "$0.00";
    document.getElementById("total-price").textContent = "$0.00";
    return;
  }
  
  // Populating item cards in drawer
  cart.forEach(item => {
    const card = document.createElement("div");
    card.className = "cart-item-card";
    card.innerHTML = `
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty('${item.name.replace(/'/g, "\\'")}', -1)">-</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-item" onclick="changeQty('${item.name.replace(/'/g, "\\'")}', -${item.qty})">Remove</button>
      </div>
    `;
    container.appendChild(card);
  });
  
  // Math for subtotal, sales tax (7.5%), and final estimate
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.075;
  const total = subtotal + tax;
  
  document.getElementById("subtotal-price").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax-price").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
}

// Compile order list and dispatch WhatsApp payload
function submitWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Please add items to your cart before checking out!");
    return;
  }
  
  let msg = `🍽️ *Takeout Order Request - ${restaurantData.restaurantName}*\n`;
  msg += `=====================================\n\n`;
  
  cart.forEach(item => {
    msg += `• *${item.qty}x* ${item.name} ($${(item.price * item.qty).toFixed(2)})\n`;
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.075;
  const total = subtotal + tax;
  
  msg += `\n=====================================\n`;
  msg += `💵 *Subtotal:* $${subtotal.toFixed(2)}\n`;
  msg += `📝 *Sales Tax (7.5%):* $${tax.toFixed(2)}\n`;
  msg += `💰 *Total Estimate:* *$${total.toFixed(2)}*\n`;
  msg += `=====================================\n\n`;
  msg += `Please confirm my order and let me know the pickup time. Thank you!`;
  
  const encoded = encodeURIComponent(msg);
  const link = `https://wa.me/${restaurantData.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`;
  window.open(link, "_blank");
}

// Compile table details and dispatch booking draft to WhatsApp
function submitReservation(event) {
  event.preventDefault(); // Stop page reload
  
  const name = document.getElementById("res-name").value.trim();
  const phone = document.getElementById("res-phone").value.trim();
  const guests = document.getElementById("res-guests").value;
  const date = document.getElementById("res-date").value;
  const time = document.getElementById("res-time").value;
  const occasion = document.getElementById("res-occasion").value;
  const notes = document.getElementById("res-notes").value.trim();
  
  if (!name || !phone || !date || !time) {
    alert("Please fill in your Name, Phone Number, Date, and Time slot!");
    return;
  }
  
  let msg = `🍷 *Table Reservation Request*\n`;
  msg += `=====================================\n\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📞 *Phone:* ${phone}\n`;
  msg += `👥 *Party Size:* ${guests} People\n`;
  msg += `📅 *Date:* ${date}\n`;
  msg += `⏰ *Time Slot:* ${time}\n`;
  msg += `🛋️ *Dining Zone:* *${activeZone}*\n`;
  msg += `🎉 *Occasion:* ${occasion}\n`;
  
  if (notes) {
    msg += `✉️ *Special Request:* _${notes}_\n`;
  }
  
  msg += `\n=====================================\n`;
  msg += `Please let me know if a table is available in the selected zone. Thank you!`;
  
  const encoded = encodeURIComponent(msg);
  const link = `https://wa.me/${restaurantData.whatsapp.replace(/[^0-9]/g, '')}?text=${encoded}`;
  window.open(link, "_blank");
}
