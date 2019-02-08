import Link from './link';
import * as navigators from './navigators';

let target = window.document.body;
let config = { attributes: false, childList: true, subtree: true };
let observer = new MutationObserver((mutations) => {
  if (!Link.isLinkable(location.href)) {
    return;
  }
  let current = Link.parseLink(location.href);
  for (let m of mutations) {
    for (let node of m.addedNodes) {
      if (node.nodeName === "#text") {
        continue;
      }
      let as = node.querySelectorAll('a');
      for (let a of as) {
        if (!a.href) {
          continue
        }
        if (!Link.isLinkable(a.href)) {
          continue
        }
        let link = Link.parseLink(a.href);
        if (link.isRootPage()) {
          continue;
        }

        if (!link.isSamePageTo(current)) {
          continue;
        }
        navigators.addNavigator(a);
      }
    }
  }
});
observer.observe(target, config);
