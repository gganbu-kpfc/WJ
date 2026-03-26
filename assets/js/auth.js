document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

 const { error } = await window.sb.auth.signInWithPassword({
  email,
  password,
});

  if (error) {
    alert("로그인 실패");
    console.error(error);
  } else {
    alert("로그인 성공");
    window.location.href = "members.html";
  }
});

document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await window.sb.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("회원가입 실패");
    console.error(error);
  } else {
    alert("회원가입 성공");
  }
});
