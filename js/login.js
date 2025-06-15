const usersData = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    password: "123456",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@email.com",
    password: "senha123",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    password: "minhasenha",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", handleLogin);
});

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorElement = document.getElementById("login-error");

  try {
    const users = usersData;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "quiz.html";
    } else {
      errorElement.style.display = "block";
      setTimeout(() => {
        errorElement.style.display = "none";
      }, 3000);
    }
  } catch (error) {
    console.error("Error during login:", error);
    errorElement.textContent = "Erro no sistema. Tente novamente.";
    errorElement.style.display = "block";
  }
}

document.getElementById("email").addEventListener("input", clearError);
document.getElementById("password").addEventListener("input", clearError);

function clearError() {
  const errorElement = document.getElementById("login-error");
  errorElement.style.display = "none";
}
