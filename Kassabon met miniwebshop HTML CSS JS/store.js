if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()
}

function ready() {
    var removeCartGameButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartGameButtons.length; i++) {
    var button = removeCartGameButtons[i]
    button.addEventListener('click', removeCartGame) 
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < removeCartGameButtons.length; i++) {
    var input = quantityInput[i]
    input.addEventListener('change', quantityChanged)
    }

    var addToCartBtns = document.getElementsByClassName('btn-add')
    for (var i = 0; i < addToCartBtns.length; i++) {
        var button = addToCartBtns[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Bedankt voor het bestellen bij onze webshop!')
    var cartGames = document.getElementsByClassName('cart-games')[0]
    while(cartGames.hasChildNodes()) {
        cartGames.removeChild(cartGames.firstChild)
    }
    updateCartTotal()
}

function removeCartGame(event) {
    var removeButtonClicked = event.target
    removeButtonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// Quantity minder dan 0 of isNotaNumber maak er 1 van.
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
//----------------------------------------------------------------------------------------
function addToCartClicked(event) {
    var button = event.target
    var shopGame = button.parentElement.parentElement
    var title = shopGame.getElementsByClassName('shop-game-title')[0].innerText
    var price = shopGame.getElementsByClassName('game-price')[0].innerText
    var imgSrc = shopGame.getElementsByClassName('game-image')[0].src
    console.log(title, price, imgSrc)
    addGameToCart(title, price, imgSrc)
    updateCartTotal()
}
//-----------------------------------------------------------------------------------------
function addGameToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartGames = document.getElementsByClassName('cart-games')[0]
    var cartGameNames = cartGames.getElementsByClassName('cart-game-title')
    for (var i = 0; i < cartGameNames.length; i++) {
        if (cartGameNames[i].innerText == title){
            alert('U heeft deze game al toegevoegd aan het winkelmandje.')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-game cart-column">
            <span class="cart-game-title">${title}</span>
         </div>
            <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">VERWIJDER</button>
        </div> `
        cartRow.innerHTML = cartRowContents
    cartGames.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartGame)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//-----------------------------------------------------------------------------------------
function updateCartTotal() {
    var cartGameContainer = document.getElementsByClassName('cart-games')[0]
    var cartRows = cartGameContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100 //tot 2 decimalen
        total = total.toFixed(2); //altijd 2 decimalen
        document.getElementsByClassName('cart-totaal-price')[0].innerText = '€' + total
}