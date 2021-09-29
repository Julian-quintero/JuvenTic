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
            <div>
                <div class="img">
                    <img src="${item.img}" class="product-img">
                </div>
                <div class="info">
                    <h4 class="title">${item.title}</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur possimus odit nulla alias, dolore numquam, vitae officia reprehenderit, maiores quo nesciunt. Ipsum, ab debitis. Atque necessitatibus obcaecati dolore unde quaerat.
                    </p>
                    <p>
                        $<span class="price">${item.price}</span>
                    </p>
                </div>
                <div class="cart">
                    <button class="add-cart button">
                        <b>CANTIDAD</b>
                        <input type="number" value="${item.quantity}" class="input">
                    </button>
                    <button class="btn-delete"> <i class="fas fa-trash" style="color: black"></i></button>
                </div>
            </div>
        `
        div.innerHTML = content;
        contenidoCarrito.append(div);

        div.querySelector('.btn-delete').addEventListener('click', removeItemCarrito);
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

    itemCartTotal.innerHTML = `<h2>Total:  $ ${total}.000</h2>`
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