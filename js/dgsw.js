// --- 기존 함수들 (showLogin, showSignup, closeModal 등)은 동일 ---

function showLogin() {
  document.getElementById("loginModal").classList.add("active");
  document.getElementById("signupModal").classList.remove("active");
}

function showSignup() {
  document.getElementById("signupModal").classList.add("active");
  document.getElementById("loginModal").classList.remove("active");
}

function closeModal() {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("signupModal").classList.remove("active");
}

function switchToSignup() {
  document.getElementById("loginModal").classList.remove("active");
  document.getElementById("signupModal").classList.add("active");
}

function switchToLogin() {
  document.getElementById("signupModal").classList.remove("active");
  document.getElementById("loginModal").classList.add("active");
}

// --- 커스텀 알림 함수 ---
function showAlert(message) {
  document.getElementById("customAlertMessage").textContent = message;
  document.getElementById("customAlert").classList.add("active");
}

function closeCustomAlert() {
  document.getElementById("customAlert").classList.remove("active");
}

// --- 비밀번호 보이기/숨기기 토글 함수 ---
function togglePasswordVisibility(fieldId) {
  const passwordField = document.getElementById(fieldId);
  const icon = passwordField.nextElementSibling;
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    passwordField.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}

// 모달 외부 클릭 시 닫기
document.getElementById("loginModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

document.getElementById("signupModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

document
  .getElementById("customAlert")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeCustomAlert();
    }
  });

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    closeCustomAlert();
  }
});

// --- 회원가입 처리 함수 (alert 대신 showAlert 사용) ---
function STORE(e) {
  e.preventDefault();

  const id = document.querySelector("#signupId").value.trim();
  const email = document.querySelector("#signupEmail").value.trim();
  const password = document.querySelector("#signupPassword").value.trim();
  const passwordConfirm = document
    .querySelector("#signupPasswordConfirm")
    .value.trim();

  if (!id || !email || !password || !passwordConfirm) {
    showAlert("모든 필드를 입력해주세요.");
    return;
  }

  if (password !== passwordConfirm) {
    showAlert("비밀번호가 일치하지 않습니다.");
    document.querySelector("#signupPassword").value = "";
    document.querySelector("#signupPasswordConfirm").value = "";
    return;
  }

  const userData = {
    id: id,
    email: email,
    password: password,
    signupDate: new Date().toISOString(),
  };

  try {
    let existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (!Array.isArray(existingUsers)) {
        existingUsers = [];
    }

    const isDuplicateId = existingUsers.some((user) => user.id === id);
    if (isDuplicateId) {
      showAlert(`아이디 '${id}'는 이미 사용중입니다. 다른 아이디를 입력해주세요.`);
      document.querySelector("#signupId").focus();
      return;
    }

    const isDuplicateEmail = existingUsers.some((user) => user.email === email);
    if (isDuplicateEmail) {
      showAlert(`이메일 '${email}'로 이미 가입된 계정이 있습니다. 다른 이메일을 사용해주세요.`);
      document.querySelector("#signupEmail").focus();
      return;
    }

    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    showAlert(`${id}님, 회원가입이 완료되었습니다! 환영합니다! 🎉`);
    reset();
    closeModal();
  } catch (error) {
    console.error("저장 중 오류 발생:", error);
    if (error.name === "QuotaExceededError") {
      showAlert(
        "저장 공간이 부족합니다. 브라우저 데이터를 정리한 후 다시 시도해주세요."
      );
    } else {
      showAlert(`회원가입 처리 중 오류가 발생했습니다: ${error.message}`);
    }
  }
}

function reset() {
  document.querySelector("#signupId").value = "";
  document.querySelector("#signupEmail").value = "";
  document.querySelector("#signupPassword").value = "";
  document.querySelector("#signupPasswordConfirm").value = "";
}

// --- 로그인 처리 함수 (alert 대신 showAlert 사용) ---
function LOGIN(e) {
  e.preventDefault();

  const loginId = document.querySelector("#loginId").value.trim();
  const loginPassword = document.querySelector("#loginPassword").value.trim();

  if (!loginId || !loginPassword) {
    showAlert("아이디와 비밀번호를 모두 입력해주세요.");
    return;
  }

  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.id === loginId && u.password === loginPassword
    );

    if (user) {
      showAlert(`${user.id}님, 로그인 성공! 환영합니다! 🎉`);
      closeModal();
      // 여기에 로그인 후 처리 코드 추가 가능
    } else {
      showAlert("아이디 또는 비밀번호가 올바르지 않습니다.");
      document.querySelector("#loginPassword").value = "";
    }
  } catch (error) {
    console.error("로그인 중 오류:", error);
    showAlert("로그인 처리 중 오류가 발생했습니다.");
  }
}