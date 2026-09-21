const form = document.querySelector('.request-form');
const modal = document.getElementById('thankYouModal');
const phoneInput = form.querySelector('input[name="phone"]');
const zipInput = form.querySelector('input[name="zip"]');
const locationsInput = form.querySelector('input[name="locations"]');

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
// ZIP US LIMITER (5 digits)
// ======================
zipInput.addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 5);
});

// ======================
// LOCATIONS LIMITER (0–100, max 3 digit)
// ======================
locationsInput.addEventListener('input', function () {
  // Only numbers
  this.value = this.value.replace(/\D/g, '');

  // Max 3 digits
  if (this.value.length > 3) {
    this.value = this.value.slice(0, 3);
  }

  // Max value 100
  if (parseInt(this.value) > 100) {
    this.value = 100;
  }
});

// ======================
// FORM VALIDATION
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

    if (!input.value.trim()) {
      message = 'Required';
    } 
    else if (input.name === 'phone') {
      const digits = input.value.replace(/\D/g, '');
      if (digits.length !== 10) {
        message = 'Phone number must be exactly 10 digits';
      }
    }
    else if (input.type === 'email' && !validators.email(input.value)) {
      message = 'Please enter a valid email address';
    }
    else if (input.name === 'locations') {
      const num = parseInt(input.value);

      if (isNaN(num)) {
        message = 'Required';
      } 
      else if (num < 0 || num > 100) {
        message = 'Value must be between 0 and 100';
      }
    }

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
    alert('Failed to sign-up form. Please try again.');
  }
});

// ======================
// CLOSE MODAL
// ======================
function closeModal() {
  modal.classList.remove('active');
}

// ======================
// GOOGLE ADDRESS AUTOCOMPLETE
// ======================
function initAddressAutocomplete() {
  const addressInput = document.querySelector('input[name="address_1"]');
  const cityInput = document.querySelector('input[name="city"]');
  const stateInput = document.querySelector('input[name="state"]');

  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    types: ['address'],
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry"]
  });

  autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();

    let city = '';
    let state = '';
    let zip = '';

    place.address_components.forEach(component => {
      const types = component.types;

      if (types.includes('locality')) {
        city = component.long_name;
      }

      if (types.includes('sublocality') && !city) {
        city = component.long_name;
      }

      if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }

      if (types.includes('postal_code')) {
        zip = component.long_name;
      }
    });

    cityInput.value = city;
    stateInput.value = state;
    zipInput.value = zip;
  });
}

window.initAddressAutocomplete = initAddressAutocomplete;
