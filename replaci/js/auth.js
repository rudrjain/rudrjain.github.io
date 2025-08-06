import { API_BASE } from './config.js';

if (window.innerWidth < 768) {
  document.getElementById('mobile-blocker').style.display = 'block';
}

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.querySelector('#loginForm button[type="submit"]');
const registerBtn = document.querySelector('#registerForm button[type="submit"]');

const loginMessage = document.createElement('div');
const registerMessage = document.createElement('div');
loginMessage.style.marginTop = '10px';
registerMessage.style.marginTop = '10px';

loginForm?.appendChild(loginMessage);
registerForm?.appendChild(registerMessage);

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMessage.textContent = '';
    loginBtn.disabled = true;
    loginBtn.innerText = 'Logging in...';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        loginMessage.style.color = 'green';
        loginMessage.textContent = 'Login successful! Redirecting...';
        setTimeout(() => {
          window.location.href = "visualizer.html";
        }, 1000);
      } else {
        loginMessage.style.color = 'red';
        loginMessage.textContent = data.message || 'Login failed';
      }
    } catch (err) {
      console.error("Login error:", err);
      loginMessage.style.color = 'red';
      loginMessage.textContent = "Something went wrong.";
    } finally {
      loginBtn.disabled = false;
      loginBtn.innerText = 'Login';
    }
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerMessage.textContent = '';
    registerBtn.disabled = true;
    registerBtn.innerText = 'Registering...';

    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        registerMessage.style.color = 'green';
        registerMessage.textContent = data.message || "Signup successful!";
        setTimeout(() => {
          window.location.href = "visualizer.html";
        }, 1000);
      } else {
        registerMessage.style.color = 'red';
        registerMessage.textContent = data.message || "Signup failed";
      }
    } catch (err) {
      console.error("Register error:", err);
      registerMessage.style.color = 'red';
      registerMessage.textContent = "Something went wrong.";
    } finally {
      registerBtn.disabled = false;
      registerBtn.innerText = 'Register';
    }
  });
}
