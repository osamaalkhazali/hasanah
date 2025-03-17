const userCard = document.querySelector(".user-card");
const userData = JSON.parse(localStorage.getItem('user'))
const historyList = document.querySelector(".history-list");
const history = userData.history
let jobs = []



  
  

userCard.innerHTML = 
`
<div class="text-center">
            <!-- User Avatar -->
            <img
              src="https://dummyimage.com/150x150/0e2f4e/4793c7?text=${userData.name}"
              alt="User Avatar"
              class="img-fluid rounded-circle p-2 border"
              style="width: 150px; aspect-ratio:1/1 ; object-fit: cover"
            />
            <!-- User Details -->
            <h2 class="mt-3 mb-2">${userData.name}</h2>
            <p class="details mb-3">
              <span class="fw-bold">رقم الهاتف:</span> ${userData.phone} <br />
              <span class="fw-bold">الإيميل:</span> ${userData.email} <br />
              <span class="fw-bold">العمر:</span> ${userData.age}
            </p>
            <div class="social-links">
              <a href="#" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
              <a href="#" title="GitHub"><i class="fa-brands fa-github"></i></a>
              <a href="#" title="Portfolio"><i class="fa-solid fa-globe"></i></a>
            </div>
          </div>
`

