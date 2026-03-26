document.getElementById("shopForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    alert("로그인 후 이용해주세요");
    return;
  }

  const form = e.target;

  const data = {
    user_id: user.data.user.id,
    owner_name: form[0].value,
    shop_name: form[1].value,
    category: form[2].value,
    address: form[3].value,
    benefit: form[4].value,
    short_desc: form[5].value,
    long_desc: form[6].value,
  };

  const { error } = await supabase
    .from("member_shops")
    .insert([data]);

  if (error) {
    alert("등록 실패");
    console.error(error);
  } else {
    alert("등록 완료");
    window.location.href = "members.html";
  }
});
