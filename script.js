let foods = ['Pizza Margherita', 'Pizza O Sole Mio', 'Pizza Caprese', 'Kids Box', 'Chicken Burger', 'Chees Nuggets', 'Gemischter Salat'];
let prices = [4.50, 6.50, 6.00, 6.50, 5.50, 6.50, 7.00];
let ingredients = ['mit Tomatensauce und Käse', 'mit Salami, Schinken, Champignons, Peperoni und Oliven', 'mit Schinken, Mozarella, Tomaten und Basilikum', 'mit einer kleinen Portion Pommesfrites, 5 Chicken Nuggets, Capri-Sonne 0,2l und einem Spielzeug', 'mit Jalapenos, Käse und extra scharfer Sauce', '10 Stück', 'mit Schafskäse, Oliven, Peperoni und Zwiebel'];

let basket_foods = [];
let basket_prices = [];
let basket_amounts = [];


function render() {
    renderContent();
}

function renderContent() {
    let content = document.getElementById('contentMeals');
    content.innerHTML = '';

    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const price = prices[i];
        const ingredient = ingredients[i];
        const formattedPrice = price.toFixed(2).replace('.', ',');

        content.innerHTML += generateContentHTML(i, food, price, ingredient, formattedPrice);
    }
    renderBasket();
}

function generateContentHTML(i, food, price, ingredient, formattedPrice) {
    return `
    <div class = "pizzaClass" onclick="addFoodToBasket(${i})">
            <div class = "menuHead">
            <span>
                <h2>${food}</h2>
            </span>
            <span>
                <img src="img/plus_circle.png" class="plusCircle">
            </span>
            </div>
            <span>${ingredient}</span>
            <br>
            <span><b>${formattedPrice} €</b></span>
        </div>        
        `;
}

function renderBasket() {
    if (basket_foods.length >= 1) {
        renderFullBasket();
    } else {
        renderEmptyBasket();
    }
}

function renderEmptyBasket() {
    if (basket_foods.length == 0) {
        let emptyBasket = document.getElementById('emptyBasket');
        emptyBasket.innerHTML = `
    <div>
                    <img src="img/shoppingbag.png" class="shoppingbag">
                    <br>
                    <h2>Fülle deinen Warenkorb</h2>
                    Füge einige leckere Gerichte aus
                    der Speisekarte hinzu und bestelle
                    dein Essen.
                </div>
    `;
    } else {
        renderFullBasket();
    }
}

function renderFullBasket() {
    if (basket_foods.length == 0) {
        document.getElementById('sumArea').innerHTML = '';
        document.getElementById('toFillBasked').innerHTML = '';
        renderEmptyBasket();
    } else {
        let toFillBasked = document.getElementById('toFillBasked');
        toFillBasked.innerHTML = '';

        for (let i = 0; i < basket_foods.length; i++) {
            const basketFood = basket_foods[i];
            const basketPrice = basket_prices[i];
            const basketAmount = basket_amounts[i];
            const sum = basketPrice * basketAmount;
            const sumTotal = sum.toFixed(2).replace('.', ',');
            let sub = 0;
            let subTotal = sub + sumTotal;

            toFillBasked.innerHTML += renderFullBasketHTML(i, basketAmount, basketFood, sumTotal, basketPrice, sum, sumTotal, sub);
        }
        subTotal();
    }
}

function renderFullBasketHTML(i, basketAmount, basketFood, sumTotal, basketPrice, sum, sumTotal, sub) {
    return `        
                    <span><b>${basketAmount} x</b></span>
                    <span><b>${basketFood}</b></span>
                    <span>${sumTotal} €</span>
                    <div class="addDeletedButtonBasked">
                        <img src="img/minus_circle.png" class="plusCircle" onclick="deleteFood(${i})">
                        <img src="img/plus_circle.png" class="plusCircle" onclick="addFurtherFood(${i})">
                    </div>                         
        `;
}

function subTotal() {
    let sumArea = document.getElementById('sumArea');
    let sub = 0;
    for (let i = 0; i < basket_prices.length; i++) {
        const deliveryCost = 1;
        let sumTotal = basket_prices[i] * basket_amounts[i];
        let subTotal = sumTotal;
        sub += basket_prices[i] * basket_amounts[i];
        const deliverySum = deliveryCost + sub;

        sumArea.innerHTML = '';
        sumArea.innerHTML += generateSubTotalHTML(i, sub, deliverySum, sumTotal, subTotal, deliveryCost, sumArea);
    }
}

function generateSubTotalHTML(i, sub, deliverySum, sumTotal, subTotal, deliveryCost) {
    return `
    <div>
                            <span>Zwischensumme</span>
                            <span>${sub.toFixed(2).replace('.', ',')} €</span>
                        </div>
                        <div>
                            <span>Lieferkosten</span>
                            <span>1,00 €</span>
                        </div>
                        <div>
                            <span><b>Gesamt</b></span>
                            <span><b>${deliverySum.toFixed(2).replace('.', ',')} €</b></span>
                        </div>
                        <div class="payButton" onclick="order()">
                        <div>
                            <span><b>Bezahlen</b></span>
                            <span><b>(${deliverySum.toFixed(2).replace('.', ',')} €)</b></span>
                        </div>
                        </div>
                        `;
}

function addFoodToBasket(i) {
    let addFood = foods[i];
    let addPrice = prices[i];
    let index = basket_foods.indexOf(addFood);
    if (index == -1) {
        basket_foods.push(addFood);
        basket_prices.push(addPrice);
        basket_amounts.push(1);
    } else {
        basket_amounts[index]++;
    }
    document.getElementById('emptyBasket').innerHTML = '';
    renderFullBasket();
}

function deleteFood(i) {
    if (basket_amounts[i] > 1) {
        basket_amounts[i]--;
    } else {
        basket_foods.splice(i, 1);
        basket_prices.splice(i, 1);
        basket_amounts.splice(i, 1);
    }
    renderFullBasket();
}

function addFurtherFood(i) {
    if (basket_amounts[i] >= 1) {
        basket_amounts[i]++;
    }
    renderFullBasket();
}

function order() {
    alert("Vielen Dank für Deine Bestellung!");
}


function overlayBasket() {
    var mobileBasket = document.getElementById("basked");
    let buttonDis = document.getElementById('buttonDisplay');
    if (mobileBasket.className === "basked") {
        mobileBasket.className = "responsive-basket";
        buttonDis.className = "buttonDisplay";
        scrollStop();
    } else {
        mobileBasket.className = "basked";
        buttonDis.className = "buttonOverlay";
        scrollStart();
    }
}

function scrollStop() {
    document.getElementById('body').classList.add('scrollStop');

}

function scrollStart() {
    document.getElementById('body').classList.remove('scrollStop');
}