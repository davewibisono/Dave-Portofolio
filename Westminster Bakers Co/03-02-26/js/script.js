const form = document.querySelector('.request-form');
const modal = document.getElementById('thankYouModal');
const phoneInput = form.querySelector('input[name="phone"]');

const validators = {
  email: value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
};

// ======================
// AUTO FORMAT US PHONE
// ======================
function formatUSPhone(value) {
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

phoneInput.addEventListener('input', (e) => {
  e.target.value = formatUSPhone(e.target.value);
});

// ======================
// FORM SUBMIT VALIDATION
// ======================
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let valid = true;

  const inputs = form.querySelectorAll('input[required]');

  inputs.forEach(input => {
    if (input.type === 'radio') return;

    const container = input.closest('.input-container');
    const errorMessage = container?.querySelector('.error-msg');
    let message = '';

    // REQUIRED CHECK
    if (!input.value.trim()) {
      message = 'Required';
    } 
    // PHONE VALIDATION
    else if (input.name === 'phone') {
      const digits = input.value.replace(/\D/g, '');

      if (digits.length !== 10) {
        message = 'Phone number must be exactly 10 digits';
      }
    }
    // EMAIL VALIDATION
    else if (input.type === 'email' && !validators.email(input.value)) {
      message = 'Please enter a valid email address';
    }

    // APPLY ERROR STYLE
    if (message) {
      valid = false;
      input.style.borderColor = '#ff0000';
      if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
      }
    } else {
      input.style.borderColor = '#aaa';
      if (errorMessage) errorMessage.style.display = 'none';
    }
  });

  if (!valid) return;

  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
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
