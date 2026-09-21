const form = document.querySelector('.request-form');
const modal = document.getElementById('thankYouModal');

const phoneInput = form.querySelector('input[name="phone"]');
const zipInput = form.querySelector('input[name="zip"]');
const locationsInput = form.querySelector('input[name="locations"]');
const radioGroup = document.querySelector('.radio-group');
const emailInput = form.querySelector('input[name="email"]');

const addressErrorContainer = document.getElementById('address-error-container');

/* ======================
   PHONE FORMAT (000) 000-0000
====================== */
function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 10);

  if (digits.length > 6) return `(${part1}) ${part2}-${part3}`;
  if (digits.length > 3) return `(${part1}) ${part2}`;
  if (digits.length > 0) return `(${part1}`;
  return '';
}

phoneInput.addEventListener('input', function () {
  this.value = formatPhone(this.value);
});

/* ======================
   INPUT LIMITERS
====================== */
zipInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 5);
});

locationsInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 3);
});

/* ======================
   ADDRESS LIVE VALIDATION
====================== */
function validateAddress() {
  const address1 = form.querySelector('input[name="address_1"]');
  const city = form.querySelector('input[name="city"]');
  const state = form.querySelector('input[name="state"]');
  const zip = form.querySelector('input[name="zip"]');

  let errors = [];

  if (!address1.value.trim()) errors.push("Street address is required");
  if (!city.value.trim()) errors.push("City is required");
  if (!state.value.trim()) errors.push("State / Province is required");
  if (!/^\d{5}$/.test(zip.value)) errors.push("Zip code must contain exactly 5 digits");

  if (errors.length > 0) {
    addressErrorContainer.innerHTML = errors.join('<br>');
    addressErrorContainer.style.color = 'red';
    addressErrorContainer.style.fontSize = '12px';
    addressErrorContainer.style.marginTop = '5px';
  } else {
    addressErrorContainer.innerHTML = '';
  }
}

['address_1','city','state','zip'].forEach(name => {
  const input = form.querySelector(`input[name="${name}"]`);
  if (input) input.addEventListener('input', validateAddress);
});

/* ======================
   FORM SUBMIT
====================== */
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  let valid = true;

  // remove old errors
  form.querySelectorAll('.dynamic-error').forEach(el => el.remove());
  addressErrorContainer.innerHTML = '';

  form.querySelectorAll('input').forEach(input => {
    input.style.borderColor = '#ccc';
  });

  /* REQUIRED BASIC FIELDS */
  const fields = {
    first_name: "First name",
    last_name: "Last name",
    business_name: "Business name",
    phone: "Phone number",
    email: "Email address",
    distributor: "Distributor name"
  };

  Object.keys(fields).forEach(name => {
    const input = form.querySelector(`input[name="${name}"]`);
    const label = fields[name];
    let message = '';

    if (!input.value.trim()) {
      message = `${label} is required`;
    }

    else if (name === 'phone') {
      const digits = input.value.replace(/\D/g, '');
      if (digits.length !== 10) {
        message = 'Phone number must contain exactly 10 digits';
      }
    }

    else if (name === 'email') {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(input.value)) {
        message = 'Email must include @ and valid domain (example: name@gmail.com)';
      }
    }

    if (message) {
      valid = false;
      showFieldError(input, message);
    }
  });

  /* LOCATIONS */
  const locValue = locationsInput.value.trim();

  if (!locValue) {
    valid = false;
    showFieldError(locationsInput, 'Locations is required');
  }

  else if (!/^\d+$/.test(locValue)) {
    valid = false;
    showFieldError(locationsInput, 'Locations must be numeric');
  }

  else {
    const number = parseInt(locValue, 10);
    if (number < 0 || number > 100) {
      valid = false;
      showFieldError(locationsInput, 'Locations must be between 0 and 100');
    }
  }

  /* ADDRESS VALIDATION */
  validateAddress();
  if (addressErrorContainer.innerHTML !== '') valid = false;

  /* RADIO */
  const signupSelected = document.querySelector('input[name="signup"]:checked');
  if (!signupSelected) {
    valid = false;

    const error = document.createElement('div');
    error.className = 'dynamic-error';
    error.style.color = 'red';
    error.style.fontSize = '12px';
    error.style.marginTop = '6px';
    error.textContent = 'Please select Yes or No';

    radioGroup.insertAdjacentElement('afterend', error);
  }

  if (!valid) return;

  /* SUBMIT */
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      modal.classList.add('active');
      form.reset();
      addressErrorContainer.innerHTML = '';
    } else {
      alert('Failed to submit form. Please try again.');
    }

  } catch (error) {
    alert('Network error. Please try again.');
  }
});

/* ======================
   LIVE VALIDATION OTHER FIELDS
====================== */

function liveRequired(name) {
  const input = form.querySelector(`input[name="${name}"]`);
  if (!input) return;

  input.addEventListener('input', function () {
    if (this.value.trim() !== '') {
      removeFieldError(this);
    }
  });
}

['first_name','last_name','business_name','distributor']
.forEach(liveRequired);

/* EMAIL LIVE */
emailInput.addEventListener('input', function () {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (pattern.test(this.value.trim())) {
    removeFieldError(this);
  }
});

/* PHONE LIVE */
phoneInput.addEventListener('input', function () {
  const digits = this.value.replace(/\D/g, '');
  if (digits.length === 10) {
    removeFieldError(this);
  }
});

/* LOCATIONS LIVE */
locationsInput.addEventListener('input', function () {
  const value = this.value.trim();
  if (/^\d+$/.test(value)) {
    const number = parseInt(value, 10);
    if (number >= 0 && number <= 100) {
      removeFieldError(this);
    }
  }
});

/* RADIO LIVE */
document.querySelectorAll('input[name="signup"]').forEach(radio => {
  radio.addEventListener('change', function () {
    const error = radioGroup.nextElementSibling;
    if (error && error.classList.contains('dynamic-error')) {
      error.remove();
    }
  });
});

/* ======================
   ERROR HELPERS
====================== */

function showFieldError(field, message) {
  removeFieldError(field);

  field.style.borderColor = '#ff0000';

  const error = document.createElement('div');
  error.className = 'dynamic-error';
  error.style.color = 'red';
  error.style.fontSize = '12px';
  error.style.marginTop = '5px';
  error.textContent = message;

  field.insertAdjacentElement('afterend', error);
}

function removeFieldError(field) {
  field.style.borderColor = '#ccc';

  const next = field.nextElementSibling;
  if (next && next.classList.contains('dynamic-error')) {
    next.remove();
  }
}

function closeModal() {
  modal.classList.remove('active');
}