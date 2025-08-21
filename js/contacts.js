// js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  // EmailJS public key
  emailjs.init({ publicKey: "TKmI_QxR6Je9-MDea" });

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("sendBtn");
  const status = document.getElementById("status");

  // include the page url for context
  const urlInput = form.querySelector('input[name="page_url"]');
  if (urlInput) urlInput.value = window.location.href;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // simple checks
    const honeypot = form.querySelector('input[name="phone"]');
    if (honeypot && honeypot.value.trim() !== "") {
      status.textContent = "Submission blocked.";
      return;
    }

    const email = form.querySelector('input[name="reply_to"]').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email.";
      return;
    }

    btn.disabled = true;
    status.textContent = "Sending...";

    try {
      // service and template from EmailJS
      await emailjs.sendForm(
        "service_00lxf56",   // Service ID
        "template_9fz87sp",  // Template ID
        form
      );
      form.reset();
      status.textContent = "Thanks, your message has been sent.";
    } catch (err) {
      console.error(err);
      status.textContent = "Sorry, something went wrong. Please try again later.";
    } finally {
      btn.disabled = false;
    }
  });
});
