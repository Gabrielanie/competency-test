function twoSum(nums, target) {
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }

    return [];
}

document.getElementById('two-sum-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const numbersInput = document.getElementById('numbers').value;
    const target = parseInt(document.getElementById('target').value);

    
    const nums = numbersInput.split(',').map(num => parseInt(num.trim()));

=    const result = twoSum(nums, target);

    const resultDiv = document.getElementById('result');
    if (result.length > 0) {
        resultDiv.textContent = `Indices: ${result[0]}, ${result[1]}`;
    } else {
        resultDiv.textContent = 'No two numbers found that add up to the target.';
    }
});
