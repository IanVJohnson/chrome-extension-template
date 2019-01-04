// content.js

/*
Message passing

A content script has access to the current page, but is limited in the APIs it can access.For example, it cannot listen for clicks on the browser action.We need to add a different type of script to our extension, a background script, which has access to every Chrome API but cannot access the current page.As Google puts it:

Content scripts have some limitations.They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.

So the content script will be able to pull a URL out of the current page, but will need to hand that URL over to the background script to do something useful with it.In order to communicate, we’ll use what Google calls message passing, which allows scripts to send and listen for messages.It is the only way for content scripts and background scripts to interact.
*/

chrome.runtime.bookmarks.onCreated.addListener(function(id) {
  console.log('test');
  // chrome.bookmarks.move(id, { parentId: '2' });
});

// runs code on extension icon click
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    document.onselectstart = function() {
      getLineLength();
    };

    var getLineLength = function() {
      var selection = window.getSelection(),
        selectedText = selection.toString(),
        selectedTextLength = selectedText.length;

      if (selectedTextLength > 0) {
        var selectionElement = selection.baseNode.parentElement,
          div = document.createElement('div'),
          styles = `position: absolute; right: 0; padding: .5rem; background-color: #f7f7f7; font-size: 1rem; font-weight: 600; margin-top: -4rem;`;

        div.innerHTML = selectedTextLength;
        div.style = styles;

        selectionElement.append(div);
      }
    };
  }
});
