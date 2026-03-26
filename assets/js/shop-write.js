document.getElementById("shopForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userResult = await window.sb.auth.getUser();
  const user = userResult.data.user;

  if (!user) {
    alert("로그인 후 이용해주세요");
    window.location.href = "login.html";
    return;
  }

  const ownerName = document.getElementById("ownerName").value.trim();
  const shopName = document.getElementById("shopName").value.trim();
  const homepage = document.getElementById("homepage").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const category = document.getElementById("category").value.trim();
  const address = document.getElementById("address").value.trim();
  const benefit = document.getElementById("benefit").value.trim();
  const shortDesc = document.getElementById("shortDesc").value.trim();
  const longDesc = document.getElementById("longDesc").value.trim();

  const imageInput = document.getElementById("shopImages");
  const files = imageInput.files;

  if (!ownerName || !shopName) {
    alert("대표자명과 업체명은 필수입니다.");
    return;
  }

  if (files.length > 3) {
    alert("사진은 최대 3장까지 업로드 가능합니다.");
    return;
  }

  let imageUrls = ["", "", ""];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}_${i}.${fileExt}`;
    const filePath = `member-shops/${fileName}`;

    const { error: uploadError } = await window.sb.storage
      .from("shop-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      alert(`사진 ${i + 1} 업로드 실패`);
      return;
    }

    const { data: publicUrlData } = window.sb.storage
      .from("shop-images")
      .getPublicUrl(filePath);

    imageUrls[i] = publicUrlData.publicUrl;
  }

  const { error: insertError } = await window.sb
  .from("member_shops")
  .insert([
    {
      user_id: user.id,
      owner_name: ownerName,
      shop_name: shopName,
      homepage,
      phone,
      category,
      address,
      benefit,
      short_desc: shortDesc,
      long_desc: longDesc,
      homepage,
      phone,
      image_url_1: imageUrls[0],
      image_url_2: imageUrls[1],
      image_url_3: imageUrls[2],
    },
  ]);

  if (insertError) {
    console.error(insertError);
    alert("업장 등록 실패");
    return;
  }

  alert("업장 등록이 완료되었습니다.");
  window.location.href = "members.html";
});
