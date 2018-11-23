function js_redirect(url, timeout) {
    setTimeout(function() { window.location = url; }, timeout);
}

function showHide(id) {
    var el = $(id);
    if (el.style.display=='none') {
        el.show();
    } else {
        el.hide();
    }
}