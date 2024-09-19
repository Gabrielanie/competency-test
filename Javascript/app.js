
function getEvenNumbers(numbers) {
    const evenNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            evenNumbers.push(numbers[i]);
        }
    }
    return evenNumbers;
}


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17, 23, 24, 48, 60];
const evenNumbers = getEvenNumbers(numbers);
console.log(evenNumbers); 




document.addEventListener('DOMContentLoaded', (event) => {
    const colorBox = document.getElementById('colorBox');
    
    function changeBackgroundColor() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        colorBox.style.backgroundColor = randomColor;
    }
    
    colorBox.addEventListener('click', changeBackgroundColor);
});
