# Shuffle game 
## with HTML, CSS & JAVASCRIPT

This challenge was assigned to me as an attempt to join a sofware development team as a frontend developer.


## Explaining the script
The function `shuffleNumbers()` is designed to shuffle the numbers displayed in a table on an HTML page. Let's break down this function step by step:

1. `const table = document.getElementById('gameTable');`: This line gets a reference to an HTML element with the `id` attribute set to "gameTable." It assumes that you have an HTML table in your document with this specific ID.

2. `const cells = table.getElementsByTagName('td');`: This line gets all the `<td>` (table cell) elements within the `table` element. It uses the `getElementsByTagName` method to select all the table cells.

3. `const cellArray = Array.from(cells);`: This line converts the HTMLCollection of table cells into a JavaScript array. This conversion is necessary to perform array operations on the cells.

4. `const numbers = cellArray.map(cell => cell.textContent);`: Here, the `map` method is used to extract the text content of each cell and store it in the `numbers` array. This effectively collects all the numbers displayed in the table cells.

5. `for (let i = numbers.length - 1; i > 0; i--) { ... }`: This loop iterates over the `numbers` array in reverse order, starting from the last element (`numbers.length - 1`) and going down to the first element (index 0). This is a crucial part of the Fisher-Yates shuffle algorithm.

6. `const j = Math.floor(Math.random() * (i + 1));`: Inside the loop, a random index `j` is generated using `Math.random()`. The `Math.floor` function is used to ensure that `j` is an integer between 0 and `i` (inclusive), where `i` is the current iteration index.

7. `[numbers[i], numbers[j]] = [numbers[j], numbers[i]];`: This line swaps the values at indices `i` and `j` in the `numbers` array. This is the core step of the Fisher-Yates shuffle. It shuffles the numbers by swapping them in a random manner.

8. `cellArray.forEach((cell, index) => { ... });`: After shuffling the `numbers` array, this loop iterates over the `cellArray`, which contains references to the table cells. For each cell, it assigns a new text content from the shuffled `numbers` array based on the `index`. This step updates the content of the table cells with the shuffled numbers, effectively changing the display order.

In summary, the `shuffleNumbers()` function shuffles the numbers displayed in the HTML table using the Fisher-Yates shuffle algorithm. It does so by first extracting the numbers from the table cells, shuffling them in an array, and then updating the table cells with the shuffled numbers. This function is commonly used in games and applications where you need to randomize the order of elements.

## What is the Fisher-Yates shuffle algorithm
The Fisher-Yates shuffle algorithm, also known as the Knuth shuffle, is a widely used algorithm for randomly shuffling the elements of an array or a list. It was developed by Ronald A. Fisher and Frank Yates in 1938 and later popularized by Donald Knuth in his book "The Art of Computer Programming."

The Fisher-Yates shuffle works by iteratively selecting a random element from the unshuffled part of the array and swapping it with the last unshuffled element. This process is repeated until all elements have been shuffled. Here's a step-by-step explanation:

1. Start from the last element in the array (or list).

2. Generate a random index between 0 and the current position in the array (inclusive).

3. Swap the element at the current position with the element at the randomly chosen index.

4. Move one position earlier in the array and repeat the process until you reach the first element.

The key feature of the Fisher-Yates shuffle is that it guarantees that every possible permutation of the elements is equally likely, making it a fair and unbiased shuffling algorithm. It also has a time complexity of O(n), where n is the number of elements in the array, which makes it efficient for shuffling even large collections of items.

While the Fisher-Yates shuffle is a robust and widely used algorithm, there are other shuffling algorithms as well. Some of them include:

1. **Durstenfeld Shuffle:** This is a variation of the Fisher-Yates shuffle that was published by Richard Durstenfeld in 1964. It's essentially the same algorithm but is often credited separately due to its popularity.

2. **Random Sampling:** Instead of shuffling an entire array, you can randomly select elements from the array one by one. This is simple but not as efficient as the Fisher-Yates shuffle.

3. **Sorting Shuffle:** You can also shuffle elements by assigning each element a random sort key and then sorting the elements based on these keys. While this method works, it's not as efficient as the Fisher-Yates shuffle.

The reason the Fisher-Yates shuffle is often preferred is because of its simplicity, efficiency, and mathematical soundness in creating unbiased shuffles. It's a well-established and widely recognized algorithm for shuffling arrays, and it has stood the test of time in various applications, including games, statistical simulations, and cryptographic applications.

## Illustration of Fisher-Yates shuffle algorithm
Let's go through the code step by step with the input array `[1, 2, 3, 4, 5]` and see what happens at each stage of the `shuffleNumbers()` function:

