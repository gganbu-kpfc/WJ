const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "flex") {
      mobileMenu.style.display = "none";
    } else {
      mobileMenu.style.display = "flex";
    }
  });
}

// 스크롤 등장 애니메이션
const fadeTargets = document.querySelectorAll(
  ".intro-card, .growth-item, .shop-card, .section-title-box, .hero-text, .hero-visual, .contact-quick-box"
);

fadeTargets.forEach((item) => item.classList.add("fade-up"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

fadeTargets.forEach((item) => observer.observe(item));
document.addEventListener("DOMContentLoaded", async () => {
  if (!window.sb) return;

  const { data, error } = await window.sb.auth.getUser();
  if (error) {
    console.error(error);
    return;
  }

  const user = data.user;
  const loginLinks = document.querySelectorAll(".nav-login");

  loginLinks.forEach((link) => {
    if (user) {
      link.textContent = "로그아웃";
      link.href = "#";
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        await window.sb.auth.signOut();
        alert("로그아웃 되었습니다.");
        window.location.href = "index.html";
      });
    } else {
      link.textContent = "로그인";
      link.href = "login.html";
    }
  });
});
