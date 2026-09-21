const form = document.querySelector('.request-form');
const modal = document.getElementById('thankYouModal');

const phoneInput = form.querySelector('input[name="phone"]');
const zipInput = form.querySelector('input[name="zip"]');
const emailInput = form.querySelector('input[name="email"]');

const addressErrorContainer = document.getElementById('address-error-container');


/* ======================
   PHONE FORMAT (000) 000-0000
====================== */

function formatPhone(value) {

  const digits = value.replace(/\D/g, '').slice(0, 10);

  const part1 = digits.slice(0,3);
  const part2 = digits.slice(3,6);
  const part3 = digits.slice(6,10);

  if(digits.length > 6) return `(${part1}) ${part2}-${part3}`;
  if(digits.length > 3) return `(${part1}) ${part2}`;
  if(digits.length > 0) return `(${part1}`;
  return '';
}

phoneInput.addEventListener('input',function(){
  this.value = formatPhone(this.value);
});


/* ======================
   ZIP CODE
====================== */

zipInput.addEventListener('input',function(){
  this.value = this.value.replace(/\D/g,'').slice(0,5);
});


/* ======================
   ADDRESS VALIDATION
====================== */

function validateAddress(){

  const address1 = form.querySelector('input[name="address_1"]');
  const city = form.querySelector('input[name="city"]');
  const state = form.querySelector('input[name="state"]');
  const zip = form.querySelector('input[name="zip"]');

  let errors = [];

  if(!address1.value.trim()) errors.push("Street address is required");
  if(!city.value.trim()) errors.push("City is required");
  if(!state.value.trim()) errors.push("State / Province is required");
  if(!/^\d{5}$/.test(zip.value)) errors.push("Zip code must contain exactly 5 digits");

  if(errors.length > 0){

    addressErrorContainer.innerHTML = errors.join('<br>');
    addressErrorContainer.style.color='red';
    addressErrorContainer.style.fontSize='12px';
    addressErrorContainer.style.marginTop='5px';

  } else {

    addressErrorContainer.innerHTML='';

  }

}

['address_1','city','state','zip'].forEach(name=>{

  const input = form.querySelector(`input[name="${name}"]`);
  if(input) input.addEventListener('input',validateAddress);

});


/* ======================
   FORM SUBMIT
====================== */

form.addEventListener('submit',async function(e){

  e.preventDefault();

  let valid = true;

  form.querySelectorAll('.dynamic-error').forEach(el=>el.remove());
  addressErrorContainer.innerHTML='';

  form.querySelectorAll('input').forEach(input=>{
    input.style.borderColor='#ccc';
  });


  /* REQUIRED FIELDS */

  const fields = {

    first_name:"First name",
    last_name:"Last name",
    business_name:"Business name",
    phone:"Phone number",
    email:"Email address",
    distributor:"Distributor name"

  };


  Object.keys(fields).forEach(name=>{

    const input = form.querySelector(`input[name="${name}"]`);
    const label = fields[name];

    let message='';

    if(!input.value.trim()){
      message=`${label} is required`;
    }

    else if(name==='phone'){

      const digits = input.value.replace(/\D/g,'');

      if(digits.length !== 10){
        message='Phone number must contain exactly 10 digits';
      }

    }

    else if(name==='email'){

      const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!pattern.test(input.value)){
        message='Email must include @ and valid domain';
      }

    }

    if(message){

      valid=false;
      showFieldError(input,message);

    }

  });


  /* ADDRESS */

  validateAddress();
  if(addressErrorContainer.innerHTML!=='') valid=false;


  /* RADIO VALIDATION */

  const buyingAviko = form.querySelector('input[name="buying_aviko"]:checked');
  const signupNews = form.querySelector('input[name="signup_news"]:checked');

  const buyingError = document.getElementById('buying-aviko-error');
  const signupError = document.getElementById('signup-news-error');

  buyingError.textContent='';
  signupError.textContent='';

  if(!buyingAviko){
    buyingError.textContent='Please select an option';
    valid=false;
  }

  if(!signupNews){
    signupError.textContent='Please select an option';
    valid=false;
  }

  if(!valid) return;


  /* SUBMIT */

  try{

    const response = await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    });

    if(response.ok){

      modal.classList.add('active');
      form.reset();
      addressErrorContainer.innerHTML='';

    } else {

      alert('Failed to submit form. Please try again.');

    }

  }catch(error){

    alert('Network error. Please try again.');

  }

});


/* ======================
   RADIO LIVE VALIDATION
====================== */

['buying_aviko','signup_news'].forEach(group=>{

  document.querySelectorAll(`input[name="${group}"]`).forEach(radio=>{

    radio.addEventListener('change',()=>{

      if(group==='buying_aviko'){
        document.getElementById('buying-aviko-error').textContent='';
      }

      if(group==='signup_news'){
        document.getElementById('signup-news-error').textContent='';
      }

    });

  });

});


/* ======================
   LIVE REQUIRED
====================== */

function liveRequired(name){

  const input = form.querySelector(`input[name="${name}"]`);
  if(!input) return;

  input.addEventListener('input',function(){

    if(this.value.trim()!==''){
      removeFieldError(this);
    }

  });

}

['first_name','last_name','business_name','distributor'].forEach(liveRequired);


/* ======================
   EMAIL LIVE
====================== */

emailInput.addEventListener('input',function(){

  const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(pattern.test(this.value.trim())){
    removeFieldError(this);
  }

});


/* ======================
   PHONE LIVE
====================== */

phoneInput.addEventListener('input',function(){

  const digits = this.value.replace(/\D/g,'');

  if(digits.length===10){
    removeFieldError(this);
  }

});


/* ======================
   ERROR HELPERS
====================== */

function showFieldError(field,message){

  removeFieldError(field);

  field.style.borderColor='#ff0000';

  const error=document.createElement('div');

  error.className='dynamic-error';
  error.style.color='red';
  error.style.fontSize='12px';
  error.style.marginTop='5px';

  error.textContent=message;

  field.insertAdjacentElement('afterend',error);

}


function removeFieldError(field){

  field.style.borderColor='#ccc';

  const next=field.nextElementSibling;

  if(next && next.classList.contains('dynamic-error')){
    next.remove();
  }

}


function closeModal(){

  modal.classList.remove('active');

}