1. Initial state:
   - `numbers` array: `[1, 2, 3, 4, 5]` (based on the content of the table cells)

2. Loop iteration 1 (i = 4):
   - Randomly choose `j` between 0 and 4 (inclusive), let's say `j` is 2.
   - Swap `numbers[4]` and `numbers[2]`, which are 5 and 3:
     - `numbers` array: `[1, 2, 5, 4, 3]`

3. Loop iteration 2 (i = 3):
   - Randomly choose `j` between 0 and 3 (inclusive), let's say `j` is 1.
   - Swap `numbers[3]` and `numbers[1]`, which are 4 and 2:
     - `numbers` array: `[1, 4, 5, 2, 3]`

4. Loop iteration 3 (i = 2):
   - Randomly choose `j` between 0 and 2 (inclusive), let's say `j` is 0.
   - Swap `numbers[2]` and `numbers[0]`, which are 5 and 1:
     - `numbers` array: `[5, 4, 1, 2, 3]`

5. Loop iteration 4 (i = 1):
   - Randomly choose `j` between 0 and 1 (inclusive), let's say `j` is 0.
   - Swap `numbers[1]` and `numbers[0]`, which are 4 and 5:
     - `numbers` array: `[4, 5, 1, 2, 3]`

6. Loop iteration 5 (i = 0):
   - The loop terminates because `i` has reached 0.

7. Final state:
   - `numbers` array: `[4, 5, 1, 2, 3]` (shuffled)

8. Update table cells:
   - The `forEach` loop updates the text content of the table cells based on the shuffled `numbers` array.

After completing all loop iterations, the `numbers` array has been successfully shuffled using the Fisher-Yates shuffle algorithm. The table cells have been updated with the shuffled numbers, resulting in a new display order, which might look something like `[4, 5, 1, 2, 3]` in the table cells.

## What if the randomly picked position appears twice ?
It is possible for the random index `j` to pick the same position that has already been picked before, especially if the random number generator produces the same value more than once. However, this doesn't break the algorithm because the swap operation still takes place, but it effectively swaps the element with itself, having no net effect on the shuffle.

Let's go through a quick example to illustrate:

Suppose you have an array `[1, 2, 3, 4, 5]`, and the random index `j` is generated as follows:

1. Randomly choose `j` between 0 and 4 (inclusive): `j = 2`
2. Swap `numbers[4]` and `numbers[2]`, which are 5 and 3: `[1, 2, 5, 4, 3]`

Now, if the next random index `j` happens to be 2 again, the swap operation will be as follows:

1. Randomly choose `j` between 0 and 3 (inclusive): `j = 2`
2. Swap `numbers[3]` and `numbers[2]`, which are 4 and 5: `[1, 2, 4, 5, 3]`

In this case, we see that the same position (index 2) was chosen twice in a row. However, the algorithm still works correctly because the swap operation is performed as intended, even if it involves swapping an element with itself.

## Does the alogorithm run on and on and on ? When does it stop ?
The Fisher-Yates shuffle algorithm does not run over and over again; it shuffles the elements within the array in a single pass from the last index to the first index. Once it completes this pass, the array is fully shuffled, and the loop terminates. There's no need for multiple iterations; one pass is sufficient to achieve a randomized order.

### What is an Event
- An event is an occurence or happening that takes place in response to user actions or interactions with a web page.  

- Events are used to trigger specific actions or functions in response to these happenings.

### Examples of events in web
1. **Click Event**: Occurs when a user clicks on an HTML element such as a link or a button. 
- It is often used to trigger actions like sumitting a form or displaying a pop-up.

2. **Mouseover/Mouseout Event**: These events occur when the mouse pointer enters or leaves an element. 
- They can be used for various purposes such as changing the appearance of an element when hovered over.

3. **Keydown/Keyup Event**: These events are triggered when a user presses or realeases a key on their keyboard.
- They are commonly ussed to capture user input in forms or to create keyboard shortcuts.

4. **Submit Event**: Occurs when a form is submitted, typically clicking a submit button. 
- It is used to validate form data and process it on the server.

5. **Load Event**: Occurs when a web page or external resource like an image has finished loading.
- It is often used toinitiate actions that depend on the complete loading of resources.

6. **Resize Event**: Occurs when the size of the browser window is changed.
- It is useful for making responsive web designs.

7. **Scroll Event**: triggered when a user scrolls a wb page.
- It is commonly used to implement scroll related animations or lazy loading of content.

8. **Custom Events**: Developers also create custom events in Javascript to handle specific interactions within their applications. These events can be named and dispatched as needed.