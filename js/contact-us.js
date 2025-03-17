document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("FNG18Mm3VEranv9GA");

  // Select the form element instead of the submit button
  const form = document.querySelector("form");
  form.addEventListener("submit", sendMail);
});

function sendMail(event) {
  event.preventDefault();

  let name = document.getElementById("userName").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  document.getElementById("loading").style.display = "block";

  emailjs.send("service_y5u5tng", "template_n1ny9pi", {
    from_name: name,
    from_email: email,
    phone: phone,
    message: message
  }).then(function(response) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("feedback").textContent = "✅ تم إرسال رسالتك بنجاح!";
    document.querySelector("form").reset(); // Reset the form with correct selector
  }).catch(function(error) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("feedback").textContent = "حدث خطأ في الإرسال. حاول مرة أخرى.";
    console.log(error);
  });
}