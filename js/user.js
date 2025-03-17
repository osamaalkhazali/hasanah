const form = document.querySelector('#register');

const userName = document.getElementById('name');
const userPhone = document.getElementById('phone');
const userAge = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const nameMessage = document.querySelector('.name-message');
const phoneMessage = document.querySelector('.phone-message');
const ageMessage = document.querySelector('.age-message');
const emailMessage = document.querySelector('.email-message');
const passwordMessage = document.querySelector('.password-message');
const registerMessage = document.querySelector('.register-message');

const char = document.querySelector('.char');
const uppercase = document.querySelector('.uppercase');
const oneNumber = document.querySelector('.oneNumber');
const oneSpecialChar = document.querySelector('.oneSpecialChar');

const removeError = (input, messageElement) => {
  input.addEventListener('input', () => {
    input.style.border = '';
    messageElement.classList.add('d-none');
  });
};


removeError(userName, nameMessage);
removeError(userPhone, phoneMessage);
removeError(userAge, ageMessage);
removeError(email, emailMessage);
removeError(password, passwordMessage);
removeError(confirmPassword, passwordMessage);


let mainUsers = [
  {
    id: 1,
    name: 'Luma Shrideh',
    phone : '0123456789',
    age : 25,
    email: 'luma@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
  },
  {
    id: 2,
    name : 'Osama Khazali',
    phone : '0123456789',
    age : 27,
    email: 'osama@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
    },
  {
    id: 3,
    name : 'Omar Ghassan',
    phone : '0123456789',
    age : 26,
    email: 'omar@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
  },
  {
    id: 4,
    name : 'Layan Alem',
    phone : '0123456789',
    age : 25,
    email: 'layan@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
  },
  {
    id: 5,
    name : 'Laith Qudah',
    phone : '0123456789',
    age : 25,
    email: 'laith@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
  },
  {
    id: 6,
    name : 'Alaa',
    phone : '0123456789',
    age : 25,
    email: 'alaa@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
  },
  {
    id: 7,
    name : 'Kalil',
    phone : '0123456789',
    age : 25,
    email: 'khalil@gmail.com',
    password: 'Asdfghjkl1*',
    activityHistory: [],
    donationHistory: []
  },
]


let users = JSON.parse(localStorage.getItem('users')) ?  JSON.parse(localStorage.getItem('users')) : mainUsers;


localStorage.setItem('users', JSON.stringify(users));

const validateEmail = (emailInput) => {
  if (users.some(user => user.email === emailInput.value)) {
    emailMessage.textContent = 'البريد الإلكتروني موجود مسبقًا';
    emailMessage.classList.remove('d-none');
    emailInput.style.border = '2px solid red';
    return false;
  }
  return true;
};

const validateAge = (ageInput) => {
  if (ageInput.value < 18) {
    ageMessage.textContent = 'يجب أن يكون العمر 18 سنة على الأقل';
    ageMessage.classList.remove('d-none');
    ageInput.style.border = '2px solid red';
    return false;
  }
  return true;
};

