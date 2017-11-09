// We use here some Javascript instead of taking exclusively advantage of
// the simple "content_scripts.css" property of the manifest file.
// This is due to the fact that Chrome loads our extension before any DOM,
// meaning our CSS is loaded before the website's theme and therefore don't override it.
// The solution is to insert (again) our style sheet right after the head is appended to the DOM.
(function () {
    // We detect Firefox.
    // Firefox don't need this special handling.
    if (typeof browser !== 'undefined')
        return;
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = chrome.extension.getURL("style.css");
    let linkAppended = false;
    document.addEventListener('DOMSubtreeModified', function onSubtreeModified() {
        if (linkAppended || !document.head)
            return;
        linkAppended = true;
        document.head.appendChild(link);
        document.removeEventListener('DOMSubtreeModified', onSubtreeModified, false);
    }, false);
})();