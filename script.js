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
/* The 'transformValues' function takes an 'input' and a 'transformFunc'.
If the 'input' is an array, it maps over the array, applying the 'transformValues' function
recursively to each element.
If the 'input' is an object (and not 'null'), it creates a new object, iterating over each key and 
applying the 'transformValues' function recursively to each value.
If the 'input' is neither an array nor an object it applies the 'transformFunc' to the 'input' and returns 
the results.
-The provided 'transformFunc' in the example usage is a simple function that turns strings to uppercase.
The transformation is applied to all string values in the nested object/array structure.
-This approach is flexible and can be adapted to various types of transformations by changing the 
'transformFunc'. */


// 11. Implement a function that determines if two values are deep equal.
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) {
        return false;
    }
    let keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length != keysB.length) {
        return false;
    }
    for (let key of keysA) {
        if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
}


// 12. Implement a function that returns a new object after squashing the input object.
function squashObject(obj, prefix = '') {
    let squashed = {};

    for(const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursive case: the value is a nested object
            squashed = {
                ...squashed,
                ...squashObject(obj[key], `${prefix}${key}.`)
            };
        } else {
            //Base case: the value is primitive
            squashed[prefix + key] = obj[key];
        }
    }

    return squashed;
}

// Example usage 
const input = {
    a: 1,
    b: {
        c: 2,
        d: {e: 3}
    }
};

console.log(squashObject(input));
/* 'squashObject' takes an object 'obj' and an optional 'prefix' parameter.
It iterates over the keys of the object.
If a value is nested object(but not 'null'), it calls itself recursively, appending the current key
to the prefix.
If a value is a primitive (not an object), it adds it to the result with the full key path as its key.
The function returns a new object with the "squashed" key-value pairs.

The output for the provided 'input' example. 

{
    "a": 1,
    "b.c": 2,
    "b.d.e": 3
} */

// 13. Implement a function that creates a resumable interval object.
class ResumableInterval {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
        this.intervalId = null;
        this.isRunning = false;
    }

    start() {
        if (!this.isRunning) {
            this.intervalId = setInterval(this.callback, this.interval);
            this.isRunning = true;
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }

    resume() {
        this.start();
    }
}

// Example usage:
const intervalObject = new ResumableInterval(() => {
    console.log('Interval triggered');
}, 1000);

// Start the interval
intervalObject.start();

// To pause the interval (for example, after 3 seconds)
setTimeout(() => {
    intervalObject.pause();
    console.log('Interval paused');
}, 3000);

// To resume the interval (for example, after another 3 seconds)
setTimeout(() => {
    intervalObject.resume();
    console.log('Interval resumed');
}, 6000);


// 14.  Implement the functionality behaviour of Promise.any ()
/* Promise.any() takes an iterable of Promise objects and, as soon as one of the 
promises in the iterable fulfills, returns a single promise that resolves
with the value from that promise. */

// 15. Implement the functionality behaviour of Promise.allSettled
/* Promise.allSettled() returns a promise that resolves after all of the given 
promises have either fulfilled or rejected, with an array of objects that 
each describe the outcome of each promise. */

function allSettled(promises) {
    return new Promise(resolve => {
        let results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(
                value => {
                    results[index] = { status: 'fulfilled', value };
                },
                reason => {
                    results[index] = { status: 'rejected', reason };
                }
            ).finally(() => {
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            });
        });
    });
}

// Example usage
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

allSettled(promises)
    .then((results) => console.log(results));

/* the above implementation 
-'allSettled' takes an array of 'promise'.
-It creates an array results to store the outcome of each promise.
-It iterates over each promise, wrapping each with Promise.resolve() to ensure each item is treated as a promise.
-For each promise, it uses .then() to handle both fulfillment and rejection. 
The results are stored in the results array with the same order as the input promises.
-Each result is an object with either { status: 'fulfilled', value: ... } 
for fulfilled promises, or { status: 'rejected', reason: ... } for rejected promises.
-A finally block increments the completed count. 
When all promises have settled (either fulfilled or rejected), the function resolves with the results array. */