const validatePassword = (passwordInput, confirmPasswordInput) => {
  let isValid = true;
  passwordMessage.textContent = '';

  if (passwordInput.value.length < 8) {
    // passwordMessage.innerHTML += 'يجب أن تكون كلمة المرور 8 أحرف على الأقل <br>';
    char.style.textDecoration = 'line-through';
    char.style.color = 'red';
    isValid = false;
  } else {
    char.style.textDecoration = 'none';
    char.style.color = 'green';
  }

  if (!/[A-Z]/.test(passwordInput.value)) {
    // passwordMessage.innerHTML += 'يجب أن تحتوي على حرف كبير واحد على الأقل <br>';
    uppercase.style.textDecoration = 'line-through';
    uppercase.style.color = 'red';
    isValid = false;
  } else {
    uppercase.style.textDecoration = 'none';
    uppercase.style.color = 'green';
  }

  if (!/\d/.test(passwordInput.value)) {
    // passwordMessage.innerHTML += 'يجب أن تحتوي على رقم واحد على الأقل <br>';
    oneNumber.style.textDecoration = 'line-through';
    oneNumber.style.color = 'red';
    isValid = false;
  } else {
    oneNumber.style.textDecoration = 'none';
    oneNumber.style.color = 'green';
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
    // passwordMessage.innerHTML += 'يجب أن تحتوي على رمز خاص واحد على الأقل <br>';
    oneSpecialChar.style.textDecoration = 'line-through';
    oneSpecialChar.style.color = 'red';
    isValid = false;
  } else {
    oneSpecialChar.style.textDecoration = 'none';
    oneSpecialChar.style.color = 'green';
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    passwordMessage.innerHTML = 'كلمات المرور غير متطابقة <br>';
    confirmPasswordInput.style.border = '2px solid red';
    isValid = false;
  } else {
    confirmPasswordInput.style.border = '';
  }

  if (!isValid) {
    passwordMessage.classList.remove('d-none');
    passwordInput.style.border = '2px solid red';
  }

  return isValid;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  nameMessage.classList.add('d-none');
  phoneMessage.classList.add('d-none');
  ageMessage.classList.add('d-none');
  emailMessage.classList.add('d-none');
  passwordMessage.classList.add('d-none');
  registerMessage.classList.add('d-none');

  userName.style.border = '';
  userPhone.style.border = '';
  userAge.style.border = '';
  email.style.border = '';
  password.style.border = '';
  confirmPassword.style.border = '';

  // Reset password requirements styling
  char.style.textDecoration = 'none';
  char.style.color = 'inherit';
  uppercase.style.textDecoration = 'none';
  uppercase.style.color = 'inherit';
  oneNumber.style.textDecoration = 'none';
  oneNumber.style.color = 'inherit';
  oneSpecialChar.style.textDecoration = 'none';
  oneSpecialChar.style.color = 'inherit';

  let valid = true;

  if (userName.value.trim() === '') {
    nameMessage.textContent = 'الاسم مطلوب';
    nameMessage.classList.remove('d-none');
    userName.style.border = '2px solid red';
    valid = false;
  }

  if (userPhone.value.trim().length < 10) {
    phoneMessage.textContent = 'رقم الهاتف غير صحيح';
    phoneMessage.classList.remove('d-none');
    userPhone.style.border = '2px solid red';
    valid = false;
  }

  if (!validateAge(userAge)) valid = false;

  if (!validateEmail(email)) valid = false;

  if (!validatePassword(password, confirmPassword)) valid = false;

  if (valid) {
    registerMessage.textContent = ' تم التسجيل بنجاح';
    registerMessage.style.color = 'green';

    const user = {
      id: users.length + 1,
      name: userName.value,
      phone: userPhone.value,
      age: userAge.value,
      email: email.value,
      password: password.value,
      activityHistory: [],
      donationHistory: []
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = './register.html';
    // login()
  } else {
    registerMessage.classList.remove('d-none');
    registerMessage.style.color = 'red';
  }
});


password.addEventListener("input", () => {
  const passwordValue = password.value;

  // Check for minimum length
  if (passwordValue.length >= 8) {
    char.style.textDecoration = "line-through";
    char.style.color = "green";
  } else {
    char.style.textDecoration = "none";
    char.style.color = "red";
  }

  // Check for uppercase letter
  if (/[A-Z]/.test(passwordValue)) {
    uppercase.style.textDecoration = "line-through";
    uppercase.style.color = "green";
  } else {
    uppercase.style.textDecoration = "none";
    uppercase.style.color = "red";
  }

  // Check for number
  if (/\d/.test(passwordValue)) {
    oneNumber.style.textDecoration = "line-through";
    oneNumber.style.color = "green";
  } else {
    oneNumber.style.textDecoration = "none";
    oneNumber.style.color = "red";
  }

  // Check for special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
    oneSpecialChar.style.textDecoration = "line-through";
    oneSpecialChar.style.color = "green";
  } else {
    oneSpecialChar.style.textDecoration = "none";
    oneSpecialChar.style.color = "red";
  }

  // Add red border if any requirement is not met
  if (
    passwordValue.length < 8 ||
    !/[A-Z]/.test(passwordValue) ||
    !/\d/.test(passwordValue) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)
  ) {
    password.style.border = "2px solid red";
  } else {
    password.style.border = "2px solid green";
  }
});


// login
const formLogin = document.getElementById("login-form");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.querySelector(".login-message");


function login() {
  loginMessage.textContent = '';

  users = JSON.parse(localStorage.getItem('users'));

  let customer = users.filter(user => user.email === loginEmail.value);

  if (customer[0]) {
    if (customer[0].password === loginPassword.value) {
      console.log(customer[0].id);
      const userData = {
        id: customer[0].id,
        name: customer[0].name,
        phone: customer[0].phone,
        age: customer[0].age,
        email: customer[0].email,
        activityHistory: customer[0].activityHistory,
        donationHistory: customer[0].donationHistory
      };
      loginMessage.textContent = "✅ تم تسجيل الدخول بنجاح";
      loginMessage.style.color = "black";
      localStorage.setItem('user', JSON.stringify(userData));
      window.location.href = "../pages/donations.html";
    } else {
      loginMessage.textContent = "❌ كلمة المرور غير صحيحة";
      loginMessage.style.color = "red";
      loginMessage.classList.remove('d-none');
    }
  } else {
    loginMessage.textContent = "❌ البريد الإلكتروني غير موجود";
    loginMessage.style.color = "red";
    loginMessage.classList.remove('d-none');
  }
}

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  login()
  
});


