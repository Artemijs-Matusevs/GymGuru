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






// UPDATING IN PROGRESS WORKOUT

//Store all the sets required for update
let completedSets = [];
let sendTimer;
const sendDelay = 1000; //10 secs


//Completed set
$(".complete-set-button").on("click", function() {

    const tableRow = $(this).closest(".table-row");
    const isDisabled = tableRow.find(".cell input").prop("disabled");

    //Toggle between the two states front-end
    tableRow.find(".cell").css("background-color", isDisabled ? "" : "#efc918");
    tableRow.find(".cell input").prop("disabled", !isDisabled);

    //Make the update on the back-end
    //Get the completed set details
    const setId = tableRow.attr("set-id");
    const setWeight = tableRow.find(".exercise-current-weight").val();
    const setReps = tableRow.find(".exercise-reps").val();


    //Change the completion status of the set
    const currentStatus = tableRow.attr("set-status") === "true";
    const newStatus = !currentStatus;
    tableRow.attr("set-status", newStatus);

    let set = {};
    set.set_id = setId;
    set.set_weight = setWeight;
    set.set_reps = setReps;
    set.set_status = newStatus;

    addSetToBatch(set);

});

//add new set to batch
function addSetToBatch(newSet){
    //Check to see if that set already exists in the list
    const existingIndex = completedSets.findIndex(set => set.set_id === newSet.set_id);

    if (existingIndex !== -1){
        //Relpace the existing set
        completedSets[existingIndex] = newSet;
    } else {
        //Add new set to the array
        completedSets.push(newSet);
    }

    clearTimeout(sendTimer);

    sendTimer = setTimeout(() => {
        sendBatchToServer();
    }, sendDelay);
}

//send sets to server
function sendBatchToServer() {
    //No sets to send
    if (completedSets.length === 0){
        return;
    }

    //Make ajax request
    $.ajax({
        url: "/update-workout",
        type: "POST",
        data: {sets: completedSets}, 
        success: function(response) {
            completedSets = [];
            console.log("Set updated");
        },
        error: function(xhr, status, error){
            console.error("Error updating set:", error);
        },
    })
}





//Get a specific query param
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}