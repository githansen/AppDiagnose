import $ from 'jquery'


export function loggetinn() {
    const url = "/diagnose/ErLoggetInn"
    let innlogget = null;
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        success: function (data) {
            innlogget = data;
        }
    })
    return innlogget;
}


