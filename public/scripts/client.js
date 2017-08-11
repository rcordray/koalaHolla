console.log('js');

$(document).ready(function() {
    console.log('JQ');
    // load existing koalas on page load
    getKoalas();

    // add koala button click
    $('#addButton').on('click', function() {
        console.log('in addButton on click');
        // get user input and put in an object
        // NOT WORKING YET :(
        // using a test object
        var objectToSend = {
            name: $('#nameIn').val(),
            age: $('#ageIn').val(),
            gender: $('#genderIn').val(),
            ready_for_transfer: $('#readyForTransferIn').val(),
            notes: $('#notesIn').val()
        };

        // $.ajax({
        //         method: 'POST',
        //         url: '/koala',
        //         data: objectToSend,
        //         success: function(response) {
        //             console.log('post success', response);

        //         }
        //     })
        // call saveKoala with the new obejct
        saveKoala(objectToSend);
    }); //end addButton on click
    $('#viewKoalas').on('click', '.transferButton', function() {
        var transferId = $(this).parent().parent().data('id');
        $.ajax({
            method: 'PUT',
            url: '/koalas/' + transferId,
            success: function(response) {
                getKoalas();
            }
        })
    })
}); // end doc ready

function getKoalas() {
    console.log('in getKoalas');
    // ajax call to server to get koalas
    $.ajax({
        url: '/koalas',
        type: 'GET',
        success: function(data) {
                console.log('got some koalas: ', data);
                $('#viewKoalas').empty();
                for (var i = 0; i < data.length; i++) {
                    var koalaToDisplay = data[i];
                    var $koalaRowToDisplay = $('<tr class = "koalaRow"></tr>');
                    $koalaRowToDisplay.data('id', koalaToDisplay.id);
                    $koalaRowToDisplay.append('<td class = "koalaName">' + koalaToDisplay.name + '</td>');
                    $koalaRowToDisplay.append('<td class = "koalaAge">' + koalaToDisplay.age + '</td>');
                    $koalaRowToDisplay.append('<td class = "koalaGender">' + koalaToDisplay.gender + '</td>');
                    $koalaRowToDisplay.append('<td class = "koalaReadyForTransfer">' + koalaToDisplay.ready_for_transfer + '</td>');
                    $koalaRowToDisplay.append('<td class = "koalaNotes">' + koalaToDisplay.notes + '</td>');
                    if (koalaToDisplay.ready_for_transfer == 'N') {
                        console.log('Koala is going to be transferred');
                        $koalaRowToDisplay.append('<button class="transferButton">Transfer?</button>')

                    }
                    $('#viewKoalas').append($koalaRowToDisplay);

                }
            } // end success
    }); //end ajax
    // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala(newKoala) {
    console.log('in saveKoala', newKoala);
    // ajax call to server to get koalas
    $.ajax({
        url: '/koalas',
        type: 'POST',
        data: newKoala,
        success: function(data) {
                console.log('got some koalas: ', data);
                getKoalas();
            } // end success
    }); //end ajax
}