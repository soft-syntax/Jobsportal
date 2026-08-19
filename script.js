document.querySelector(".button-container")
.addEventListener('click', () =>  {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filteredJobs(jobs, text);
        showJobs(filteredJobs);
    })
})


function getJobs() {
    return fetch("data.json")
    .then (response => response.json())
    .then (data => {
        console.log(data);
        return data
    })
}

function filteredJobs(jobs, searchText) {
    if(searchText) {
        let filteredItems = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText)
            || job.type.toLowerCase().includes(searchText)
            || job.company.toLowerCase().includes(searchText)
            || job.requirements.content.toLowerCase().includes(searchText)){
                return true;
            } else {
                return false;
            }
        })
        return filteredJobs;
    } else {
        return jobs;
    }
}

function showJobs (jobs) {
    console.log(jobs);
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
        jobsHTML += `
            <div class="jobs-tile">
                <div class="top">
                    <img src="${job.logo}" alt="">
                    <span><i class="fas fa-ellipsis-h"></i></span>
                </div>
                <div class="role-name">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                
                <div class="buttons">
                    <div class="button apply-now">Apply NOw</div>
                    <div class="button"> Message</div>
                </div>
            </div>`        
    })
    jobsContainer.innerHTML = jobsHTML;

}

getJobs().then(data => {
    showJobs(data);
});
