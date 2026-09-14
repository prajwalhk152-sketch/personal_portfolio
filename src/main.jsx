import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Version 1 contact handling: open the visitor's email app with the form details.
// Replace this with EmailJS, Formspree, or a server endpoint when one is configured.
document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.closest('#contact')) return;

  event.preventDefault();
  const fields = form.querySelectorAll('input, textarea');
  const [nameField, emailField, messageField] = fields;
  const name = nameField?.value.trim();
  const email = emailField?.value.trim();
  const message = messageField?.value.trim();

  if (!name || !email || !message || !emailField.checkValidity()) {
    form.reportValidity();
    return;
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:prajwalhk152@gmail.com?subject=${subject}&body=${body}`;
});

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
