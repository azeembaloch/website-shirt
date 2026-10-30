
/* =========================
   01. VARIABLES AND DOM
========================= */

const burger = document.getElementById("burger");
const navbar = document.getElementById("navbar");
const heroImage = document.getElementById("heroImage");
const catalog = document.getElementById("productCatalog");
const filterButtons = document.querySelectorAll(".filter-btn");

/* =========================
   02. HERO IMAGE ARRAY
========================= */

const heroImages = [
    "https://tshirt-factory.com/images/detailed/66/koi-782719386.png",
    "https://i5.walmartimages.com/seo/Men-s-Short-Sleeve-Hoodie-Workout-Gym-Hooded-Sweatshirt-Lightweight-Slim-Fit-Athletic-Pullover-Hoodies-T-Shirts_c8ee9792-eaef-4872-b867-5dbfbce4d815.58b04924827c0da07231fed2cd65f883.jpeg",
    "https://www.fansidea.com/cdn/shop/products/Jacket0530_2000x.jpg?v=1670306600"
];

/* =========================
   03. PRODUCT OBJECTS
========================= */

const collections = [
    {
        name: "Shirts",
        type: "shirts",
        subtitle: "EVERYDAY STYLE · PREMIUM LOOK",
        products: [
            {name:"Signature Shirt",price:1000,image:"https://tshirt-factory.com/images/detailed/66/koi-782719386.png"},
            {name:"Urban Shirt",price:1500,image:"https://i.etsystatic.com/61331177/r/il/c818b1/7617115517/il_1080xN.7617115517_sqch.jpg"},
            {name:"Luxury Shirt",price:2000,image:"https://i.etsystatic.com/64980345/r/il/ad73d1/8000677624/il_1080xN.8000677624_89mp.jpg"}
        ]
    },
    {
        name: "Hoodies",
        type: "hoodies",
        subtitle: "COMFORT · STREETWEAR · CONFIDENCE",
        products: [
            {name:"Classic Hoodie",price:2000,image:"https://tse1.mm.bing.net/th/id/OIP.ZcdrWXmlxRNOqY7rZepLXwHaGs?r=0&w=1100&h=994&rs=1&pid=ImgDetMain&o=7&rm=3"},
            {name:"Urban Hoodie",price:2500,image:"https://tse3.mm.bing.net/th/id/OIP.QApABw7Squ5j7zi_jYArWQHaHa?r=0&w=2000&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3"},
            {name:"Designer Hoodie",price:3000,image:"https://img.freepik.com/premium-photo/rendering-floral-printed-hoodie-beautiful-hoodie-design-ideas-hoodie-design-ideas_1037362-32597.jpg"}
        ]
    },
    {
        name: "Jackets",
        type: "jackets",
        subtitle: "BOLD LAYERS · TIMELESS DESIGN",
        products: [
            {name:"Classic Jacket",price:2500,image:"https://www.fansidea.com/cdn/shop/products/Jacket0530_2000x.jpg?v=1670306600"},
            {name:"Urban Jacket",price:3000,image:"https://tse2.mm.bing.net/th/id/OIP.MnNfsSNJ50o8_R9QBJMsHgHaHa?r=0&w=1500&h=1500&rs=1&pid=ImgDetMain&o=7&rm=3"},
            {name:"Premium Jacket",price:3500,image:"https://th.bing.com/th/id/OIP.jbgJ6TwviATuZVemdkfyxgHaJ3?r=0&o=7&rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"}
        ]
    }
];

/* =========================
   04. GENERATOR
========================= */

function* imageSequence(images) {
    let index = 0;

    while (true) {
        yield images[index];
        index++;

        if (index >= images.length) {
            index = 0;
        }
    }
}

const slides = imageSequence(heroImages);

/* =========================
   05. HERO IMAGE SLIDER
========================= */

