# Shuffle game 
## with HTML, CSS & JAVASCRIPT

This challenge was assigned to me as an attempt to join a sofware development team as a frontend developer.

# Table of Contents
- [Shuffle Game with HTML, CSS & JavaScript](#shuffle-game-with-html-css--javascript)
  - [Challenge Instructions](#challenge-instructions)
  - [Important Notes](#important-notes)
    - [What makes a puzzle solvable ?](#what-makes-a-puzzle-solvable-)
    - [What is an odd-sized puzzle ?](#what-is-an-odd-sized-puzzle-)
    - [What is an even-sized puzzle ?](#what-is-an-even-sized-puzzle-)
    - [What is an inversion ?](#what-is-an-inversion-)
    - [Difference between `==` and `===`](#difference-between--and-)
  - [Challenge Algorithm](#challenge-algorithm)
    - [1. Ensure the puzzle is solvable.](#1-ensure-the-puzzle-is-solvable)
    - [2. Shuffle the puzzle board while maintaining solvability.](#2-shuffle-the-puzzle-board-while-maintaining-solvability)
      - [What is the Fisher-Yates shuffle algorithm](#what-is-the-fisher-yates-shuffle-algorithm)
      - [Illustration of Fisher-Yates shuffle algorithm](#illustration-of-fisher-yates-shuffle-algorithm)
      - [What if the randomly picked position appears twice ?](#what-if-the-randomly-picked-position-appears-twice-)
      - [Does the algorithm run on and on and on ? When does it stop ?](#does-the-algorithm-run-on-and-on-and-on--when-does-it-stop-)
    - [3. Display the shuffled puzzle.](#3-display-the-shuffled-puzzle)
    - [4. Allow the player to click and move numbered cells.](#4-allow-the-player-to-click-and-move-numbered-cells)
    - [5. Check after each move if the puzzle is solved.](#5-check-after-each-move-if-the-puzzle-is-solved)
    - [6. Display a congratulatory message when the puzzle is solved.](#6-display-a-congratulatory-message-when-the-puzzle-is-solved)
  - [Adding event listeners](#adding-event-listeners)
    - [What is an Event](#what-is-an-event)
    - [Examples of events in web](#examples-of-events-in-web)


## Challenge Instructions
1. To create a solvable number shuffle game
2. Alert user when game has been solved.

## Important Notes
## What makes a puzzle solvable ?
1. For odd-sized puzzles, the puzzle is solvable if ghe number of inversions is even.
2. For even-sized puzzles, the puzzle is solvable if the number of inversions and the row number of the empty cell is odd.
   - If the index of the empty cell is odd, it means that the empty cell is in an odd-numbered row.

### What is an odd-sized puzzle ?
- The term "odd-sized" primarily relates to the dimensions of the puzzle grid, not the numbers contained within it.
- An "odd-sized puzzle" refers to a puzzle grid with an odd number of rows and an odd number of columns.
- *Example*: 3x3 grid or 5x5 grid

### What is an even-sized puzzle ?
- An "odd-sized puzzle" refers to a puzzle grid with an even number of rows and an odd number of columns.
- *Example*: 4x4 grid

## What is an inversion ?
- "Inversions" refer to pairs of tiles (numbers) that are in the reverse order of their natural (sorted) order. 
- Inversions are used to determine the solvability of the puzzle and play a crucial role in assessing whether a given puzzle configuration can be solved.
- An inversion occurs whenever a smaller number appears after a larger number when counting from left to right and from top to bottom.
- In other words, an inversion happens when the order of the tiles is "out of place."

For example, consider a simplified 3x3 number slide puzzle:
```
1 2 3
8   4
7 6 5
```

- counting from left to right, these are the number of inversions:
   - (8,4)
   - (7,6)
   - (6,5)
- counting from top to bottom, there is
   - (8,7)

this is because, the first numbers in the pair are larger than the second numbers in the pair and the first numbers come before the second numbers (out of place)

- This puzzle is an odd-sized puzzle with 4 inversions, which makes it solvable.

### Difference between `==` and `===`
In JavaScript, `==` and `===` are two different comparison operators used for comparing values, but they behave differently:

1. `==` (Equality Operator):
   - The `==` operator checks for equality of values, but it performs type coercion if the values being compared have different data types.
   - Type coercion means that JavaScript will attempt to convert one or both of the values to a common data type before making the comparison.
   - For example, `1 == '1'` would be considered `true` because JavaScript converts the string `'1'` to the number `1` during the comparison.
   - `==` is often referred to as the "loose equality" operator.

2. `===` (Strict Equality Operator):
   - The `===` operator checks for both equality of values and equality of data types. It does not perform type coercion.
   - It is more strict in its comparison; for two values to be considered equal with `===`, they must have the same value and the same data type.
   - For example, `1 === '1'` would be considered `false` because the values are not of the same data type.
   - `===` is often referred to as the "strict equality" operator.

Here are a few examples to illustrate the difference:

```javascript
1 == '1'  // true (loose equality, performs type coercion)
1 === '1' // false (strict equality, no type coercion)

0 == false  // true (loose equality, performs type coercion)
0 === false // false (strict equality, no type coercion)

null == undefined  // true (loose equality, treats null and undefined as equal)
null === undefined // false (strict equality, different data types)
```

In general, it's recommended to use `===` (strict equality) in JavaScript because it avoids unexpected type coercion and can help prevent subtle bugs in your code. It's a safer and more precise way to compare values. Use `==` (loose equality) only when you specifically need type coercion for some reason.

## Challenge Algorithm
1. Ensure the puzzle is solvable.
2. Shuffle the puzzle board while maintaining solvability.
3. Display the shuffled puzzle.
4. Allow the player to click and move numbered cells.
5. Check after each move if the puzzle is solved.
6. Display a congratulatory message when the puzzle is solved.
7. Provide an option to reset the puzzle.

### 1. Ensure the puzzle is solvable.
The `isSolvable()` function is responsible for determining whether a given puzzle configuration is solvable or not. Let's break down this function step by step: 

```javascript
function isSolvable(puzzle)
```

- This line defines a JavaScript function named `isSolvable` that takes one argument `puzzle`.

```javascript
{
    // count number of inversions in the puzzle
    let inversions = 0;
```

- This line initializes a variable `inversions` to keep track of the number of inversions in the puzzle. Inversions are pairs of tiles in the puzzle where a higher-numbered tile precedes a lower-numbered tile when counting from left to right and from top to bottom.

```javascript
    for (let i = 0; i < puzzle.length - 1; i++)
    {
        for (let j = i + 1; j < puzzle.length; j++)
        {
```

- These lines set up two nested loops. The outer loop iterates through each element in the `puzzle` array, excluding the last element (`puzzle.length - 1`). The inner loop iterates through the elements that come after the current element (i.e., from `i + 1` to the end of the array).

```javascript
            if (puzzle[i] !== '' && puzzle[j] !== '' && puzzle[i] > puzzle[j])
            {
                inversions++;
            }
        }
    }
```

- Within the nested loops, this code checks if the current pair of elements `puzzle[i]` and `puzzle[j]` is a valid inversion. It checks that both elements are not empty (represented by `puzzle[i] !== ''` and `puzzle[j] !== ''`) and that `puzzle[i]` (the earlier tile) is greater than `puzzle[j]` (the later tile). If these conditions are met, it increments the `inversions` count.

```javascript
    // check if puzzle can be solved
    if (puzzle.length % 2 == 1) // for odd-sized puzzles
    {
        return (inversions % 2 == 0 ? true : false);
    }
```

- After counting inversions, this code checks if the puzzle can be solved based on its size. If the length of the `puzzle` array is odd, it means the puzzle is an odd-sized puzzle. For odd-sized puzzles, solvability is determined by whether the number of inversions is even. If it's even, the puzzle is solvable (`return true`), and if it's odd, the puzzle is unsolvable (`return false`).

```javascript
    else // for even-sized puzzles
    {
        const emptyCellRowIndex = puzzle.indexOf('');
        var condition = inversions % 2 == 1 && emptyCellRowIndex % 2 == 1;

        return (condition ? true : false);
    }
}
```

- For even-sized puzzles, the code first finds the row index of the empty cell (`const emptyCellRowIndex = puzzle.indexOf('');`). Then, it checks if the number of inversions is odd (`inversions % 2 == 1`) and if the row index of the empty cell is also odd (`emptyCellRowIndex % 2 == 1`). If both conditions are met, the puzzle is solvable (`return true`), otherwise, it's unsolvable (`return false`).

This function calculates the number of inversions in the puzzle and uses that count, along with the puzzle's size, to determine if the puzzle is solvable or not.


## 2. Shuffle the puzzle board while maintaining solvability.
The function `shuffleNumbers()` is designed to shuffle the numbers displayed in a table on an HTML page. Let's break down this function step by step:

1. `const table = document.getElementById('gameTable');`: This line gets a reference to an HTML element with the `id` attribute set to "gameTable." It assumes that you have an HTML table in your document with this specific ID.

2. `const cells = table.getElementsByTagName('td');`: This line gets all the `<td>` (table cell) elements within the `table` element. It uses the `getElementsByTagName` method to select all the table cells.

3. `const cellArray = Array.from(cells);`: This line converts the HTMLCollection of table cells into a JavaScript array. This conversion is necessary to perform array operations on the cells.

4. `const numbers = cellArray.map(cell => cell.textContent);`: Here, the `map` method is used to extract the text content of each cell and store it in the `numbers` array. This effectively collects all the numbers displayed in the table cells.

5. `for (let i = numbers.length - 1; i > 0; i--) { ... }`: This loop iterates over the `numbers` array in reverse order, starting from the last element (`numbers.length - 1`) and going down to the first element (index 0). This is a crucial part of the Fisher-Yates shuffle algorithm.

6. `const j = Math.floor(Math.random() * (i + 1));`: Inside the loop, a random index `j` is generated using `Math.random()`. The `Math.floor` function is used to ensure that `j` is an integer between 0 and `i` (inclusive), where `i` is the current iteration index.

7. `[numbers[i], numbers[j]] = [numbers[j], numbers[i]];`: This line swaps the values at indices `i` and `j` in the `numbers` array. This is the core step of the Fisher-Yates shuffle. It shuffles the numbers by swapping them in a random manner.

8. `cellArray.forEach((cell, index) => { ... });`: After shuffling the `numbers` array, this loop iterates over the `cellArray`, which contains references to the table cells. For each cell, it assigns a new text content from the shuffled `numbers` array based on the `index`. This step updates the content of the table cells with the shuffled numbers, effectively changing the display order.

The `shuffleNumbers()` function shuffles the numbers displayed in the HTML table using the Fisher-Yates shuffle algorithm. It does so by first extracting the numbers from the table cells, shuffling them in an array, and then updating the table cells with the shuffled numbers. This function is commonly used in games and applications where you need to randomize the order of elements.

### What is the Fisher-Yates shuffle algorithm
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

### Illustration of Fisher-Yates shuffle algorithm
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

### What if the randomly picked position appears twice ?
It is possible for the random index `j` to pick the same position that has already been picked before, especially if the random number generator produces the same value more than once. However, this doesn't break the algorithm because the swap operation still takes place, but it effectively swaps the element with itself, having no net effect on the shuffle.

Let's go through a quick example to illustrate:

Suppose you have an array `[1, 2, 3, 4, 5]`, and the random index `j` is generated as follows:

1. Randomly choose `j` between 0 and 4 (inclusive): `j = 2`
2. Swap `numbers[4]` and `numbers[2]`, which are 5 and 3: `[1, 2, 5, 4, 3]`

Now, if the next random index `j` happens to be 2 again, the swap operation will be as follows:

1. Randomly choose `j` between 0 and 3 (inclusive): `j = 2`
2. Swap `numbers[3]` and `numbers[2]`, which are 4 and 5: `[1, 2, 4, 5, 3]`

In this case, we see that the same position (index 2) was chosen twice in a row. However, the algorithm still works correctly because the swap operation is performed as intended, even if it involves swapping an element with itself.

### Does the alogorithm run on and on and on ? When does it stop ?
The Fisher-Yates shuffle algorithm does not run over and over again; it shuffles the elements within the array in a single pass from the last index to the first index. Once it completes this pass, the array is fully shuffled, and the loop terminates. There's no need for multiple iterations; one pass is sufficient to achieve a randomized order.


## 3. Display the shuffled puzzle.
The `foreach` loop updates the HTML table with the current shuffled numbers.

## 4. Allow the player to click and move numbered cells.
- The function `handleCellClick` is responsible for handling the click event on a puzzle cell (a `<td>` element).

```javascript
// 3. Function to handle cell click
function handleCellClick(clickedCell) {
    // Find the current empty cell
    const emptyCell = document.querySelector('td.emptyCell');
```

- The function `handleCellClick` is responsible for handling the click event on a puzzle cell (a `<td>` element).

- It takes one parameter, `clickedCell`, which represents the cell that was clicked.

- Inside the function, it first finds the current empty cell on the puzzle board by querying the DOM for a `<td>` element with the class `emptyCell`.

```javascript
    // Check if the clicked cell is adjacent to the empty cell (horizontally or vertically)
    if (isAdjacent(clickedCell, emptyCell)) {
```

- This part of the code checks whether the clicked cell is adjacent to the empty cell, meaning it can be legally moved. It uses the `isAdjacent` function (which you should have defined elsewhere) to determine adjacency.

- If `isAdjacent` returns `true`, it means the clicked cell can be legally moved.

```javascript
        // Swap the clicked cell's content with the empty cell's content
        const clickedCellContent = clickedCell.textContent;
        clickedCell.textContent = '';
        emptyCell.textContent = clickedCellContent;
```

- If the clicked cell is adjacent, the function proceeds to swap the content (text) of the clicked cell with the content of the empty cell. This simulates moving the clicked number into the empty space.

```javascript
        // Update classes to reflect new empty cell and previously clicked cell
        clickedCell.classList.add('emptyCell');
        emptyCell.classList.remove('emptyCell');
```

- After the swap, it updates the classes of the clicked cell and the empty cell. The class `emptyCell` indicates that a cell is empty. So, it adds this class to the clicked cell and removes it from the previously empty cell.

```javascript
        // Check if the puzzle is solved
        if (isPuzzleSolved()) {
            alert('Congratulations! You solved the puzzle.');
        }
    }
}
```

## 5. Check after each move if the puzzle is solved.
- Finally, the function checks if the puzzle is solved after the move. It does this by calling the `isPuzzleSolved` function (which you should have defined elsewhere).

- If `isPuzzleSolved` returns `true`, it means the puzzle is solved, and it displays a congratulatory message using the `alert` function.

This function handles the logic of a player's move when they click on a puzzle cell. It checks if the move is legal (the clicked cell is adjacent to the empty cell), swaps the cell contents, updates the classes to reflect the new empty cell, and checks if the puzzle is solved after the move. If the puzzle is solved, it displays a congratulatory message.



## 6. Display a congratulatory message when the puzzle is solved.
it displays a congratulatory message using the `alert` function.

## Adding event listeners
`document.getElementById('shuffleButton')`  
This line of code adds an event listener to the HTML element with the ID `'shuffleButton'`, specifically to the `'click'` event. Here's what it does step by step:

1. `document.getElementById('shuffleButton')`: This part of the code finds the HTML element with the ID `'shuffleButton'`. In your HTML, you have a button element with this ID, presumably your shuffle button.

2. `.addEventListener('click', shufflePuzzle)`: Once the button element is found, this part of the code adds an event listener to it. It specifies that it wants to listen for the `'click'` event on this button element. When the button is clicked, the function `shufflePuzzle` will be executed.

So, in summary, this line of code ensures that when the button with the ID `'shuffleButton'` is clicked, it triggers the `shufflePuzzle` function, which is responsible for shuffling the puzzle numbers. This allows the user to initiate the puzzle shuffle by clicking the button.


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

That will be all for this challenge ! 