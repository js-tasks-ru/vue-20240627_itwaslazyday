import { sum } from './sum.js'

const a = document.querySelector('input[name="num-a"]');
const b = document.querySelector('input[name="num-b"]');
const result = document.querySelector('output[name="result"]');
const form = document.querySelector('#form');
const resultLabel = document.querySelector('[data-result-label]');
const resultError = document.querySelector('[data-result-error]');

function calculate() {
  try {
    const sumResult = sum(a.valueAsNumber, b.valueAsNumber);
    if (sumResult) {
      resultLabel.style.display = 'inline-block';
      resultError.style.display = 'none';
      result.value = sumResult;
    } else {
      result.value = '';
      resultLabel.style.display = 'none';
      resultError.style.display = 'inline-block';
    }
  } catch (e) {
    result.value = e.message
  }
}

form && (form.addEventListener('input', calculate), form.addEventListener('submit', (event) => event.preventDefault()));
