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

//Completed set
$(".complete-set-button").on("click", function() {

    const tableRow = $(this).closest(".table-row");
    const isDisabled = tableRow.find(".cell input").prop("disabled");

    //Toggle between the two states front-end
    tableRow.find(".cell").css("background-color", isDisabled ? "" : "#efc918");
    tableRow.find(".cell input").prop("disabled", !isDisabled);

    //Make the update on the back-end
})

//Get a specific query param
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}