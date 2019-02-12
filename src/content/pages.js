const HIGHLIGHT_CLASS = 'ocean-ui-comments-commentbase-featured';

const setHighlight = (elem) => {
  elem.classList.add(HIGHLIGHT_CLASS);
}

const unsetHighlight = (elem) => {
  elem.classList.remove(HIGHLIGHT_CLASS);
}

const queryHighlightedElement = () => {
  return  document.querySelector('.' + HIGHLIGHT_CLASS);
};

const queryCommentElement = (postId, commentId) => {
  let selector;
  if (!commentId) {
    selector = '.ocean-ui-comments-post-id-' + postId
  } else {
    selector = [
      '.ocean-ui-comments-post-id-' + postId,
      '.ocean-ui-comments-comment-id-' + commentId,
    ].join(' ');
  }
  return document.querySelector(selector);
}

export {
  setHighlight, unsetHighlight, queryHighlightedElement,
  queryCommentElement,
};
