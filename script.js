// 1. Implement a function that converts a Javascript value into a JSON string.
function toJSON(value) {
    return JSON.stringify(value);
}

// 2. Implement a function that performs a deep copy of a value, but also handles circular references.
function deepCopy(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (map.has(obj)) {
        return map.get(obj);
    }
    const copy = Array.isArray(obj) ? [] : {};
    map.set(obj, copy);
    for (const key in obj) {
        copy[key] = deepCopy(obj[key], map);
    }
    return copy;
}

// 3. Implement a function to construct a table of contents from an HTML document.
function createTableOfContents() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const toc = document.createElement('ul');

    headings.forEach((heading, index) => {
        const anchor = document.createElement('a');
        const listItem = document.createElement('li');

        // Set a unique id for each heading if it doesn't already have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }

        // Create a link to the heading
        anchor.href = '#' + heading.id;
        anchor.textContent = heading.textContent;

        listItem.appendChild(anchor);
        toc.appendChild(listItem);
    });

    return toc;
}

// To use the function, you can append the table of contents to a specific element in your HTML
document.body.appendChild(createTableOfContents());
// This function creates a list(`<ul>`) where each item (`<li>`) contains a link (<a>) to a heading in the document.
// It also ensures that each heading has a unique 'id' attribute, which is used for the anchor's 'href'.
// To use this function, simply call it and append the returned element to your document wherever you want the table of contents to appear.


// 4. Implement a function to filter rows of data matching a specified requirement. 
function filterRows(data, condition) {
    return data.filer(row => condition(row));
}

// 5. Implement a function that performs insertion sort.
function insertionSort(arr) {
    for (let i = 1; 1 < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

// 6. Implement a function that returns a memoized version of a function which accepts any number of arguments.
function memoize(func) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// 7. Implement a function that acts like setinterval but returns a function to cancel the Interval.
function customSetInterval(callback, interval) {
    let timerId = setInterval(callback, interval);
    return function cancel() {
        clearInterval(timerId);
    };
}

// 8. Implement a function that merges two objects together.
function mergeObjects(obj1, obj2) {
    return {...obj1, ...obj2};
}

// 9. Implement a function to highlight text if searched terms appear within it.
// This is typically done in a browser context with DOM manipulation. The implementation would depend on how the text and the HTML are structured.
function highlightText(searchTerm, textContainer) {
    const regex = new RegExp(searchTerm, 'gi');
    textContainer.innerHTML = textContainer.textContent.replace(regex, match => `<span class="highlight">${match}</span>`);
}

//Ensure that there's an element in your HTML with the ID 'text-container'
const textContainer = document.getElementById('text-container');
highlightText('search term', textContainer);

// 'searchTerm' is the term you want to highlight within the text.
// 'textContainer' is the DOM element containing the text where the search will be performed.
// The function creates a regular expression from the 'searchTerm' which: 
// is case-insensitive('i' flag).
// finds all matches('g' flag).
/* Then, it replaces each occurrence of the 'searchTerm' in the 'textContainer's text with a span element that wraps the matching text. 
This span element has a class named 'highlight', which you can style in your css. */


// 10. Implement a function to recursively transform values.
/* you would write a function that applies a transformation to each value in a data structure and recurses into nested
structures like objects or arrays. */ 
function transformValues(input, transformFunc) {
    if (Array.isArray(input)) {
        return input.map(element => transformValues(element, transformFunc));
    } else if (typeof input === 'object' && input !== null) {
        const transform = {};
        for (const key in input) {
            transformed[key] = transformValues(input[key], transformFunc);
        }
        return transformed;
    } else {
        return transformFunc(input);
    }
}

// Example usage 
const input = {
    name: "John Doe",
    age: 30,
    details: {
        address: "1234 Main St",
        hobbies: ['reading', 'weight-lifting', {special: 'programming'}]
    }
};

const transformed = transformValues(input, value =>
    typeof value === 'string' ? value.toUpperCase() : value
);

console.log(transformed);