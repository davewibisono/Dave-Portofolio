const form = document.querySelector('.request-form');
const modal = document.getElementById('thankYouModal');

const phoneInput = form.querySelector('[name="phone"]');
const emailInput = form.querySelector('[name="email"]');

/* PHONE FORMAT */
function formatPhone(value){
  const d = value.replace(/\D/g,'').slice(0,10);

  if(d.length > 6) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  if(d.length > 3) return `(${d.slice(0,3)}) ${d.slice(3)}`;
  if(d.length > 0) return `(${d}`;
  return '';
}

phoneInput.addEventListener('input',function(){
  this.value = formatPhone(this.value);
});

/* ERROR */
function showError(input, message){
  removeError(input);

  input.classList.add('input-error');

  const error = document.createElement('div');
  error.className = 'error-msg';
  error.textContent = message;

  input.closest('.input-group').appendChild(error);
}

function removeError(input){
  input.classList.remove('input-error');

  const group = input.closest('.input-group');
  const error = group.querySelector('.error-msg');

  if(error) error.remove();
}

/* VALIDATE */
function validate(){
  let valid = true;

  const fields = {
    first_name: "First name is required",
    last_name: "Last name is required",
    company_name: "Company name is required",
    title: "Title is required",
    phone: "Phone number is required",
    email: "Email is required"
  };

  Object.keys(fields).forEach(name=>{
    const input = form.querySelector(`[name="${name}"]`);

    if(!input.value.trim()){
      showError(input, fields[name]);
      valid = false;
    } else {
      removeError(input);
    }
  });

  /* PHONE */
  const digits = phoneInput.value.replace(/\D/g,'');
  if(digits.length !== 10){
    showError(phoneInput, "Phone must be 10 digits");
    valid = false;
  }

  /* EMAIL */
  const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!pattern.test(emailInput.value)){
    showError(emailInput, "Invalid email format");
    valid = false;
  }

  return valid;
}

/* LIVE */
['first_name','last_name','company_name','title','phone','email'].forEach(name=>{
  const input = form.querySelector(`[name="${name}"]`);

  input.addEventListener('input', function(){

    if(this.value.trim() !== ''){
      removeError(this);
    }

    if(name === 'email'){
      const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(pattern.test(this.value)){
        removeError(this);
      }
    }

    if(name === 'phone'){
      const digits = this.value.replace(/\D/g,'');
      if(digits.length === 10){
        removeError(this);
      }
    }

  });
});

/* SUBMIT */
form.addEventListener('submit', async function(e){
  e.preventDefault();

  if(!validate()) return;

  try{
    const res = await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    });

    if(res.ok){
      modal.classList.add('active');
      form.reset();
      document.querySelectorAll('.error-msg').forEach(el=>el.remove());
    } else {
      alert('Submit failed');
    }

  }catch{
    alert('Network error');
  }
});

/* CLOSE */
function closeModal(){
  modal.classList.remove('active');
}