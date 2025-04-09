async function loadHTML(elementId, filePath, callback) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Error al cargar ${filePath}`);
      const data = await response.text();
      document.getElementById(elementId).innerHTML = data;
  
      if (callback) callback();
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "includes/header.html", () => {
      // Código para manejar el cambio de tema
      const toggleTema = document.getElementById("toggle-tema");
      const body = document.body;
  
      // Cargar el tema guardado en localStorage
      const temaGuardado = localStorage.getItem("tema") || "☀️";
      body.setAttribute("data-tema", temaGuardado);
      toggleTema.textContent =
        temaGuardado === "oscuro" ? "☀️" : "🌑";
  
      // Alternar entre temas
      toggleTema.addEventListener("click", () => {
        const temaActual = body.getAttribute("data-tema");
        const nuevoTema = temaActual === "oscuro" ? "☀️" : "oscuro";
  
        body.setAttribute("data-tema", nuevoTema);
        localStorage.setItem("tema", nuevoTema);
        toggleTema.textContent =
          nuevoTema === "oscuro" ? "☀️" : "🌑";
      });
    });
  
    loadHTML("footer", "includes/footer.html");
  });