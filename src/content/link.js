export default class Link {
  constructor({
    peopleId,
    spaceId,
    threadId,
    postId,
    commentId,
  }) {
    this.peopleId = peopleId;
    this.spaceId = spaceId;
    this.threadId = threadId;
    this.postId = postId;
    this.commentId = commentId;
  }

  static parseLink(href) {
    let words = new URL(href).hash.split('/');
    if (words[1] === 'people') {
      return new Link({
        peopleId: words[3],
        postId: words[4],
        commentId: words[5],
      });
    }
    if (words[1] === 'space' && words.length >= 5) {
      return new Link({
        spaceId: words[2],
        threadId: words[4],
        postId: words[5],
        commentId: words[6],
      });
    }
    throw new TypeError('unexpected URL: ' + href);
  }

  static isLinkable(href) {
    let words = new URL(href).hash.split('/');
    return words[1] === 'people' || words[1] === 'space' && words.length >= 5;
  }

  isSamePageTo(other) {
    if (!(other instanceof Link)) {
      throw new TypeError('not link object');
    }
    return this.peopleId === other.peopleId &&
      this.spaceId === other.spaceId &&
      this.threadId === other.threadId;
  }
}
