document.querySelector('#check').addEventListener('click', checkPalindrome);
const input = document.querySelector('#input');
const result = document.querySelector('#result');




function checkPalindrome() {
    fetch(`/api?palindrome=${input.value}`)
        .then(response => response.json())
        .then(data => {
            result.textContent = data.isPalindrome ? 'CERTIFIED PALINDROME' : 'nope, not a palindrome :(';
        });
}