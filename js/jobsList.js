const jobsList = document.getElementById('tab-1');
const filterForm = document.getElementById('filterForm');
const searchByName = document.getElementById('searchByName');
const filterByLevel = document.getElementById('filterByLevel');
const filterByCountry = document.getElementById('filterByCountry');
const filterByRemote = document.getElementById('filterByRemote');



let jobs = []
let filteredJobs =[]


function jobQuery(job) {
  
  return `
                            <div class="job-item">
                            <div class="row align-items-center gy-3">
                              <!-- Logo Column -->
                              <div class="col-md-2 text-center text-md-center">
                                <img class="img-fluid border rounded-circle p-2" loading="lazy" src="${job.imageSrc}" 
                                    alt="Company Logo" style="width: 120px; height: 120px; object-fit: cover;">
                              </div>
                              <!-- Job Details Column -->
                              <div class="col-md-6 text-center text-md-start">
                                <h2 class="mb-3">${job.title}</h2>
                                <!-- Details in one line on large screens -->
                                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start mb-3">
                                  <span class="me-3"><i class="fa fa-building me-1"></i><strong>${job.company}</strong></span>
                                  <span class="me-3"><i class="fa fa-map-marker-alt me-1"></i>${job.country}</span>
                                  <span class="me-3"><i class="far fa-clock me-1"></i>${job.employmentType}</span>
                                  <span class="me-3"><i class="far fa-money-bill-alt me-1"></i>$${job.salary}</span>
                                  <span class="me-3"><i class="fa fa-home me-1"></i>${job.remote}</span>
                                  <span class="me-3"><i class="fas fa-level-up-alt me-1"></i>${job.level}</span>
                                  <span class="me-3"><i class="fa fa-tags me-1"></i>${job.category}</span>
                                </div>
                                <!-- Job Description -->
                                <p class="mt-2">${job.description}</p>
                                <!-- Skills -->
                                <div class="mt-2">
                                  <span><i class="fas fa-tools me-1"></i><strong>Skills:</strong></span>
                                  <span class="badge bg-light text-dark me-1 border">${job.skills.join('</span><span class="badge bg-light text-dark me-1 border">')}</span>
                                </div>
                                <!-- Benefits -->
                                <div class="mt-2">
                                  <span><i class="fas fa-gift me-1"></i><strong>Benefits:</strong></span>
                                  <span class="badge bg-light text-dark me-1 border">${job.benefits.join('</span><span class="badge bg-light text-dark me-1 border">')}</span>
                                </div>
                              </div>
                              <!-- Action Column -->
                              <div class="col-md-4 text-center text-md-end">
                                <div class="d-flex mb-3 justify-content-center justify-content-md-end">
                                  <!-- Save Job Button -->
                                  <a class="btn love btn-light btn-sm me-2" title="Save Job" >
                                    <i class="fa-solid fa-heart"></i>
                                  </a>
                                  <!-- Apply Now Button -->
                                  <a class="btn btn-primary btn-sm" href="mailto:${job.email}" onclick="history(${job.id})">
                                    <i class="fas fa-paper-plane me-1"></i>${check(job.id)}
                                  </a>
                                </div>
                                <!-- Application Deadline -->
                                <small><i class="far fa-calendar-alt me-1"></i>Deadline: ${job.applicationDeadline}</small>
                              </div>
                            </div>
                          </div>
    `
}



function history(id) {
  if (check(id) === 'Applied') {
    return
  }
  const userData = JSON.parse(localStorage.getItem('user'))
  userData.history.push(id)
  localStorage.setItem('user', JSON.stringify(userData))
  
  let allUsers = JSON.parse(localStorage.getItem('users'))
  allUsers.forEach(user => {
    if (user.id === userData.id) {
      user.history.push(id)
    }
  })
  localStorage.setItem('users', JSON.stringify(allUsers))

  document.querySelector(`a[onclick="history(${id})"]`).innerHTML = '<i class="fas fa-paper-plane me-1"></i> Applied'
}


function check(id) {
  const userData = JSON.parse(localStorage.getItem('user'))
  if (userData.history.includes(id)) {
    return 'Applied'
  } else {
    return 'Apply Now'
  }
}


const modalBody = document.querySelector('.modal-body');
const jobHistoryButton = document.getElementById('jobHistoryButton');
jobHistoryButton.addEventListener('click', () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  if (userData.history.length === 0) {
    modalBody.innerHTML = '<p>No jobs have been applied yet.</p>'
    return
  } else {
    modalBody.innerHTML = ''
  }
  userData.history.forEach(id => {
    const job = jobs.find(job => job.id === id);
    const jobElement = document.createElement('div');
    jobElement.classList.add('card');
    jobElement.classList.add('mb-3');
    jobElement.innerHTML = `
    <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <p class="card-text">Company: ${job.company}</p>
                    <p class="card-text">Duration: ${job.applicationDeadline}</p>
                  </div>
    `
    modalBody.append(jobElement);
  });
});



filterForm.addEventListener('submit' , (e) => {
  e.preventDefault()
  jobsList.innerHTML = ''
  filteredJobs =  jobs
  
  
  let levelQuery 
  let remoteQuery
  
  
  filterByLevel.value === 'Level' ? levelQuery = '' : levelQuery = filterByLevel.value
  filterByRemote.value === 'Remote' ? remoteQuery = '' : remoteQuery = filterByRemote.value
  
  
  
  console.log(filteredJobs)
  
  filteredJobs = filteredJobs.filter(job => (job.title.match(new RegExp(searchByName.value , 'ig'))
                                                  && job.level.match(new RegExp(levelQuery,'ig'))
                                                  && job.country.match(new RegExp(filterByCountry.value,'ig'))
                                                  && job.remote.match(new RegExp(remoteQuery,'ig'))
                                                ))

  filteredJobs.forEach(job => {
    const jobElement = document.createElement('div');
    jobElement.classList.add('job');
    jobElement.innerHTML = jobQuery(job);
    jobsList.appendChild(jobElement);
    
  });
})





fetch('../server/data.json')
  .then(response => response.json())
  .then(data => {
    jobs = data
    jobs.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('job');
      jobElement.innerHTML = jobQuery(job);

      jobsList.appendChild(jobElement);
    });
  })
  
  
  