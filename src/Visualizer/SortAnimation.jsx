export function bubble_sort(arr) {
    const animations = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < (arr.length - i - 1); j++) {
            animations.push(JSON.stringify({type: 'comp', idx: [j, j + 1],}));

            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                animations.push(JSON.stringify({type: 'swap', idx: [j, j + 1],}));
            }
        }
    }
    return animations;
}

export function selection_sort(arr) {
    const animations = [];
    let min_idx = 0;

    for (let i = 0; i < arr.length; i++) {
        min_idx = i;

        for (let j = i + 1; j < arr.length; j++) {
            animations.push(JSON.stringify({type: 'comp', idx: [min_idx, j],}));

            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }

        animations.push(JSON.stringify({type: 'swap', idx: [min_idx, i],}))

        const tmp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = tmp;
    }

    return animations;
}

export function insertion_sort(arr) {
    const animations = [];

    for(let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i-1;

        while(j >= 0 && arr[j] > key) {
            animations.push(JSON.stringify({type: 'comp', idx: [j, i]}))
            animations.push(JSON.stringify({type: 'swap', idx: [j+1, j]}))
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }

    return animations;
}

export function merge_sort(arr, l, r, animations) {
    if (l >= r) {
        return;
    }
    let midpoint = l + Math.floor((r-l)/2);
    merge_sort(arr, l, midpoint, animations);
    merge_sort(arr, midpoint + 1, r, animations);
    merge(arr, l, midpoint, r, animations);
}

function merge(arr, l, midpoint, r, animations) {
    let start2 = midpoint + 1;

    if(arr[midpoint] <= arr[start2]) {
        return;
    }

    while(l <= midpoint && start2 <= r) {
        animations.push(JSON.stringify({type: 'comp', idx: [l, start2]}))
        if(arr[l] <= arr[start2]) {
            l++;
        } else {
            let value = arr[start2];
            let index = start2;

            while(index !== l) {
                animations.push(JSON.stringify({type: 'comp', idx: [index, index-1]}))
                animations.push(JSON.stringify({type: 'swap', idx: [index, index-1]}))
                arr[index] = arr[index - 1];
                index--;
            }
            arr[l] = value;
            l++;
            midpoint++;
            start2++;
        }
    }

    console.log(arr)
}

export function quick_sort(arr, l, r, animations) {
    if(l < r) {

    }
}