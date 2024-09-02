function workoutPartial(){
    const templateCancelButton = document.getElementById('template-cancel');
    const newTemplateContent = document.getElementById('partials-new-template');
    
    const newTemplateButton = document.getElementById('new-template');
    const mainContent = document.getElementById('partials-content-workout');
    
    newTemplateButton.addEventListener('click', function() {
        mainContent.style.display = "none";
        newTemplateContent.style.display = "block";
    })

    templateCancelButton.addEventListener('click', function() {
        mainContent.style.display = "block";
        newTemplateContent.style.display = "none";
    })
}