//  16. Implement a function that returns a memoized version of a function which accepts a single argument.
function memoizeSingleArg(func) {
    const cache = new Map();
    return function(arg) {
        if (cache.has(arg)) {
            return cache.get(arg);
        }
        const result = func(arg);
        cache.set(arg, result);
        return result;
    };
}

// 17. Implement a function that formats a list of items into a single readable string.
function formatList(list) {
    return list.join(', ').replace(/, ([^,]*)$/, ' and $1');
}

// 18. Implement a class that can subscribe to and emit events that trigger attached callback functions.
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(1 => 1 !== listener);
        }
    }
}

// 19. Implement a debounce function that comes with a cancel method to cancel delayed invocations.
function debounce(func, wait) {
    let timeout;

    function debounced(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }

    debounced.cancel = function() {
        clearTimeout(timeout);
    };

    return debounced;
}

// 20. Implement a function to merge rows of data from the same user.
function mergeRowsByUser(data) {
    const mergedData = {};

    data.forEach(row => {
        const userId = row.userId;

        if (!mergedData[userId]) {
            mergedData[userId] = {};
        }

        Object.keys(row).forEach(key => {
            mergedData[userId][key] = row[key];
        });
    });

    return Object.values(mergedData);
}

// Example usage
const rows = [
    { userId: 1, name: "Alice", age: 25, occupation: "Engineer" },
    { userId: 2, name: "Bob", age: 30, occupation: "Designer" },
    { userId: 1, age: 26, occupation: "Senior Engineer" },
    { userId: 3, name: "Charlie", age: 28 }
];

const mergedRows = mergeRowsByUser(rows);
console.log(mergedRows);


// 21. Implement a function that recursively flattens an array into a single level deep.
function flattenArray(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
    }, []);
}


// 22. Implement a function that returns an object with all falsey values removed.
function removeFalseyValues(obj) {
    return Object.entries(obj)
        .filter(([_, value]) => Boolean(value))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

// 23. Implement a function to resolve a given value to a Promise.
function resolveToPromise(value) {
    return Promise.resolve(value);
}

// 24. Implement a Turtle class that moves a turtle on a 2D plane.
class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }
}

// 25. Implement a function to execute N async tasks in series.
async function executeTasksInSeries(tasks) {
    for (const task of tasks) {
        await task();
    }
}

// 26. Implement a promisify function that allows the original function to override the return value.
function promisify(original) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            try {
                original.call(this, ...args, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            } catch (error) {
                reject(error);
            }  
        });
    };
}

// 27. Implement a function to deserialize a JSON string.
function fromJSON(jsonString) {
    return JSON.parse(jsonString);
}

// 28. Implement a function to convert all the keys in an object to camel case.
function toCamelCase(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        const camelCaseKey = key.replace(/([-_][a-z])/gi, ($1) => {
            return $1.toUpperCase().replace('-', '').replace('_', '');
        });
        acc[camelCaseKey] = obj[key];
        return acc;
    }, {});
}

// 29. What is Set in JavaScript?
/* Set is another data structure in JavaScript which is similar to Array
but the values are unique. It is a collection of elements where each element is stored as a value
without any keys.*/

// Example 
 const roadmap = new Set();
 roadmap.add('JavaScript');
 roadmap.add('JavaScript');

 roadmap.add('dynamic');
 roadmap.add(1995);

 console.log(roadmap.size); // 3, because the value 'JavaScript' is already present in the set
 console.log(roadmap.has('JavaScript')); // true

 roadmap.delete('JavaScript');
 console.log(roadmap.has('JavaScript')); // false
 console.log(roadmap.size); // 2

//  30. How to use `reduce()` method
/* You can use the reduce() method to reduce an array to a single value. The reduce() method 
executes a reducer function (that you provide) on each element of the array, resulting in a single 
output value.*/
//  Syntax 
Array.reduce((accumulator, currentValue) => {

}, initialValue);

// Example 
const numbers = [1, 2, 3, 4, 5, 6];

const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(numbers); // [1, 2, 3, 4, 5, 6]
console.log(sum); // 21