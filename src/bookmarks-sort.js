$(() => {
    $("#bookmarks").empty();
    getList([]);
});
function getList(list) {
    var stack = [];
    chrome.bookmarks.getTree((treeNodes) => {
        for(var index = 0; index < treeNodes.length; index++) {
            stack.push(treeNodes[index]);
            while(stack.length !== 0) {
                var treeNode = stack.pop();
                if (!treeNode.children && treeNode.url) {
                    list.push(treeNode.url);
                } else {
                    for(var child = 0; child < treeNode.children.length; child++) {
                        stack.push(treeNode.children[child]);
                    }
                }
            }
        }
        quickSort(list);
        var ul = $("#bookmarks").append(`<ul></ul>`);
        while(list.length !== 0) {
            var url = list.pop();
            ul.append(`<li>${url}</li>`);
        }
    });
}

function mergeSort(list) {
    runMergeSort(list, [], 0, list.length - 1);
    console.log(list);
}
function runMergeSort(list, A, lo, hi) {
    if (hi <= lo) return;
    var mid = lo + Math.floor((hi - lo) / 2);
    runMergeSort(list, A, lo, mid);
    runMergeSort(list, A, mid+1, hi);
    merge(list, A, lo, mid, hi);
}
function merge(list, A, lo, mid, hi) {
    for(var k = lo; k <= hi; k++) {
        A[k] = list[k];
    }

    var i = lo, j = mid+1;
    for(k = lo; k <= hi; k++) {
        if (i > mid)          list[k] = A[j++];
        else if (j > hi)      list[k] = A[i++];
        else if (A[j] > A[i]) list[k] = A[j++];
        else                  list[k] = A[i++];
    }
}

function quickSort(list) {
    shuffle(list);
    runQuickSort(list, 0, list.length - 1);
}
function shuffle(list) {
    for (var i = 0; i < list.length; i++) {
        var rnd = randomInt(i+1);
        exch(list, i, rnd);
    }
}
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function runQuickSort(list, lo, hi) {
    if (hi <= lo) return;
    var pivot = partition(list, lo, hi);
    runQuickSort(list, lo, pivot - 1);
    runQuickSort(list, pivot + 1, hi);
}
function partition(list, lo, hi) {
    var i = lo, j = hi+1;
    while(true) {
        while(list[++i] > list[lo]) { if (i === hi) break; }
        while(list[--j] < list[lo]) { if (j === lo) break; }
        if (i >= j) break;
        exch(list, i, j);
    }
    exch(list, lo, j);
    return j;
}
function exch(a, x, y) {
    var temp = a[x];
    a[x] = a[y];
    a[y] = temp;
}

function heapSort(list) {}