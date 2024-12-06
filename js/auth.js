// Mostrar la sección seleccionada
function showSection(sectionId) {
    const sections = document.querySelectorAll('.container > div');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Guardar y cargar datos del almacenamiento local
function loadFromDB() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveToDB(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registrar un nuevo usuario
function register() {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    let users = loadFromDB();

    if (users.some(user => user.email === email)) {
        alert("El correo ya está registrado.");
        return;
    }

    users.push({ name, email, password });
    saveToDB(users);
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    showSection('login-section');
}

// Iniciar sesión
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = loadFromDB();

    if (users.some(user => user.email === email && user.password === password)) {
        alert("Inicio de sesión exitoso.");
        window.location.href = "index.html"; // Redirigir al inicio
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

// Recuperar contraseña
function recoverPassword() {
    const email = document.getElementById("recover-email").value;

    let users = loadFromDB();

    const user = users.find(user => user.email === email);
    if (user) {
        alert(`Tu contraseña es: ${user.password}`);
    } else {
        alert("Correo no encontrado.");
    }
}



