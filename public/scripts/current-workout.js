//Cancel the curren workout
$("#cancel-workout-button").on("click", function() {
    const progressId = getQueryParam("progress_id");

    $.ajax({
        url: `/cancel-workout?progress_id=${progressId}`,
        type: 'DELETE',
        success: function (response){
            window.location.href = response.redirectUrl;
        },
        error: function (xhr, status, error){
            console.error('Failed to cancel workout:', error);
        }
    })
});


//Debounce timer to limit the amount of calls sent to the back-end
let debounceTimer;

//Completed set
$(".complete-set-button").on("click", function() {
    //Clear existing timer
    clearTimeout(debounceTimer);

    const tableRow = $(this).closest(".table-row");
    const isDisabled = tableRow.find(".cell input").prop("disabled");

    //Toggle between the two states front-end
    tableRow.find(".cell").css("background-color", isDisabled ? "" : "#efc918");
    tableRow.find(".cell input").prop("disabled", !isDisabled);


    debounceTimer = setTimeout(() => {
    
        //Make the update on the back-end
        //Get the completed set details
        const setId = tableRow.attr("set-id");
        const setWeight = tableRow.find(".exercise-current-weight").val();
        const setReps = tableRow.find(".exercise-reps").val();
    
        //Change the completion status of the set
        const currentStatus = tableRow.attr("set-status") === "true";
        const newStatus = !currentStatus;
        tableRow.attr("set-status", newStatus);
    
    
        //Make the call to the back-end
        $.ajax({
            url: "/update-workout",
            type: "POST",
            data: {set_id: setId}, 
            success: function(response) {
                console.log("Set updated");
            },
            error: function(xhr, status, error){
                console.error("Error updating set:", error);
            }
        })

    }, 2000); // 300 ms
})

//Get a specific query param
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}