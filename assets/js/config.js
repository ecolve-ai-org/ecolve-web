/* ==========================================================
   config.js — edit this file to customise the site.
   No build step needed: just upload the folder to your host.
   ========================================================== */
window.SITE = {
  name: "ecolve.ai",
  email: "hello@ecolve.ai",          // <- your real contact email
  offices: "Melbourne, Australia · Colombo, Sri Lanka",
  // Forms are sent by api/send-mail.php (PHP, included with almost every shared host).
  // Set the destination address inside that file.
  formHandler: "api/send-mail.php",
  // Optional: to use a third-party service instead (Formspree, Getform, Web3Forms…)
  // paste its URL here, e.g. "https://formspree.io/f/xxxxxxx". Leave "" to use the PHP file.
  formEndpoint: "",
  // Add your profile URLs to show social icons in the footer (blank = hidden).
  social: { facebook: "", instagram: "", x: "", linkedin: "", youtube: "" }
};
