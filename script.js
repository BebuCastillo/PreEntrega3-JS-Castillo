
let productos = [
    { id: 1, nombre: "Ensalada", categoria: "Comidas", precio: 1000, stock: 12, img: "./images/comidas/ensalada.jpg" },
    { id: 2, nombre: "Hamburguesa", categoria: "Comidas", precio: 2500, stock: 20, img: "./images/comidas/Hamburguesas.jpg" },
    { id: 3, nombre: "Pizza", categoria: "Comidas", precio: 2000, stock: 12, img: "./images/comidas/pizzas1.jpg" },
    { id: 10, nombre: "Cerveza", categoria: "Bebidas", precio: 750, stock: 15, img: "./images/bebidas/Cervezas.jpg" },
    { id: 11, nombre: "Gin Tonic", categoria: "Bebidas", precio: 1200, stock: 10, img: "./images/bebidas/Gintonería.jpg" },
    { id: 12, nombre: "Licuado", categoria: "Bebidas", precio: 650, stock: 8, img: "./images/bebidas/Licuados.jpg" },
    ]

let productosJSON = JSON.stringify(productos)
localStorage.setItem("productos", productosJSON)

let carrito = []
if (localStorage.getItem("carrito")) {
    let carritoEnJSON = localStorage.getItem("carrito")
    carrito = JSON.parse(carritoEnJSON)
}

    let contenedorProductos = document.getElementById("contenedorProductos")
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let buscador = document.getElementById("buscador")
    /*buscador.oninput = filtrar*/
    let buscar = document.getElementById("buscar")
    buscar.onclick = filtrar

    renderizarProductos(productos)
    renderizarCarrito(carrito)

    function filtrar() {
        let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
        renderizarProductos(productosFiltrados)
    }


    function renderizarProductos(arrayDeProductos) {
        contenedorProductos.innerHTML = ""
        arrayDeProductos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.classList.add("imgProducto")
        tarjetaProducto.di = `tarjeta${producto.id}`
        tarjetaProducto.innerHTML = `
           <h2>${producto.nombre}</h2>
           <h2>$${producto.precio}</h2>
           <img src=${producto.img} />
           <button id=${producto.id}>Agregar al carrito</button> 
        `
         contenedorProductos.append(tarjetaProducto)

         let boton = document.getElementById(producto.id)
         boton.onclick = agregarAlCarrito
        })
    }

    function agregarAlCarrito(e) {
/*        console.log(e.target.id)*/
        let productoBuscado = productos.find(producto => producto.id == e.target.id)
        console.log(productoBuscado)
        carrito.push(productoBuscado)

        localStorage.setItem("carrito", JSON.stringify(carrito))

        renderizarCarrito(carrito)
    }


    function renderizarCarrito(productosEnCarrito) {
        contenedorCarrito.innerText = ""
        productosEnCarrito.forEach(producto => {
            let tarjetaProducto = document.createElement("div")
            tarjetaProducto.innerHTML = `
                <h2>${producto.nombre}</h2>
            `
        contenedorCarrito.appendChild(tarjetaProducto)
        })
        
    }

