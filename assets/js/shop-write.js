document.getElementById("shopForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userResult = await supabase.auth.getUser();
  const user = userResult.data.user;

  if (!user) {
    alert("로그인 후 이용해주세요");
    return;
  }

  const form = e.target;

  const ownerName = form.querySelector('input[placeholder="대표자 이름 입력"]').value;
  const shopName = form.querySelector('input[placeholder="업체명 입력"]').value;
  const category = form.querySelector('input[placeholder="예: 술집, 카페, 네일샵"]').value;
  const address = form.querySelector('input[placeholder="예: 원주시 단계동"]').value;
  const benefit = form.querySelector('input[placeholder="예: 음료 1병 제공"]').value;
  const shortDesc = form.querySelector('textarea[placeholder="업체를 간단히 소개해주세요"]').value;
  const longDesc = form.querySelector('textarea[placeholder="업체 상세 설명 입력"]').value;

  const imageInput = document.getElementById("shopImages");
  const files = imageInput.files;

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

    const { error: uploadError } = await supabase.storage
      .from("shop-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      alert(`사진 ${i + 1} 업로드 실패`);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("shop-images")
      .getPublicUrl(filePath);

    imageUrls[i] = publicUrlData.publicUrl;
  }

  const insertData = {
    user_id: user.id,
    owner_name: ownerName,
    shop_name: shopName,
    category: category,
    address: address,
    benefit: benefit,
    short_desc: shortDesc,
    long_desc: longDesc,
    image_url_1: imageUrls[0],
    image_url_2: imageUrls[1],
    image_url_3: imageUrls[2],
  };

  const { error: insertError } = await supabase
    .from("member_shops")
    .insert([insertData]);

  if (insertError) {
    console.error(insertError);
    alert("업장 등록 실패");
    return;
  }

  alert("업장 등록이 완료되었습니다.");
  window.location.href = "members.html";
});
