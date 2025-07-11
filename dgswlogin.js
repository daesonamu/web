// 폼 초기화 함수
function resetForm() {
    document.getElementById('loginForm').reset();
    document.getElementById('name').focus();
}

// 회원가입 모달 열기
function showSignup() {
    document.getElementById('signupModal').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('signup-name').focus();
    }, 100);
}

// 회원가입 모달 닫기
function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
}

// 로컬스토리지에서 사용자 데이터 불러오기
let userData = JSON.parse(localStorage.getItem('userData') || '{}');

// 폼 제출 처리
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    
    if (name && password) {
        // 등록된 사용자인지 확인
        if (!userData[name]) {
            alert('등록되지 않은 사용자입니다. 회원가입을 먼저 진행해주세요.');
            return;
        }
        
        // 비밀번호 확인
        if (userData[name].password !== password) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        // 로딩 상태 표시
        submitBtn.classList.add('loading');
        submitBtn.textContent = '로그인 중...';
        
        // 2초 후 로그인 완료 시뮬레이션
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = '시작하기';
            alert('로그인 성공!');
            // 로그인 후 처리 (예: 페이지 이동)
            // window.location.href = 'dashboard.html';
        }, 2000);
    } else {
        alert('모든 값을 입력해주세요.');
    }
});

// 회원가입 폼 제출 처리
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('signupSubmitBtn');
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    if (name && email && password && confirmPassword) {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        // 이미 존재하는 사용자인지 확인
        if (userData[name]) {
            alert('이미 존재하는 아이디입니다.');
            return;
        }
        
        // 로딩 상태 표시
        submitBtn.classList.add('loading');
        submitBtn.textContent = '가입 중...';
        
        // 2초 후 회원가입 완료 시뮬레이션
        setTimeout(() => {
            // 사용자 데이터 저장
            userData[name] = {
                email: email,
                password: password
            };
            
            // 로컬스토리지에 저장
            localStorage.setItem('userData', JSON.stringify(userData));
            
            submitBtn.classList.remove('loading');
            submitBtn.textContent = '가입하기';
            alert('회원가입 성공!');
            closeSignup();
            
            // 회원가입 폼 초기화
            document.getElementById('signupForm').reset();
        }, 2000);
    } else {
        alert('모든 필드를 입력해주세요.');
    }
});

// 입력 필드 애니메이션
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.parentElement.style.transform = 'translateY(0)';
    });
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSignup();
    }
});

// 오버레이 클릭으로 모달 닫기
document.getElementById('signupModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSignup();
    }
});

// 페이지 로드 시 첫 번째 입력 필드에 포커스
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').focus();
});