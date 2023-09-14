// Ensure javascript execution occurs after relevant HTML elements have been loaded and parsed by the browser
document.addEventListener('DOMContentLoaded', function() {

    //Initialize variables
    const table = document.getElementById('gameTable');
    const cells = table.getElementsByTagName('td');
    const cellArray = Array.from(cells);
    const numbers = cellArray.map(cell => cell.textContent);

    // 1. Function to check if a puzzle is solvable
    function isSolvable(puzzle)
    {
        // count number of inversions in the puzzle
        let inversions = 0;

        for (let i = 0; i < puzzle.length - 1; i++)
        {
            for (let j = i + 1; j < puzzle.length; j++)
            {
                if (puzzle[i] !== '' && puzzle[j] !== '' && puzzle[i] > puzzle[j])
                {
                    inversions++;
                }
            }
        }

        // check if puzzle can be solved
        if (puzzle.length % 2 == 1) // for odd-sized puzzles
        {
            return (inversions % 2 == 0 ? true : false);
        }
        else // for even-sized puzzles
        {
            const emptyCellRowIndex = puzzle.indexOf('');
            var condition = inversions % 2 == 1 && emptyCellRowIndex % 2 == 1;

            return (condition ? true : false);
        }
    }

    // 2. Function to shuffle the numbers using Fisher-Yates algorithm
    function shufflePuzzle()
    {
        // Find the current empty cell
        const currentEmptyCell = document.querySelector('td.emptyCell');
        
        // Remove the "emptyCell" class from the previous empty cell (if exists)
        const previousEmptyCell = document.querySelector('td.emptyCell');
        if (previousEmptyCell) {
            previousEmptyCell.classList.remove('emptyCell');
        }

        let puzzle;
        do 
        {
            // Iterate through elements of array
            for (let i = numbers.length - 1; i > 0; i--) {
                // Generate random postion
                const j = Math.floor(Math.random() * (i + 1));
                //Swap element at current position with the randomly generated position
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            
            // 3. Update table cells with the shuffled numbers
            cellArray.forEach((cell, index) => {
                cell.textContent = numbers[index];
            });

            // Set shuffled numbers as current puzzle
            puzzle = numbers;

            // Remove border from the empty cell by adding the "empty-cell" class
            const emptyCell = document.querySelector('td:empty');
            if (emptyCell)
            {
                emptyCell.classList.add('empty-cell');
            }
        } while (!isSolvable(puzzle));

        // Add the "emptyCell" class to the new empty cell
        const emptyCell = document.querySelector('td:empty');
        emptyCell.classList.add('emptyCell');
    }

    
    // 3. Function to handle cell click
    function handleCellClick(clickedCell) {
        // Find the current empty cell
        const emptyCell = document.querySelector('td.emptyCell');

        // Check if the clicked cell is adjacent to the empty cell (horizontally or vertically)
        if (isAdjacent(clickedCell, emptyCell)) {
            // Swap the clicked cell's content with the empty cell's content
            const clickedCellContent = clickedCell.textContent;
            clickedCell.textContent = '';
            emptyCell.textContent = clickedCellContent;

            // Update classes to reflect new empty cell and previously clicked cell
            clickedCell.classList.add('emptyCell');
            emptyCell.classList.remove('emptyCell');

            // Check if the puzzle is solved
            if (isPuzzleSolved()) {
                alert('Congratulations! You solved the puzzle.');
            }
        }
    }

    // 4. Function to check if two cells are adjacent
    function isAdjacent(cell1, cell2) {
        const cell1RowIndex = cell1.parentElement.rowIndex;
        const cell1CellIndex = cell1.cellIndex;
        const cell2RowIndex = cell2.parentElement.rowIndex;
        const cell2CellIndex = cell2.cellIndex;

        return (
            Math.abs(cell1RowIndex - cell2RowIndex) + Math.abs(cell1CellIndex - cell2CellIndex) === 1
        );
    }

    // 5. Function to check if the puzzle is solved
    function isPuzzleSolved() {
        const currentNumbers = cellArray.map(cell => cell.textContent);
        return currentNumbers.join('') === '12345678';
    }

    // Add event listeners to each cell to handle clicks
    cellArray.forEach(cell => {
        cell.addEventListener('click', function() {
            handleCellClick(cell);
        });
    });


    // Add event listeners to the Shuffle Button
    document.getElementById('shuffleButton').addEventListener('click', shufflePuzzle);
});




