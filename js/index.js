const Clickbutton = document.querySelectorAll(".button")
const sugerenciaProd = document.querySelector('.SugerenciaProductos')
const btnDanger = document.querySelector('.delete')
let carrito = []
const tbody = document.querySelector('.tbody')
Clickbutton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent
    const itemPrecio = item.querySelector('.precio').textContent
    const itemImg = item.querySelector('.card-img-top').src
    
    const newItem = {
        title: itemTitle,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem){

    const alert = document.querySelector('.alert')
    setTimeout(function(){
        alert.classList.add('hide')
    }, 1000)
        alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__Cantidad')
    for(let i = 1 ;i < carrito.length ; i++){
        if(carrito [i].title === newItem.title){
          carrito[i].cantidad++
          const inputValue = InputElemento[i]
          inputValue.value++
          carritoTotal()
          return null

        }
    }
     

    carrito.push(newItem)
    
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = 
                            `<th scope="row">1</th>
                            <td class="table__productos">
                                <img src=${item.img} alt="">
                                 <h6 class="title">${item.title}</h6>
                            </td>
                            <td class="table__precio"><p>${item.precio}</p></td>
                            <td class="table__cantidad">
                                <input type="number" min ="1" value =${item.cantidad} class = "input__Cantidad">
                                <button class="delete btn btn-danger">x</button>
                            </td>`
        
        tr.innerHTML = Content
        tbody.append(tr)
        
        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__Cantidad").addEventListener('click',sumaCantidad)
    })
    carritoTotal()
}

function carritoTotal(){
    let  Total = 0
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$",''))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()

}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const  tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent

         for ( let i = 0 ; i <carrito.length; i++ ) {
            if(carrito[i].title === title){
                carrito.splice(i ,1)
            
        }
        
    }

    tr.remove()
    carritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent
    carrito.forEach(item =>{
        if(item.title === title){
            sumaInput.value < 1? (sumaInput.value = 1) : sumaInput.value
            item.cantidad = sumaInput.value
            carritoTotal()
        }
    })
    
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))

}
window.onload = function (){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage)
        carrito = storage
        renderCarrito()
}

const comprarVaciar = document.querySelector(".comprar")
comprarVaciar.addEventListener("click", () =>{

    setTimeout(()=>{
        carrito.length = 0
    renderCarrito()
    carritoTotal()
    }, 1000)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su compra',
        showConfirmButton: false,
        timer: 1000
      })
   

})

 
function mostrarSugerencias(){
    fetch('archivos.json')
    .then((respuesta) => respuesta.json())
    .then((data) => {
         data.forEach((post) => {
            const div = document.createElement('div')
            sugerenciaProd.innerHTML += `<div class="card"  style="width: 18rem;">
                                        <img src="${post.img}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${post.Nombre}</h5>
                                        <p class="card-text">${post.precio}</p>
                                        <a href ="${post.id}" class="btn btn-primary">Mas informacion</a>
                                        </div>
                                    </div>`
            

         })
    })
}

mostrarSugerencias()