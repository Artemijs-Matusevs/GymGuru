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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}