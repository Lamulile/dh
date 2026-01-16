(function () {
  const root = document.documentElement;

  // ---- Theme handling ----
  const THEME_KEY = "dh_theme"; // "light" | "dark" | "system"
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute("data-theme", saved);

  const themeBtn = document.getElementById("themeToggle");
  const setTheme = (mode) => {
    root.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_KEY, mode);
  };

  const cycleTheme = () => {
    const current = root.getAttribute("data-theme") || "system";
    // system -> light -> dark -> system
    if (current === "system") return setTheme("light");
    if (current === "light") return setTheme("dark");
    return setTheme("system");
  };

  if (themeBtn) themeBtn.addEventListener("click", cycleTheme);

  // ---- Mobile menu ----
  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobileMenu");

  const closeMobile = () => {
    if (!mobile) return;
    mobile.hidden = true;
    burger?.setAttribute("aria-expanded", "false");
  };

  burger?.addEventListener("click", () => {
    if (!mobile) return;
    const isOpen = !mobile.hidden;
    mobile.hidden = isOpen;
    burger.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close on link click
  document.querySelectorAll(".mobile__link, .mobile__cta").forEach((a) => {
    a.addEventListener("click", closeMobile);
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // ---- Contact: opens email client (no backend) ----
  window.DH_sendEmail = function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const need = form.need.value.trim();
    const msg = form.message.value.trim();

    const subject = encodeURIComponent(`Dlamini House enquiry: ${need}`);
    const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Need: ${need}

Message:
${msg}

---
Sent from dlaminihouse website`
    );

    // TODO: Replace with your business email
    const to = "info@yourdomain.co.za";

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    return false;
  };
})();
