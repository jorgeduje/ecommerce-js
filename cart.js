// [{}{}{}] ---> null - undefined
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderProducts = (arrayProductos) => {
  let containerCart = document.getElementById("container-cart");
  containerCart.innerHTML = "";

  // renderizar

  arrayProductos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.className = "producto";
    productCard.innerHTML = `<img src=${producto.image} />
          <h3>${producto.title}</h3>
          <p>${producto.description}</p>
          <p class="price">$${producto.price}</p>
          <div class="container-btns">
          <button onclick="restarCantidad(${producto.id})">
          -</button>
          <p class="price">${producto.quantity}</p>
          <button onclick="sumarCantidad(${producto.id})">
          +</button>
          </div>

          <button onclick="eliminarDelCarrito(${producto.id})">
          Eliminar</button>
      `;
    containerCart.appendChild(productCard);
  });
};

renderProducts(carrito);
// [ {1} {5} {2}] ---> [{1} {2}] / !== 5
const eliminarDelCarrito = (id) => {
  Swal.fire({
    title: "Seguro quieres eliminar?",
    showDenyButton: true,
    confirmButtonText: "Si, eliminar",
    denyButtonText: `No, no eliminar`,
  }).then((res) => {
    console.log(res);
    if (res.isConfirmed) {
      carrito = carrito.filter((elemento) => elemento.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderProducts(carrito);
      Swal.fire({
        title: "eliminado!",
        icon: "info",
      });
    } else if (res.isDenied) {
      Swal.fire({
        title: "No se elimina",
        icon: "info",
      });
    }
  });
};

const restarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado && productoEncontrado.quantity > 1) {
    productoEncontrado.quantity -= 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
    Toastify({
      text: "Funciona",
      gravity: "bottom",
      position: "right",
      backgroundColor: "peru",
      close: true,
    }).showToast();
  } else if (productoEncontrado && productoEncontrado.quantity === 1) {
    eliminarDelCarrito(productoEncontrado.id);
  }
};

const sumarCantidad = (id) => {
  let productoEncontrado = carrito.find((elemento) => elemento.id === id);
  if (productoEncontrado) {
    productoEncontrado.quantity += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderProducts(carrito);
  }
};
