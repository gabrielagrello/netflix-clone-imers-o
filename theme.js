// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  // Obtém o elemento do botão de toggle de tema pelo ID "theme-toggle"
  const themeToggle = document.getElementById("theme-toggle");

  // Obtém o elemento raiz da página (html)
  const html = document.documentElement;

  // Recupera o tema salvo no localStorage, ou usa "dark" como padrão se não houver
  const savedTheme = localStorage.getItem("theme") || "dark";

  // Adiciona a classe "light-mode" ao elemento html se o tema salvo for "light"
  html.classList.toggle("light-mode", savedTheme === "light");

  // Atualiza o ícone do botão caso exista na página
  updateButton(savedTheme);

  // Salva o perfil selecionado ao clicar em um dos perfis da página inicial
  document.querySelectorAll(".profile a[data-profile]").forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem("selectedProfile", link.dataset.profile);
    });
  });

  // Atualiza o nome exibido na página do catálogo quando existir o elemento de perfil
  const profileNameElement = document.querySelector(".kids-link");
  if (profileNameElement) {
    const selectedProfile = localStorage.getItem("selectedProfile");
    if (selectedProfile) {
      profileNameElement.textContent = selectedProfile;
    }
  }

  if (themeToggle) {
    // Adiciona um ouvinte de clique ao botão de toggle de tema
    themeToggle.addEventListener("click", () => {
      const isLight = html.classList.toggle("light-mode");
      const theme = isLight ? "light" : "dark";
      localStorage.setItem("theme", theme);
      updateButton(theme);
    });
  }

  // Função que atualiza o ícone e a descrição acessível do botão
  function updateButton(theme) {
    if (!themeToggle) return;

    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      theme === "light"
        ? "Alternar para tema escuro"
        : "Alternar para tema claro",
    );
  }
});
