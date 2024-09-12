//Script to dynamically load ejs partial templates

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    const content = document.getElementById('content');
    const dash = document.getElementById('main-dash');

    links.forEach(link => {

        link.addEventListener('click', function(event) {
            event.preventDefault();

            //TOGGLE ACTIVE CLASS
            links.forEach(l => l.classList.remove('active-button'));
            this.classList.add('active-button');

            //Get link data
            const page = this.getAttribute('data-page');

            //Change gradient of main-dash depending on the link
            if (page === "dashboard-main"){
                dash.style.background = 'linear-gradient(90deg, rgba(35,32,30,1) 50%, rgba(242,242,242,1) 50%)';
                links.forEach(l => l.style.color = 'rgba(242,242,242,1)');
            } else {
                dash.style.background = 'rgba(242,242,242,1)';
                links.forEach(l => l.style.color = 'rgba(35,32,30,1)');
            }
            
            //DYNAMICALLY CHANGE PAGE CONTENT
            fetch(`/${page}`)
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;
                if(page === "workout"){
                    workoutPartial();
                }
            })
            .catch(err => console.error('Error loading page:', err));
        });
    });
});

//Load the default page
fetch('/dashboard-main')
.then(response => response.text())
.then(html => {
    content.innerHTML = html;
})

//Remove alert message
$(".remove-alert-button").on("click", function() {
    $(".alert-message").hide();
})