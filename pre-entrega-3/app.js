// Pide un producto y devuelve sus datos.
function pedirProducto(numero) {
  const nombre = prompt(`Producto ${numero}: ¿Qué producto quieres agregar?`);

  if (nombre === null || nombre.trim() === "") {
    return null;
  }

  const precioIngresado = prompt(`¿Cuál es el precio de ${nombre}?`);
  const precio = Number(precioIngresado);

  if (precioIngresado === null || precio <= 0 || isNaN(precio)) {
    alert("El precio no es válido. Se cancelará la carga de este producto.");
    return null;
  }

  const cantidadIngresada = prompt(`¿Cuántas unidades de ${nombre} quieres?`);
  const cantidad = Number(cantidadIngresada);

  if (cantidadIngresada === null || cantidad <= 0 || isNaN(cantidad)) {
    alert("La cantidad no es válida. Se cancelará la carga de este producto.");
    return null;
  }

  return {
    nombre: nombre.trim(),
    precio: precio,
    cantidad: cantidad
  };
}

// Función flecha: calcula el subtotal de un producto.
const calcularSubtotal = (producto) => producto.precio * producto.cantidad;

// Suma los subtotales y devuelve el total de la compra.
function calcularTotal(productos) {
  let total = 0;

  for (let i = 0; i < productos.length; i++) {
    total += calcularSubtotal(productos[i]);
  }

  return total;
}

// Muestra el resumen en la consola.
function mostrarResumen(productos, total) {
  console.log("=== Resumen de compra ===");

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const subtotal = calcularSubtotal(producto);

    console.log(
      `${producto.nombre}: ${producto.cantidad} unidad(es) x $${producto.precio} = $${subtotal}`
    );
  }

  console.log(`Total de la compra: $${total}`);
}

// Función principal del simulador.
function iniciarSimulador(maximoProductos) {
  const productos = [];

  for (let i = 1; i <= maximoProductos; i++) {
    const producto = pedirProducto(i);

    if (producto === null) {
      const continuar = confirm("No se agregó el producto. ¿Quieres intentar con otro?");

      if (!continuar) {
        break;
      }
    } else {
      productos.push(producto);
    }

    if (i < maximoProductos && productos.length > 0) {
      const agregarOtro = confirm("¿Quieres agregar otro producto?");

      if (!agregarOtro) {
        break;
      }
    }
  }

  if (productos.length === 0) {
    alert("No agregaste ningún producto.");
    console.log("La compra no tiene productos.");
    return;
  }

  const total = calcularTotal(productos);
  mostrarResumen(productos, total);
  alert(`La compra tiene ${productos.length} producto(s). El total es $${total}.`);
}

// Invoca el simulador con un máximo de 5 productos.
iniciarSimulador(5);