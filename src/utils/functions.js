import { Random, MersenneTwister19937 } from "random-js"

export const bubbleSort = (array) => {
    const copyArray = [...array]; // To create a shallow copy

    const n = copyArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (copyArray[j] > copyArray[j + 1]) {
                // Swap array[j] and array[j + 1]
                const temp = copyArray[j];
                copyArray[j] = copyArray[j + 1];
                copyArray[j + 1] = temp;
            }
        }
    }

    return copyArray;
}

export const insertionSort = (array) => {
    const copyArray = [...array]; // To create a shallow copy
    const n = copyArray.length;
    for (let i = 1; i < n; i++) {
        const key = copyArray[i];
        let j = i - 1;

        while (j >= 0 && copyArray[j] > key) {
            copyArray[j + 1] = copyArray[j];
            j -= 1;
        }
        copyArray[j + 1] = key;
    }
    return copyArray;
}

export const selectionSort = (array) => {
    const copyArray = [...array]; // To create a shallow copy
    for (let i = 0; i < copyArray.length; i++) {
        let lowest = i
        for (let j = i + 1; j < copyArray.length; j++) {
            if (copyArray[j] < copyArray[lowest]) {
                lowest = j
            }
        }
        if (lowest !== i) {
            // Swap
            [copyArray[i], copyArray[lowest]] = [copyArray[lowest], copyArray[i]]
        }
    }
    return copyArray
}

export const mergeSort = (array) => {
    const copyArray = [...array];
    if (copyArray.length < 2) {
        return copyArray;
    }

    const middle = Math.floor(copyArray.length / 2);
    const [left, right, newArray] = [mergeSort(copyArray.slice(0, middle)), mergeSort(copyArray.slice(middle)), []];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            newArray.push(left.shift());
        } else {
            newArray.push(right.shift());
        }
    }

    return [...newArray, ...left, ...right];
};

export const quickSort = (array) => {
    if (array.length <= 1) {
        return array;
    }
    const r = new Random(MersenneTwister19937.seed())
    const copyArray = [...array]; // To create a shallow copy
    const pivot = copyArray[r.integer(0, copyArray.length - 1)]
    const [left, right] = [[], []];

    for (const number of copyArray) {
        if (number > pivot) {
            right.push(number)
        } else if (number < pivot) {
            left.push(number);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}

export const shellSort = (array) => {
    const copyArray = [...array]; // To create a shallow copy
    const length = copyArray.length;
    let gap = Math.floor(length / 2);

    while (gap > 0) {
        for (let i = gap; i < length; i++) {
            const temp = copyArray[i];
            let j = i;
            while (j >= gap && copyArray[j - gap] > temp) {
                copyArray[j] = copyArray[j - gap];
                j -= gap;
            }
            copyArray[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return copyArray;
}

export const randomizeArray = (array) => {
    const copyArray = [...array]; // To create a shallow copy
    const r = new Random(MersenneTwister19937.seed());
    return r.shuffle(copyArray);
}

export const capitalize = (string) => `${string.at(0).toUpperCase()}${string.slice(1)}`;
