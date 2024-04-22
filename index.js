const modal = document.querySelector('.cart_modal-overlay')
const cartBtn = document.querySelector('.cart-btn')

let cart = []

cartBtn.addEventListener('click', (event) => {
    modal.classList.add('open')
    renderCart(cart)
})

modal.addEventListener('click', (event) => {
    if(
        event.target.classList.contains('cart_modal-overlay') || 
        event.target.closest('.cart_modal-overlay-close')
    ){
        modal.classList.remove('open')
    }
})

let menuBtn = document.querySelector('#menu-btn')
let navbar = document.querySelector('.header_navbar')

menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times')
    navbar.classList.toggle('active')
}

const shopData = [
    {
        id: 1,
        src: "images/AllButter.png",
        name: "All-butter",
        type: "Croissant",
        price: 12
    },
    {
        id: 2,
        src: "images/Almond.png",
        name: "Almond",
        type: "Croissant",
        price: 12
    },
    {
        id: 3,
        src: "images/Raspberry.png",
        name: "Raspberry",
        type: "Danish",
        price: 12
    },
    {
        id: 4,
        src: "images/PainAux.png",
        name: "Pain Aux",
        type: "Raisins",
        price: 12
    },
    {
        id: 5,
        src: "images/apricot.png",
        name: "Apricot",
        type: "Danish",
        price: 12
    },
    {
        id: 6,
        src: "images/PainAu.png",
        name: "Pain Au",
        type: "Chocolat",
        price: 12
    },
]

const increaseCount = (cardId) => {
    const card = cart.find(card => card.id == cardId)
    const cartItem = document.querySelector(`.cart_item[data-id="${card.id}"]`)
    if(card.count < 5){
        card.count += 1
        cartItem.querySelector('.cart_item-price').textContent = card.count * card.price + '£'
        cartItem.querySelector('.cart_item-count').textContent = card.count;
        saveCartToLocalStorage()
    }
}

const decreaseCount = (cardId) => {
    const card = cart.find(card => card.id == cardId)
    const cartItem = document.querySelector(`.cart_item[data-id="${cardId}"]`)
    if(card.count > 1){
        card.count -= 1
        cartItem.querySelector('.cart_item-count').textContent = card.count;
        cartItem.querySelector('.cart_item-price').textContent = card.count * card.price + '£'
        saveCartToLocalStorage()
    }
}

const deleteItem = (cardId) => {
    cart = cart.filter(card => card.id !== cardId)
    renderCart(cart)
}

const renderCart = (cart) => {
    const cartBody = document.querySelector('.cart_modal-body')
    cartBody.innerHTML = ''

    if(cart.length !== 0){
            cart.forEach(cartCard => {
                cartBody.insertAdjacentHTML('beforeend', 
            `
            <div class="cart_item" data-id="${cartCard.id}">
                <div class="cart_item-img-block">
                    <img src=${cartCard.src} alt="#" class="cart_item-img">
                </div>
    
                <div class="cart_item-inf">
                    <p class="cart_item-name">${cartCard.name}</p>
                    <p class="cart_item-type">${cartCard.type}</p>
                </div>
    
                <div class="cart_items-controls">
                    <button type="button" class="cart_item-btn-add" onclick="increaseCount(${cartCard.id})">+</button>
                    <div class="cart_item-count">${cartCard.count}</div>
                    <button type="button" class="cart_item-btn-delete" onclick="decreaseCount(${cartCard.id})">-</button>
                </div>
    
                <p class="cart_item-price">${cartCard.price * cartCard.count}£</p>
                <button type="button" class="cart_item-delete-btn" onclick="deleteItem(${cartCard.id})"> <i class="fa-solid fa-trash"></i> </button>
            </div>
            `)
            })
    }else{
        cartBody.insertAdjacentHTML('beforeend', `
        <div class="cart_item-empty">
            <p>К сожаления корзина пока пуста</p>
        </div>
        `)
    }
}


const addToCart = (id) => {
    const indexItem = cart.findIndex(card => card.id == id)
    if(indexItem != -1){
        const item = cart[indexItem];
        item.count++;
        saveCartToLocalStorage();
        renderCart(cart);
        return
    }
    const card = shopData.find(card => card.id == id)
    card.count = 1
    cart.push(card)
    saveCartToLocalStorage()
    renderCart(cart)
}

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart')

    if (storedCart) {
        cart = JSON.parse(storedCart)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage()
    renderCart(cart)
});

const shopCards = document.querySelector('.shop_cards-block')
shopData.forEach(card => {
    shopCards.insertAdjacentHTML('beforeend',
    `
    <div class="shop_card">
        <div class="shop_card-img-block">
            <img src=${card.src} alt="#" class="shop_card-img">
        </div>
            <p class="shop_card-name">${card.name}</p>
            <p class="shop_card-type">${card.type}</p>
            <p class="shop_card-price">${card.price}£</p>
            <button type="button" onclick="addToCart(${card.id})" class="shop_card-btn">Add to cart</button>
    </div>
    `)
})






