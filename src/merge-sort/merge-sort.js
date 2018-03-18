class MergeSort {

    constructor(list) {
        this.list = list;
    }

    sort() {
        this.runMergeSort([], 0, this.list.length - 1);
        console.log(this.list);
    }

    runMergeSort(A, lo, hi) {
        if (hi <= lo) return;
        var mid = lo + Math.floor((hi - lo) / 2);
        this.runMergeSort(A, lo, mid);
        this.runMergeSort(A, mid+1, hi);
        this.merge(A, lo, mid, hi);
    }

    merge(A, lo, mid, hi) {
        for(var k = lo; k <= hi; k++) {
            A[k] = this.list[k];
        }

        var i = lo, j = mid+1;
        for(k = lo; k <= hi; k++) {
            if (i > mid)          this.list[k] = A[j++];
            else if (j > hi)      this.list[k] = A[i++];
            else if (A[j] > A[i]) this.list[k] = A[j++];
            else                  this.list[k] = A[i++];
        }
    }

}