setInterval(function() {
    heroImage.style.opacity = "0";

    setTimeout(function() {
        heroImage.src = slides.next().value;
        heroImage.style.opacity = "1";
    }, 300);

}, 3000);

/* =========================
   06. MOBILE NAVBAR
========================= */

burger.onclick = function() {
    navbar.classList.toggle("open");

    if (navbar.classList.contains("open")) {
        burger.textContent = "✕";
    } else {
        burger.textContent = "☰";
    }
};

const navLinks = document.querySelectorAll(".nav-link");

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = function() {
        navbar.classList.remove("open");
        burger.textContent = "☰";
    };
}

/* =========================
   07. PRODUCT GALLERY
========================= */

for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    let cards = "";

    for (let j = 0; j < collection.products.length; j++) {
        const product = collection.products[j];

        const message = encodeURIComponent(
            "Hello AZEEM BRAND! I want to order " +
            product.name + " for PKR " + product.price
        );

        cards += `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-label">AZEEM EXCLUSIVE</span>
            </div>

            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="product-desc">Premium Style · Everyday Comfort</p>
                <div class="product-price">
                    <small>PKR</small> ${product.price}
                </div>
                <span class="product-phone">Order: 03368151228</span>
                <a class="product-order"
                href="https://wa.me/923368151228?text=${message}"
                target="_blank" rel="noopener">ORDER NOW ↗</a>
            </div>
        </article>`;
    }

    catalog.innerHTML += `
    <div class="category" data-category="${collection.type}">
        <div class="category-heading">
            <div>
                <p class="eyebrow">AZEEM BRAND COLLECTION</p>
                <h3>${collection.name}</h3>
            </div>
            <p>${collection.subtitle}<br>← SCROLL TO EXPLORE →</p>
        </div>

        <div class="product-track">${cards}</div>

        <div class="category-order">
            <div>
                <strong>Want to order ${collection.name}?</strong>
                <p>WhatsApp: 03368151228 · Ask about sizes and availability.</p>
            </div>
            <a class="btn"
            href="https://wa.me/923368151228?text=${encodeURIComponent("Hello AZEEM BRAND! I want to order " + collection.name)}"
            target="_blank" rel="noopener">Order ${collection.name} ↗</a>
        </div>
    </div>`;
}

/* =========================
   08. CATEGORY FILTER
========================= */

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].onclick = function() {
        const selected = filterButtons[i].getAttribute("data-filter");

        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }

        filterButtons[i].classList.add("active");

        for (let j = 0; j < catalog.children.length; j++) {
            const category = catalog.children[j];
            const type = category.getAttribute("data-category");

            if (selected === "all") {
                category.hidden = false;
            } else if (selected === type) {
                category.hidden = false;
            } else {
                category.hidden = true;
            }
        }
    };
}

/* =========================
   09. CONTACT FORM
========================= */

document.getElementById("contactForm").onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const message = document.getElementById("customerMessage").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please complete all fields.");
    } else {
        const text = encodeURIComponent(
            "AZEEM BRAND ENQUIRY\nName: " + name +
            "\nEmail: " + email +
            "\nMessage: " + message
        );

        window.open("https://wa.me/923368151228?text=" + text, "_blank");
    }
};


/* =================================
   10. SCROLL ANIMATION
================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-image, .about-copy, .team-card, .filter-buttons, .category-heading, .product-card, .category-order, .order-banner, .contact-info, .contact-form, .footer-main > *, .footer-bottom"
);

for (let i = 0; i < revealElements.length; i++) {
    revealElements[i].classList.add("reveal-on-scroll");
}

const scrollObserver = new IntersectionObserver(function(entries) {

    for (let i = 0; i < entries.length; i++) {

        if (entries[i].isIntersecting) {

            entries[i].target.classList.add("show-animation");

            scrollObserver.unobserve(entries[i].target);
        }

    }

}, {
    threshold: 0.12
});

for (let i = 0; i < revealElements.length; i++) {
    scrollObserver.observe(revealElements[i]);
}
