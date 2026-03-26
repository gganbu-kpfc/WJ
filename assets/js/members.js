const searchInput = document.getElementById("shopSearchInput");
const searchBtn = document.getElementById("shopSearchBtn");
const shopCards = document.querySelectorAll(".member-shop-card");
const emptyMessage = document.getElementById("emptyResultMessage");
const keywordChips = document.querySelectorAll(".keyword-chip");

let currentFilter = "all";

function normalizeText(text) {
  return (text || "").toLowerCase().replace(/\s+/g, "");
}

function filterShops() {
  const keyword = normalizeText(searchInput.value);
  let visibleCount = 0;

  shopCards.forEach((card) => {
    const searchText = normalizeText(card.dataset.search);

    const matchKeyword = keyword === "" || searchText.includes(keyword);

    let matchFilter = true;

    if (currentFilter === "benefit") {
      matchFilter = card.classList.contains("benefit-member");
    } else if (currentFilter === "excellent") {
      matchFilter = card.classList.contains("excellent-member");
    }

    if (matchKeyword && matchFilter) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
}

if (searchBtn) {
  searchBtn.addEventListener("click", filterShops);
}

if (searchInput) {
  searchInput.addEventListener("input", filterShops); // 글자 칠 때마다 바로 검색
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      filterShops();
    }
  });
}

keywordChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    currentFilter = chip.dataset.filter;

    keywordChips.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");

    filterShops();
  });
});

filterShops();
