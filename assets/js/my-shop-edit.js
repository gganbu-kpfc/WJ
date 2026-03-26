document.addEventListener("DOMContentLoaded", async () => {
  const userResult = await supabase.auth.getUser();
  const user = userResult.data.user;

  if (!user) {
    alert("로그인 후 이용해주세요");
    window.location.href = "login.html";
    return;
  }

  // 내 글 불러오기
  const { data, error } = await supabase
    .from("member_shops")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    alert("등록된 업장이 없습니다.");
    return;
  }

  const form = document.getElementById("shopForm");

  form[0].value = data.owner_name;
  form[1].value = data.shop_name;
  form[2].value = data.category;
  form[3].value = data.address;
  form[4].value = data.benefit;
  form[5].value = data.short_desc;
  form[6].value = data.long_desc;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updateData = {
      owner_name: form[0].value,
      shop_name: form[1].value,
      category: form[2].value,
      address: form[3].value,
      benefit: form[4].value,
      short_desc: form[5].value,
      long_desc: form[6].value,
    };

    const { error: updateError } = await supabase
      .from("member_shops")
      .update(updateData)
      .eq("user_id", user.id);

    if (updateError) {
      alert("수정 실패");
      console.error(updateError);
      return;
    }

    alert("수정 완료");
    window.location.href = "members.html";
  });
});

