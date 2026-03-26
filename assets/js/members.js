const shopList = document.getElementById("shopList");
const searchInput = document.getElementById("shopSearchInput");
const searchBtn = document.getElementById("shopSearchBtn");
const emptyMessage = document.getElementById("emptyResultMessage");
const keywordChips = document.querySelectorAll(".keyword-chip");

let allShops = [];
let currentFilter = "all";

function normalizeText(text) {
  return (text || "").toLowerCase().replace(/\s+/g, "");
}

function truncateText(text, maxLength = 80) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function getSearchTarget(shop) {
  return normalizeText(`
    ${shop.shop_name || ""}
    ${shop.owner_name || ""}
    ${shop.category || ""}
    ${shop.address || ""}
    ${shop.benefit || ""}
    ${shop.short_desc || ""}
    ${shop.long_desc || ""}
  `);
}

function getCardImage(shop) {
  return (
    shop.image_url_1 ||
    shop.image_url_2 ||
    shop.image_url_3 ||
    "assets/img/default-shop.jpg"
  );
}

function renderShops() {
  const keyword = normalizeText(searchInput.value);
  shopList.innerHTML = "";

  let filtered = allShops.filter((shop) => {
    const matchKeyword =
      keyword === "" || getSearchTarget(shop).includes(keyword);

    let matchFilter = true;

    if (currentFilter === "benefit") {
      matchFilter = !!(shop.benefit && shop.benefit.trim() !== "");
    } else if (currentFilter === "excellent") {
      matchFilter = shop.is_excellent === true;
    }

    return matchKeyword && matchFilter;
  });

  if (filtered.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  filtered.forEach((shop) => {
    const benefitClass =
      shop.benefit && shop.benefit.trim() !== "" ? "benefit-member" : "";
    const excellentClass = shop.is_excellent ? "excellent-member" : "";

    const badgeText = shop.is_excellent
      ? "우수회원"
      : shop.benefit && shop.benefit.trim() !== ""
      ? "회원혜택 제공"
      : "회원업체";

    const card = document.createElement("article");
    card.className = `member-shop-card ${benefitClass} ${excellentClass}`.trim();

    card.setAttribute("data-title", shop.shop_name || "");
    card.setAttribute(
      "data-meta",
      `${shop.category || "업종 미입력"} · ${shop.address || "주소 미입력"}`
    );
    card.setAttribute(
      "data-benefit",
      shop.benefit ? `회원혜택: ${shop.benefit}` : "회원혜택 정보 없음"
    );
    card.setAttribute("data-desc", shop.long_desc || shop.short_desc || "");
    card.setAttribute("data-img", getCardImage(shop));

    card.innerHTML = `
      <img src="${getCardImage(shop)}" alt="${shop.shop_name || "회원업체"} 사진" />
      <div class="member-shop-card-body">
        <span class="shop-badge">${badgeText}</span>
        <h3>${shop.shop_name || "업체명 없음"}</h3>
        <p class="member-shop-meta">대표자: ${shop.owner_name || "-"}</p>
        <p class="member-shop-meta">업종: ${shop.category || "-"}</p>
        <p class="member-shop-meta">주소: ${shop.address || "-"}</p>
        <p class="member-shop-benefit">${
          shop.benefit ? `회원혜택: ${shop.benefit}` : "회원혜택 정보 없음"
        }</p>
        <p class="member-shop-desc">${truncateText(
          shop.short_desc || shop.long_desc || "업체 소개가 아직 등록되지 않았습니다.",
          80
        )}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      const modal = document.getElementById("shopModal");
      const modalTitle = document.getElementById("modalTitle");
      const modalMeta = document.getElementById("modalMeta");
      const modalBenefit = document.getElementById("modalBenefit");
      const modalDesc = document.getElementById("modalDesc");
      const modalImg = document.getElementById("modalImg");

      if (modal && modalTitle && modalMeta && modalBenefit && modalDesc && modalImg) {
        modalTitle.innerText = shop.shop_name || "업체명 없음";
        modalMeta.innerText = `${shop.category || "업종 미입력"} · ${shop.address || "주소 미입력"}`;
        modalBenefit.innerText = shop.benefit
          ? `회원혜택: ${shop.benefit}`
          : "회원혜택 정보 없음";
        modalDesc.innerText =
          shop.long_desc || shop.short_desc || "업체 상세 설명이 없습니다.";
        modalImg.src = getCardImage(shop);

        modal.style.display = "flex";
      }
    });

    shopList.appendChild(card);
  });
}

async function loadShops() {
  const { data, error } = await supabase
    .from("member_shops")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("업장 데이터 불러오기 실패:", error);
    emptyMessage.style.display = "block";
    emptyMessage.innerText = "업장 데이터를 불러오지 못했습니다.";
    return;
  }

  allShops = data || [];
  renderShops();
}

if (searchBtn) {
  searchBtn.addEventListener("click", renderShops);
}

if (searchInput) {
  searchInput.addEventListener("input", renderShops);
}

keywordChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    currentFilter = chip.dataset.filter;

    keywordChips.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");

    renderShops();
  });
});

loadShops();
async function loadShops() {
  const { data, error } = await supabase
    .from("member_shops")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const shopList = document.getElementById("shopList");
  shopList.innerHTML = "";

  data.forEach((shop) => {
    const card = document.createElement("article");
    card.className = "member-shop-card";

    if (shop.benefit) {
      card.classList.add("benefit-member");
    }

    if (shop.is_excellent) {
      card.classList.add("excellent-member");
    }

    card.innerHTML = `
      <img src="${shop.image_url_1 || 'assets/img/default-shop.jpg'}" />

      <div class="member-shop-card-body">
        <span class="shop-badge">
          ${shop.is_excellent ? "우수회원" : "회원업체"}
        </span>

        <h3>${shop.shop_name}</h3>

        <p class="member-shop-meta">대표자: ${shop.owner_name}</p>
        <p class="member-shop-meta">업종: ${shop.category || "-"}</p>
        <p class="member-shop-meta">주소: ${shop.address || "-"}</p>

        <p class="member-shop-benefit">
          회원혜택: ${shop.benefit || "없음"}
        </p>

        <p class="member-shop-desc">
          ${shop.short_desc || ""}
        </p>
      </div>
    `;

    shopList.appendChild(card);
  });
}

// 페이지 로드 시 실행
loadShops();
