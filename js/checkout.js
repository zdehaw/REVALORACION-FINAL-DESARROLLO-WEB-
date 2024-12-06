document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const IVA_RATE = 0.16;

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Precio: $${item.price.toLocaleString()}</p>
                    <div>
                        <button class="btn btn-secondary decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-secondary increase" data-index="${index}">+</button>
                    </div>
                </div>
                <p>Importe: $${(item.price * item.quantity).toLocaleString()}</p>
                <button class="btn btn-secondary remove" data-index="${index}">Eliminar</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            subtotal += item.price * item.quantity;
        });

        const total = subtotal * (1 + IVA_RATE);
        subtotalElement.textContent = subtotal.toLocaleString();
        totalElement.textContent = total.toLocaleString();
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("increase")) {
            cart[index].quantity++;
        } else if (e.target.classList.contains("decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        } else if (e.target.classList.contains("remove")) {
            cart.splice(index, 1);
        }

        saveCart();
        updateCart();
    });

    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        location.reload();
    });

    checkoutButton.addEventListener("click", () => {
        alert("¡Gracias por tu compra! Serás redirigido.");
        localStorage.removeItem("cart");
        location.href = "index.html";
    });

    updateCart();
});


const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_rjhnt54';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});

// Código para la lógica principal (si es necesario en index.html)
console.log("Página principal cargada.");
window.addEventListener("scroll", () => {
    // Detectar la posición del scroll
    const scrollPosition = window.scrollY;

    // Aplicar rotación a cada paquete
    const package1 = document.getElementById("package1");
    const package2 = document.getElementById("package2");

    // hace un que se desplaze con el scroll
    package1.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
    package2.style.transform = `rotate(${-scrollPosition * 0.1}deg)`;
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
        const packageElement = e.target.closest(".package");
        const name = packageElement.querySelector("h3").textContent;
        const price = parseFloat(packageElement.querySelector(".price").textContent.replace("Precio: $", "").replace(",", ""));
        const image = packageElement.querySelector("img").src;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} agregado al carrito.`);
    });
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        // Obtener los datos del producto desde los atributos del botón
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const image = button.getAttribute("data-image");

        // Obtener el carrito actual desde localStorage o inicializar uno vacío
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find((item) => item.id === id);

        if (existingItem) {
            // Si ya existe, aumentar la cantidad
            existingItem.quantity++;
        } else {
            // Si no existe, agregar un nuevo producto
            cart.push({ id, name, price, image, quantity: 1 });
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Mostrar un mensaje de confirmación
        alert(`${name} agregado al carrito.`);
    });
});

// Obtener el carrito desde localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Seleccionar el contenedor donde se mostrarán los productos
const cartContainer = document.getElementById("cart-items");

if (cart.length > 0) {
    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Precio: $${item.price.toLocaleString()}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p>Subtotal: $${(item.price * item.quantity).toLocaleString()}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
} else {
    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
}


// Función para renderizar los productos del carrito
function renderCart() {
    cartContainer.innerHTML = ""; // Limpiar contenido previo
    if (cart.length > 0) {
        let totalPrice = 0; // Inicializar el total

        cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Precio: $${item.price.toLocaleString()}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Subtotal: $${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);

            // Calcular el total
            totalPrice += item.price * item.quantity;
        });

        // Mostrar el precio total
        totalPriceElement.innerText = `Total: $${totalPrice.toLocaleString()}`;
    } else {
        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
        totalPriceElement.innerText = ""; // Limpiar el total
    }
}

// Evento para finalizar compra
checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        alert("¡Gracias por tu compra!");
        // Vaciar el carrito
        localStorage.removeItem("cart");
        renderCart(); // Actualizar el carrito
    } else {
        alert("Tu carrito está vacío.");
    }
});

// Renderizar el carrito al cargar la página
renderCart();
