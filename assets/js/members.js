const searchInput = document.getElementById("shopSearchInput");
const searchBtn = document.getElementById("shopSearchBtn");
const shopCards = document.querySelectorAll(".member-shop-card");
const emptyMessage = document.getElementById("emptyResultMessage");
const keywordChips = document.querySelectorAll(".keyword-chip");

function filterShops() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  shopCards.forEach((card) => {
    const searchText = card.dataset.search.toLowerCase();

    if (searchText.includes(keyword)) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (visibleCount === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

if (searchBtn) {
  searchBtn.addEventListener("click", filterShops);
}

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      filterShops();
    }
  });
}

keywordChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const keyword = chip.dataset.keyword;
    searchInput.value = keyword;
    filterShops();
  });
});
