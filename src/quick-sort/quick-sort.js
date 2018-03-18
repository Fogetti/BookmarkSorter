class QuickSort {

    constructor(list) {
        this.list = list;
    }

    sort() {
        this.shuffle();
        this.runQuickSort(0, this.list.length - 1);
    }

    shuffle() {
        for (var i = 0; i < this.list.length; i++) {
            var rnd = this.randomInt(i+1);
            this.exch(this.list, i, rnd);
        }
    }

    randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    runQuickSort(lo, hi) {
        if (hi <= lo) return;
        var pivot = this.partition(lo, hi);
        this.runQuickSort(lo, pivot - 1);
        this.runQuickSort(pivot + 1, hi);
    }

    partition(lo, hi) {
        var i = lo, j = hi+1;
        while(true) {
            while(this.list[++i] > this.list[lo]) { if (i === hi) break; }
            while(this.list[--j] < this.list[lo]) { if (j === lo) break; }
            if (i >= j) break;
            this.exch(this.list, i, j);
        }
        this.exch(this.list, lo, j);
        return j;
    }

    exch(a, x, y) {
        var temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }

}