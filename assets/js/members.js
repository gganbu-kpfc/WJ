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
// 카드 설명 글자 자르기
function truncateText() {
  const descs = document.querySelectorAll(".member-shop-desc");

  descs.forEach((el) => {
    const fullText = el.innerText;

    if (fullText.length > 60) {
      el.innerText = fullText.substring(0, 60) + "...";
    }
  });
}

// 페이지 로딩 시 실행
truncateText();

// 모달 열기
const modal = document.getElementById("shopModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalBenefit = document.getElementById("modalBenefit");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".member-shop-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.innerText = card.dataset.title;
    modalMeta.innerText = card.dataset.meta;
    modalBenefit.innerText = card.dataset.benefit;
    modalDesc.innerText = card.dataset.desc;
    modalImg.src = card.dataset.img;

    modal.style.display = "flex";
  });
});

// 닫기
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// 바깥 클릭 시 닫기
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
