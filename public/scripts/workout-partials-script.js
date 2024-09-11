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
        $("#template-exercise-list").html("");
        $(".template-name").text("Workout Template");
        $(".template-name-field").val("Workout Template");
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
            <div class="exercise-table-container" id="${divId}">
                <h2 class="partials-subtitle exercise-title"> ${exerciseName}</h2>
                <div class="exercise-header">
                    <h2 class="partials-subtitle partials-button add-set-button"> Add Set + </h2>
                    <h2 class="partials-subtitle partials-button remove-exercise"> Remove Exercise ×</h2>
                </div>
                <div class="exercise-table">
                    <div class="table-row header">
                        <div class="cell">Set</div>
                        <div class="cell">Previous</div>
                        <div class="cell">Current</div>
                        <div class="cell">Reps</div>
                        <div class="cell"></div>
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

    //Add set
    $(document).on("click", ".add-set-button", function() {
        //Find the exercise table the button is associated with in the DOM
        let table = $(this).closest(".exercise-table-container").find(".exercise-table");

        //Get current number of rows
        let currentSetNumber = table.find('.table-row').length;

        //New set row
        let newRow = `
            <div class="table-row">
                <div class="cell">${currentSetNumber}</div>
                <div class="cell"><input placeholder="kg" type="number"></div>
                <div class="cell"><input placeholder="kg" type="number"></div>
                <div class="cell"><input type="number"></div>
                <div class="cell partials-button remove-set-button"><ion-icon name="trash-bin-outline"></ion-icon></div>
            </div>
        `

        //Append to the table
        table.append(newRow);
    })

    //Remove set
    $(document).on("click", ".remove-set-button", function() {
        //Find the exercise table the button is associated with in the DOM
        let table = $(this).closest(".exercise-table-container").find(".exercise-table");

        //Remove the row
        $(this).parent().remove();

        //Update the current set numbers
        table.find('.table-row').not('.header').each(function(index) {
            $(this).find('.cell').first().text(index + 1);
        })
    })

    //Post new template to back-end
    $("#submit-new-template").on("click", function() {
        let workoutName = $(".template-name").text();


        $.ajax({
            url: '/new-template',
            type: 'POST',
            data: {template_name: workoutName},
            success: function(response) {
                console.log("New template posted")
                window.location.href = response.redirectUrl;
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        })
    })

 
}