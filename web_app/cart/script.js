const products=[
    {id: 1, name: "Product1", price: 19.86},
    {id: 2, name: "Product2", price: 22.65},
    {id: 3, name: "Product3", price: 94.69},
]

let cart=JSON.parse(localStorage.getItem("cart")) || [];

const productList=document.getElementById('product-list')
const cartItems=document.getElementById('cart-items')
const emptyCart=document.getElementById('empty-cart')
const cartTotal=document.getElementById('cart-total')
const totalPriceDisplay=document.getElementById('total-price')
const checkoutBtn=document.getElementById('checkout-btn')

function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart))
}

products.forEach(product=>{
    const productDiv= document.createElement('div');
    productDiv.classList.add("product");
    productDiv.innerHTML=`
    <span>${product.name}-$${product.price}</span>
    <button data-id="${product.id}">Add</button>
    `;
    productList.appendChild(productDiv);
});

productList.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON') {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find((p)=>p.id === productId);
        addtoCart(product);
        console.log(cart) //remove later
    }
})

function addtoCart(product){
    const existingProduct=cart.find(p=>p.id === product.id);
    if(existingProduct){
        existingProduct.quantity+=1;
    }else{
        cart.push({...product, quantity: 1})
    }
    saveCart();
    renderCart();
}

function deleteFromCart(productId){
    const item=cart.find(p=>p.id === productId);
    if(item.quantity>1){
        item.quantity-=1;
    }else{
        cart=cart.filter(p=>p.id !== productId);
    }
    console.log(cart)
    saveCart();
    renderCart();
}

function renderCart(){
    cartItems.innerText="";
    let totalPrice=0;

    if(cart.length>0){
        
        cart.forEach((item)=>{
            const productTotal=item.price*item.quantity;
            totalPrice+=productTotal;
            
            const cartItemDiv=document.createElement('div')
            cartItemDiv.innerHTML=`
            <span>${item.name} - $${item.price} x ${item.quantity} = $${productTotal.toFixed(2)}</span>
            <button data-id="${item.id}">Delete</button>
            `;
            const deleteBtn=cartItemDiv.querySelector('button')
            deleteBtn.addEventListener('click',(e)=> deleteFromCart(item.id))

            cartItems.appendChild(cartItemDiv);
        })
        totalPriceDisplay.textContent=`${totalPrice.toFixed(2)}`
        
    }else{
        totalPriceDisplay.textContent = `$0.00`;
    }
}

checkoutBtn.addEventListener('click',()=>{
    cart.length=0;
    cart = [];
    localStorage.removeItem("cart");
    alert("Sussessfull");
    renderCart();
})

document.addEventListener('DOMContentLoaded',renderCart());