function normalizeSearchQuery(rawValue) {
  return String(rawValue || "").trim();
}

function shouldRunSearch(rawValue) {
  return normalizeSearchQuery(rawValue).length > 0;
}

function toggleSmallFavoriteIcon(currentIcon) {
  return currentIcon === "♥" ? "♡" : "♥";
}

function toggleLargeFavoriteIcon(currentIcon) {
  return currentIcon === "❤️" ? "❤" : "❤️";
}

function applyActiveNav(navItems, activeIndex) {
  navItems.forEach(function (item, index) {
    if (index === activeIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    const settingsBtn = document.querySelector(".settings-btn");
    const searchBtn = document.querySelector(".search-btn");
    const searchInput = document.querySelector(".search-container input");
    const favButtons = document.querySelectorAll(".fav-small");
    const favBtnLarge = document.querySelector(".fav-btn-large");
    const navItems = document.querySelectorAll(".nav-item");

    if (settingsBtn) {
      settingsBtn.addEventListener("click", function () {
        console.log("Abrir configuracion");
      });
    }

    if (searchBtn && searchInput) {
      searchBtn.addEventListener("click", function () {
        const query = normalizeSearchQuery(searchInput.value);
        if (shouldRunSearch(query)) {
          console.log("Buscar:", query);
        }
      });

      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const query = normalizeSearchQuery(searchInput.value);
          if (shouldRunSearch(query)) {
            console.log("Buscar:", query);
          }
        }
      });
    }

    favButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        this.textContent = toggleSmallFavoriteIcon(this.textContent);
      });
    });

    if (favBtnLarge) {
      favBtnLarge.addEventListener("click", function () {
        this.textContent = toggleLargeFavoriteIcon(this.textContent);
      });
    }

    navItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        applyActiveNav(navItems, index);
      });
    });
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    normalizeSearchQuery,
    shouldRunSearch,
    toggleSmallFavoriteIcon,
    toggleLargeFavoriteIcon,
    applyActiveNav,
  };
}
