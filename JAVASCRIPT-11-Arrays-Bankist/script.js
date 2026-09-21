// Ambil elemen dari DOM
const usernameInput = document.querySelector('.login__input--user');
const passwordInput = document.querySelector('.login__input--pin');
const loginButton = document.querySelector('.login__btn');
alert(document.getElementsByName('txtUser'));

// Fungsi untuk menangani login
function handleLogin(event) {
  event.preventDefault(); // Mencegah form untuk submit secara default

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Cek username dan password
  if (username === 'admin' && password === 'admin123') {
    alert('Login successfull!'); // Pesan sukses
  } else {
    alert('Incorect username or password, please change!');
  }
}

// Event listener untuk tombol login
loginButton.addEventListener('click', handleLogin);
