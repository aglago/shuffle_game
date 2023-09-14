//
document.addEventListener('DOMContentLoaded', function() {
    // Function to shuffle the numbers using Fisher-Yates algorithm
function shuffleNumbers() {
    //Initialize variables
    const table = document.getElementById('gameTable');
    const cells = table.getElementsByTagName('td');
    const cellArray = Array.from(cells);
    const numbers = cellArray.map(cell => cell.textContent);
    
    //
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    cellArray.forEach((cell, index) => {
        cell.textContent = numbers[index];
    });
}


// Add event listeners to the Shuffle and Reset buttons
document.getElementById('shuffleButton').addEventListener('click', shuffleNumbers);
});
