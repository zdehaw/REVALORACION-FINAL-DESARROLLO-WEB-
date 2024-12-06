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



