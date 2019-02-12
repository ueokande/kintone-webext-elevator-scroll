import Link from './link';
import * as pages from './pages';

const addNavigator = (dom) => {
  dom.addEventListener('click', (e) => {
    let link = Link.parseLink(e.target.href);
    let targetElement = pages.queryCommentElement(link.postId, link.commentId);
    if (!targetElement) {
      return;
    }

    let oldElement = pages.queryHighlightedElement();
    if (oldElement) {
      pages.unsetHighlight(oldElement);
    }
    pages.setHighlight(targetElement);

    let scroller = window.document.scrollingElement;

    let targetRect = targetElement.getBoundingClientRect();
    scroller.scrollBy({
      left: targetRect.left,
      top: targetRect.top - 100,
      behavior: 'smooth',
    });

    e.preventDefault();
    e.stopPropagation();
  });
};

export { addNavigator };
