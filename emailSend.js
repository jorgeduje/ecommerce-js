// public key = amLXYz5rqt1k98G3Q
// service id = service_a3agflc
// tempalte id = template_935lvjn

// nombre
// telefono
// mensaje
// email

const form = document.getElementById("contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let info = getData();
  sendEmail(info);
});

const getData = () => {
  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let mensaje = document.getElementById("mensaje").value;
  return { nombre, telefono, email, mensaje };
};

const sendEmail = (informacion) => {
  emailjs.send("service_a3agflc", "template_935lvjn", informacion);
};
