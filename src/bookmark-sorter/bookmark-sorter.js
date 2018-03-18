/**
 * @customElement
 * @polymer
 */
HTMLImports.whenReady(function () {
  class BookmarkSorter extends Polymer.Element {

    ready() {
      super.ready();
      console.log(`Bookmark sorter is ready`);
      this.getList();
    }

    connectedCallback() {
      super.connectedCallback();
      console.log(`Bookmark sorter is connected`);
    }

    static get is() {
      return 'bookmark-sorter';
    }

    static get properties() {
      return {
        list: {
          type: Array,
          value: function () {
            return [];
          }
        }
      }
    }

    getList() {
      var stack = [];
      chrome.bookmarks.getTree((treeNodes) => {
        for (var index = 0; index < treeNodes.length; index++) {
          stack.push(treeNodes[index]);
          while (stack.length !== 0) {
            var treeNode = stack.pop();
            if (!treeNode.children && treeNode.url) {
              this.push('list', {id:treeNode.id,title:treeNode.url,url:treeNode.url});
            } else {
              for (var child = 0; child < treeNode.children.length; child++) {
                stack.push(treeNode.children[child]);
              }
            }
          }
        }
        let qs = new QuickSort(this.list);
        let ms = new MergeSort(this.list);
        qs.sort();
        ms.sort();
      });
    }

    isEmptyList_() {
      return this.list.length === 0;
    }

  }

  window.customElements.define(BookmarkSorter.is, BookmarkSorter);

});
