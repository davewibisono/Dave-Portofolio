const form = document.querySelector('.request-form');
const modal = document.getElementById('thankYouModal');

const phoneInput = form.querySelector('input[name="phone"]');
const zipInput = form.querySelector('input[name="zip"]');
const locationsInput = form.querySelector('input[name="locations"]');

// ======================
// PHONE FORMAT (000) 000-0000
// ======================
function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 10);

  if (digits.length > 6) {
    return `(${part1}) ${part2}-${part3}`;
  } else if (digits.length > 3) {
    return `(${part1}) ${part2}`;
  } else if (digits.length > 0) {
    return `(${part1}`;
  }
  return '';
}

phoneInput.addEventListener('input', function () {
  this.value = formatPhone(this.value);
});

// ======================
// ZIP LIMIT (5 DIGITS)
// ======================
zipInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 5);
});

// ======================
// LOCATIONS LIMIT (MAX 3 DIGITS, NOT EXACT)
// ======================
locationsInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 3);
});

// ======================
// FORM VALIDATION
// ======================
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let valid = true;

  const inputs = form.querySelectorAll('input[required]');

  inputs.forEach(input => {
    let message = '';

    // Reset border
    input.style.borderColor = '#ccc';

    // Remove old error
    const oldError = input.parentElement.querySelector('.dynamic-error');
    if (oldError) oldError.remove();

    if (!input.value.trim()) {
      message = 'Required';
    }

    // PHONE MUST BE EXACTLY 10 DIGITS
    else if (input.name === 'phone') {
      const digits = input.value.replace(/\D/g, '');
      if (digits.length !== 10) {
        message = 'Phone number must be exactly 10 digits';
      }
    }

    // ZIP MUST BE EXACTLY 5 DIGITS
    else if (input.name === 'zip') {
      if (input.value.length !== 5) {
        message = 'Zip code must be exactly 5 digits';
      }
    }

    // LOCATIONS → JUST MUST BE NUMBER (MIN 1 DIGIT)
    else if (input.name === 'locations') {
      if (!/^\d+$/.test(input.value)) {
        message = 'Locations must be a number';
      }
    }

    // EMAIL MUST CONTAIN @ AND .
    else if (input.type === 'email') {
      if (!input.value.includes('@') || !input.value.includes('.')) {
        message = 'Email must contain @ and .';
      }
    }

    if (message) {
      valid = false;
      input.style.borderColor = '#ff0000';

      const error = document.createElement('div');
      error.className = 'dynamic-error';
      error.style.color = 'red';
      error.style.fontSize = '12px';
      error.style.marginTop = '5px';
      error.textContent = message;

      input.insertAdjacentElement('afterend', error);
    }
  });

  if (!valid) return;

  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    modal.classList.add('active');
    form.reset();
  } else {
    alert('Failed to submit form. Please try again.');
  }
});

// ======================
// CLOSE MODAL
// ======================
function closeModal() {
  modal.classList.remove('active');
}
