function workoutPartial(){
    //Get new template section
    $("#new-template").on('click', function() {
        $("#partials-content-workout").hide();

        //Swtich submition buttons (Edit template/New template)
        $("#submit-new-template").show();
        $("#submit-edit-template").hide();

        $("#partials-new-template").css("display", "flex");
    })

    //Cancel template and reset template name etc...
    $("#template-cancel").on('click', function() {
        $("#partials-content-workout").css("display", "block");
        $("#partials-new-template").hide();
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
        let exerciseId = $(this).attr('exercise-id');
        let order = $(".exercise-title").length + 1;//To keep track of the order of the exercises
        let divId = exerciseName.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() + "-" + Date.now();
        let htmlTable = `
            <div class="exercise-table-container" id="${divId}">
                <div class="exercise-header">
                    <h2 exercise-order="${order}" template-exercise-id="0" exercise-id="${exerciseId}" class="partials-subtitle exercise-title template-exercise"> ${exerciseName}</h2>
                    <div class="exercise-header-buttons">
                        <ion-icon class="partials-icon-button add-set-button" name="add-circle"></ion-icon>
                        <ion-icon class="partials-icon-button remove-exercise" name="trash-bin"></ion-icon>
                    </div>
                </div>
                <div class="exercise-table">
                    <div class="table-row header">
                        <div class="cell">Set</div>
                        <div class="cell">Weight</div>
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
        let parentId = $(this).parents().eq(2).attr('id');

        $("#" + parentId).remove();
    })

    //Add set
    $(document).off("click", ".add-set-button").on("click", ".add-set-button", function() {
        //Find the exercise table the button is associated with in the DOM
        let table = $(this).closest(".exercise-table-container").find(".exercise-table");

        //Get current number of rows
        let currentSetNumber = table.find('.table-row').length;

        //New set row
        let newRow = `
            <div class="table-row exercise-set">
                <div class="cell exercise-set-number">${currentSetNumber}</div>
                <div class="cell"><input class="exercise-current-weight" placeholder="kg" value="0" type="number"></div>
                <div class="cell"><input class="exercise-reps" value="0" type="number"></div>
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
    });


    //Delete template
    $(document).on("click", ".delete-workout-button", function() {

        //alert("Test");

        //Get the ID of the template
        let parentDiv = $(this).closest('.saved-template');
        let template_id = parentDiv.attr('template-id');

        //send DELETE request
        $.ajax({
            url: `/delete-template?template_id=${template_id}`,
            type: 'DELETE',
            success: function (response){
                window.location.href = response.redirectUrl;
            },
            error: function (xhr, status, error){
                console.error('Failed to delete template:', error);
            }
        })
    });

    //Start template
    $(document).on("click", ".start-workout-button", function() {
        //alert("TEST");

        //Get the ID of the template
        let parentDiv = $(this).closest('.saved-template');
        let template_id = parentDiv.attr('template-id');

        //alert(template_id);
        //Send POST request to start new template
        $.ajax({
            url: '/start-workout',
            type: 'POST',
            data: {template_id: template_id},
            success: function(response) {
                console.log("New template started")
                window.location.href = response.redirectUrl;
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        })
    })

    //Edit saved template
    $(document).on("click", ".edit-workout-button", function() {
        $("#template-exercise-list").empty();

        //Get parent container and template name
        const parentContainer = $(this).closest(".saved-template");
        const template_id = parentContainer.attr('template-id');
        const templateName = parentContainer.find(".partials-subtitle").text();

        $("#submit-edit-template").attr('template-id', template_id);

        //Make Ajax call to get saved template details
        //send GET request
        $.ajax({
            url: `/get-template?template_id=${template_id}`,
            type: 'GET',
            success: function (response){
                //Populate the field
                response.template.forEach((exercise) => {

                    let divId = exercise.exercise_name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() + "-" + Date.now();

                    let htmlTable = `
                    <div class="exercise-table-container" id="${divId}">
                        <div class="exercise-header">
                            <h2 exercise-order="${exercise.exercise_order}" template-exercise-id="${exercise.exercise_id}" class="partials-subtitle exercise-title template-exercise"> ${exercise.exercise_name}</h2>
                            <div class="exercise-header-buttons">
                                <ion-icon class="partials-icon-button add-set-button" name="add-circle"></ion-icon>
                                <ion-icon class="partials-icon-button remove-exercise" name="trash-bin"></ion-icon>
                            </div>
                        </div>
                        <div class="exercise-table">
                            <div class="table-row header">
                                <div class="cell">Set</div>
                                <div class="cell">Weight</div>
                                <div class="cell">Reps</div>
                                <div class="cell"></div>
                            </div>
                        </div>
                    </div>
                    `
        
                    //Insert the html 
                    $("#template-exercise-list").append(htmlTable);

                    exercise.sets.forEach((set) => {
                        //Find the exercise table the button is associated with in the DOM
                        let table = $(`#${divId}`).find(".exercise-table");

                        console.log(set);

                        //New set row
                        let newRow = `
                            <div class="table-row exercise-set">
                                <div class="cell exercise-set-number">${set.set_number}</div>
                                <div class="cell"><input class="exercise-current-weight" placeholder="kg" value="${set.weight}" type="number"></div>
                                <div class="cell"><input class="exercise-reps" value="${set.reps}" type="number"></div>
                                <div class="cell partials-button remove-set-button"><ion-icon name="trash-bin-outline"></ion-icon></div>
                            </div>
                        `

                        //Append to the table
                        table.append(newRow);
                    })
                });

                //Change template name input field and sub-title          
                $(".template-name").text(templateName);
                $(".template-name-field").val(templateName);

                //Hide main content and display the edit template content
                $("#partials-content-workout").hide();
                $("#partials-new-template").css("display", "flex");

                //Swtich submition buttons (Edit template/New template)
                $("#submit-new-template").hide();
                $("#submit-edit-template").show();
            },
            error: function (xhr, status, error){
                console.error('Failed to delete template:', error);
            }
        })
    })

    $("#exercise-search-bar").on("input", function () {
        const searchValue = $(this).val().toLowerCase();
    
        if (searchValue === "") {
            // Show all alphabet titles and exercises when the search bar is empty
            $(".alphabet-title").show();
            $(".exercise").show();
        } else {
            // Hide all alphabet titles initially
            $(".alphabet-title").hide();
    
            // Filter exercises
            $(".exercise").each(function () {
                const exerciseName = $(this).data("name");
                if (exerciseName.includes(searchValue)) {
                    $(this).show();
    
                    // Show the corresponding alphabet title
                    $(this).prevAll(".alphabet-title:first").show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
    

    //Post new template to back-end
    $("#submit-new-template").on("click", function() {
        //Get name of new template
        let workoutName = $(".template-name").text();

        //Get all exercise ID's and order and convert to jQuery object
        let exercises = $(".template-exercise").map(function() {
            let exerciseId = $(this).attr("exercise-id");
            let order = $(this).attr("exercise-order");

            //Get sets associated with each exercise
            let sets = $(this).closest(".exercise-table-container").find(".exercise-set").map(function() {
                return {
                    setNumber: $(this).find(".exercise-set-number").text(),
                    weight: $(this).find(".exercise-current-weight").val(),
                    reps: $(this).find(".exercise-reps").val(),

                }
            }).get();

            return {
                id: exerciseId,
                order: order,
                sets: sets
            };
        }).get();

        //Make the post request to the back-end with data of the new workout template
        $.ajax({
            url: '/new-template',
            type: 'POST',
            data: {template_name: workoutName, exercises: exercises},
            success: function(response) {
                console.log("New template posted")
                window.location.href = response.redirectUrl;
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        })
    });



    //update template
    $("#submit-edit-template").on("click", function() {
        //Get name of new template
        let templateId = $("#submit-edit-template").attr('template-id');
        let workoutName = $(".template-name").text();
        //alert(templateId);

        //Get all exercise ID's and order and convert to jQuery object
        let exercises = $(".template-exercise").map(function() {
            let templateExerciseId = $(this).attr("template-exercise-id");
            let exerciseId = $(this).attr("exercise-id");
            let order = $(this).attr("exercise-order");

            //Get sets associated with each exercise
            let sets = $(this).closest(".exercise-table-container").find(".exercise-set").map(function() {
                return {
                    setNumber: $(this).find(".exercise-set-number").text(),
                    weight: $(this).find(".exercise-current-weight").val(),
                    reps: $(this).find(".exercise-reps").val(),

                }
            }).get();

            return {
                template_exercise_id: templateExerciseId,
                exercise_id: exerciseId,
                order: order,
                sets: sets
            };
        }).get();

        //Make the post request to the back-end with data of the new workout template
        $.ajax({
            url: '/edit-template',
            type: 'PUT',
            data: {template_name: workoutName, template_id: templateId, exercises: exercises},
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