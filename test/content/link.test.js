import Link from '../../src/content/link.js'

describe('Link class', () => {
  describe('#isLinkable', () => {
    it('returns true if linkable links', () => {
    });
  })

  describe('#parseLink', () => {
    it('parses root links on people page', () => {
      let url = 'https://example.cybozu.com/k/#/people/user/alice';
      let link = Link.parseLink(url);

      expect(link.peopleId).to.equal('alice')
    });

    it('parses post links on people page', () => {
      let url = 'https://example.cybozu.com/k/#/people/user/alice/1234';
      let link = Link.parseLink(url);

      expect(link.peopleId).to.equal('alice')
      expect(link.postId).to.equal('1234')
    });

    it('parses comment links on people page', () => {
      let url = 'https://example.cybozu.com/k/#/people/user/alice/1234/5678';
      let link = Link.parseLink(url);

      expect(link.peopleId).to.equal('alice')
      expect(link.postId).to.equal('1234')
      expect(link.commentId).to.equal('5678')
    });

    it('parses root links on thread page', () => {
      let url = 'https://example.cybozu.com/k/#/space/1234/thread/5678';
      let link = Link.parseLink(url);

      expect(link.spaceId).to.equal('1234')
      expect(link.threadId).to.equal('5678')
    });

    it('parses post links on thread page', () => {
      let url = 'https://example.cybozu.com/k/#/space/1234/thread/5678/9012';
      let link = Link.parseLink(url);

      expect(link.spaceId).to.equal('1234')
      expect(link.threadId).to.equal('5678')
      expect(link.postId).to.equal('9012')
    });

    it('parses comment links on thread page', () => {
      let url = 'https://example.cybozu.com/k/#/space/1234/thread/5678/9012/3456';
      let link = Link.parseLink(url);

      expect(link.spaceId).to.equal('1234')
      expect(link.threadId).to.equal('5678')
      expect(link.postId).to.equal('9012')
      expect(link.commentId).to.equal('3456')
    });

    it('throws errors on unexpected URLs', () => {
      expect(() => Link.parseLink('')).to.throw()
      expect(() => Link.parseLink('https://example.cybozu.com/k/')).to.throw()
      expect(() => Link.parseLink('https://example.cybozu.com/k/#/space/1234')).to.throw()
    });
  });

  describe('#isRootPage', () => {
    it('returns true if root page', () => {
      let thread1 = 'https://example.cybozu.com/k/#/space/1234/thread/1234';
      expect(Link.parseLink(thread1).isRootPage()).to.be.true;

      let people1 = 'https://example.cybozu.com/k/#/people/user/alice';
      expect(Link.parseLink(people1).isRootPage()).to.be.true;
    })

    it('returns false if root page', () => {
      let thread1 = 'https://example.cybozu.com/k/#/space/1234/thread/5678/9012';
      expect(Link.parseLink(thread1).isRootPage()).to.be.false;

      let people1 = 'https://example.cybozu.com/k/#/people/user/alice/1234';
      expect(Link.parseLink(people1).isRootPage()).to.be.false;
    })
  })

  describe('#isSamePage', () => {
    it('returns true if same page', () => {
      let thread1 = 'https://example.cybozu.com/k/#/space/1234/thread/5678/9012/3456';
      let thread2 = 'https://example.cybozu.com/k/#/space/1234/thread/5678/9012';
      let thread3 = 'https://example.cybozu.com/k/#/space/1234/thread/5678';
      expect(Link.parseLink(thread1).isSamePageTo(Link.parseLink(thread2))).to.be.true;
      expect(Link.parseLink(thread1).isSamePageTo(Link.parseLink(thread3))).to.be.true;
      expect(Link.parseLink(thread2).isSamePageTo(Link.parseLink(thread3))).to.be.true;

      let people1 = 'https://example.cybozu.com/k/#/people/user/alice/1234/5678';
      let people2 = 'https://example.cybozu.com/k/#/people/user/alice/1234';
      let people3 = 'https://example.cybozu.com/k/#/people/user/alice';
      expect(Link.parseLink(people1).isSamePageTo(Link.parseLink(people2))).to.be.true;
      expect(Link.parseLink(people1).isSamePageTo(Link.parseLink(people3))).to.be.true;
      expect(Link.parseLink(people2).isSamePageTo(Link.parseLink(people3))).to.be.true;
    })

    it('returns false if not same page', () => {
      expect(
        Link.parseLink('https://example.cybozu.com/k/#/space/1234/thread/5678')
          .isSamePageTo(Link.parseLink('https://example.cybozu.com/k/#/space/1234/thread/abcd'))
      ).to.be.false;
      expect(
        Link.parseLink('https://example.cybozu.com/k/#/people/user/alice')
          .isSamePageTo(Link.parseLink('https://example.cybozu.com/k/#/people/user/bob'))
      ).to.be.false;
    })
  })
});
