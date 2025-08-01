$(document).ready(function () {
    $('#fechaNacimiento').datepicker({
        dateFormat: "dd/mm/yyyy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:2000",
        showButtonPanel: true
    })
})