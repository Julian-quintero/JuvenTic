const clickButton = document.querySelectorAll('.button');
const contenidoCarrito = document.querySelector('.contenido-carrito');
// console.log(clickButton);
let carrito = []

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem);
    // btn.addEventListener('click', () => console.log('button'))
});

function addToCarritoItem(e) {
    const button = e.target;
    // console.log(button);
    const item = button.closest('.contenido');
    // console.log(item);
    const itemTitle = item.querySelector('.title').textContent;
    // console.log(itemTitle)
    const itemPrice = item.querySelector('.price').textContent;
    const itemImg = item.querySelector('.product-img').src;
    // console.log(itemImg);

    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        quantity: 1
    }

    addItemCarrito(newItem);
}
/* Agregar */

function addItemCarrito(newItem) {
    
    const inputElement = contenidoCarrito.getElementsByClassName('input');

    for(let i=0; i< carrito.length; i++) {
        if(carrito[i].title.trim() == newItem.title.trim()){
            carrito[i].quantity++;
            const inputValue = inputElement[i];
            inputValue.value++;
            carritoTotal();
            return null;
        }
    }
    
    carrito.push(newItem);
    renderCarrito();
}

function renderCarrito(){
    contenidoCarrito.innerHTML = '';
    // console.log(carrito);
    carrito.map(item => {
        const div = document.createElement('div');
        div.classList.add('itemCarrito');
        const content = `
        <div style="width: 70%; margin-bottom: 40px;">
            <div class="img">
                <img src="${item.img}" class="product-img" style="border-radius: 10px;">
            </div>
            <div class="info">
                <h4 class="title" style="display: inline-block;">${item.title}</h4> 
                <h4 style="display: inline-block;">&nbsp : &nbsp $<span class="price">${item.price} &nbsp; </span> &nbsp; </h4>
                <div style="display: inline-block;">
                    <button class="btn-delete btn-light"> <i class="fas fa-trash" style="color: black"></i></button>
                </div>
                
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur possimus odit nulla alias, dolore numquam, vitae.
                </p>
                <button class="btn-danger"><i class="fas fa-minus"></i></button>
                <input type="number" style="width: 20%;" class="input" value="${item.quantity}"> 
                <button class="btn-success"><i class="fas fa-plus"></i></button>
            </div>  
        </div>
        `
        div.innerHTML = content;
        contenidoCarrito.append(div);

        div.querySelector('.btn-delete').addEventListener('click', removeItemCarrito);
        div.querySelector('.input').addEventListener('change', sumaCantidad)
        // Boton Incrementar
        div.querySelector('.btn-success').addEventListener('click',increment)
        // Boton Disminuir
        div.querySelector('.btn-danger').addEventListener('click',decrement)
    });
    carritoTotal();
}

function carritoTotal() {
    let total=0;
    const itemCartTotal = document.querySelector('.carritoTotal');
    carrito.forEach((item) => {
        const precio = Number(item.price);
        total = total + precio*item.quantity;
    });

    if(total == 0)
        itemCartTotal.innerHTML = `<h2 class="total">Total:  $ ${total}</h2>`
    else
        itemCartTotal.innerHTML = `<h2 class="total">Total:  $ ${total}.000</h2>`
    
    addLocalStorage();
}

function removeItemCarrito(e){
    const buttonDelete = e.target;
    const div = buttonDelete.closest(".itemCarrito");
    const title = div.querySelector('.title').textContent;

    for(let i=0; i<carrito.length; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i,1);
        }
    }
    div.remove();
    carritoTotal();
}

function sumaCantidad(e){
    const sumaInput = e.target;
    console.log(sumaInput)
    const div = sumaInput.closest(".itemCarrito");
    const title = div.querySelector('.title').textContent;

    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.quantity = sumaInput.value;
            carritoTotal();
        }
    });
    // console.log(carrito);
}

// Boton Incrementar
function increment(e){
    const increment = e.target;
    console.log(increment);
    const div = increment.closest(".itemCarrito");
    console.log(div)
    const title = div.querySelector('.title').textContent;
    let input = div.querySelector('.input');
    console.log("---------",input.value);
    input.value++;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            item.quantity = input.value;
            console.log("--Entre en el if--")
            carritoTotal();
        }
    });
}
// Boton Disminuir
function decrement(e){
    const increment = e.target;
    console.log(increment);
    const div = increment.closest(".itemCarrito");
    console.log(div)
    const title = div.querySelector('.title').textContent;
    console.log(title)
    let input = div.querySelector('.input');
    input.value--;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            input.value < 1 ? (input.value = 1) : input.value;
            item.quantity = input.value;
            console.log("--Entre en el if--")
            carritoTotal();
        }
    });
}
// LocalStorage
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito();
    }
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Mensaje del Boton Pagar
document.getElementById("button-pay").addEventListener('click',buttonPay);

function buttonPay(){
    console.log(carrito);
    let totalPedido = document.querySelector('.carritoTotal').textContent;
    let mensaje = document.getElementById('message');
    let productos="";
    let valores= document.querySelectorAll('.input');
    for(let i=0; i<carrito.length; i++){
        let title=carrito[i].title;
        let precio=carrito[i].price;
        productos=productos+title+" : $"+precio+" Cantidad: "+valores[i].value+", ";
    }
    // mensaje.innerHTML = `El pedido es: ${productos} ${totalPedido}`;
    mensaje.innerHTML = `${totalPedido}`;
    console.log(mensaje);
    document.getElementById('submit').click();
}