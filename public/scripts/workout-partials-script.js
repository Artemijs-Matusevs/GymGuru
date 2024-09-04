function workoutPartial(){
    const templateCancelButton = document.getElementById('template-cancel');
    const newTemplateContent = document.getElementById('partials-new-template');
    
    const newTemplateButton = document.getElementById('new-template');
    const mainContent = document.getElementById('partials-content-workout');
    
    newTemplateButton.addEventListener('click', function() {
        mainContent.style.display = "none";
        newTemplateContent.style.display = "flex";
    })

    templateCancelButton.addEventListener('click', function() {
        mainContent.style.display = "block";
        newTemplateContent.style.display = "none";
    })

    //Changing name for template
    $(".partials-template-name-form").hide();


    //On edit buton hide the h2 name and show the input field
    $(".edit-name-button").on("click", function() {
        //Set the name of the input box to the name of the template
        $(".template-name-field").attr('value', $(".template-name").text());

        $(".partials-template-name").hide();
        $(".partials-template-name-form").show();
    })

    //Cancel edit name form
    $(".cancel-name-button").on("click", function() {
        $(".partials-template-name").show();
        $(".partials-template-name-form").hide();
    })

    //Confirm edit name form
    $(".confirm-name-button").on("click", function() {
        //Set new name title
        $(".template-name").text($(".template-name-field").val());

        $(".partials-template-name").show();
        $(".partials-template-name-form").hide();
    })

    //Selecting exercise
    $(".exercise").on("click", function() {
        //alert($(this).text());
        let exerciseName = $(this).text();
        let divId = exerciseName.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() + "-" + Date.now();
        let htmlTable = `
            <div id="${divId}">
                <div class="partials-template-name">
                    <h2 class="partials-subtitle"> ${exerciseName}</h2>
                    <ion-icon class="partials-icon-button remove-exercise" name="close-outline"></ion-icon>
                </div>
                <div class="exercise-table">
                    <div class="table-row header">
                        <div class="cell">Set</div>
                        <div class="cell">Previous</div>
                        <div class="cell">kg</div>
                        <div class="cell">Reps</div>
                    </div>
                </div>
            </div>
        `

        //Insert the html 
        $("#template-exercise-list").append(htmlTable);
    })

    //Remove exercise
    $(document).on("click", ".remove-exercise", function() {
        let parentId = $(this).parents().eq(1).attr('id');

        $("#" + parentId).remove();
    })
 
}