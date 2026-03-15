
let bagItemObject;
let convenience_fee = 99;

onLoad();
 
function onLoad(){
    loadBagItemObjects();
    displayBagItems();
} 

function loadBagItemObjects(){
    console.log(bagItems);
    bagItemObject = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++){
            if (itemId == items[i].id){
                return items[i];
            }
        }
    });     
    console.log(bagItemObject);
}

function displayBagItems(){

    let containerElement = document.querySelector('.bag-items-container')
    let bagPageElement = document.querySelector('.bag-page')
    innerHTML = "";
    
    if (bagItemObject.length > 0){

        bagItemObject.forEach(bagItem => {
        innerHTML += generateItemsHtml(bagItem);
        });

        containerElement.innerHTML = innerHTML;
        displayBagSummary();
    }else {
            bagPageElement.innerHTML = `
            <div class="empty-bag">
            <div class="empty-bag-container">
                <div class="empty-bag-img-container">
                    <img src="../project images/empty_bag.webp" alt="Empty Bag Img" class="empty-bag-img">
                </div>
                <div class="empty-bag-txt">Hey, it feels so light!</div>
                <div class="empty-bag-desc">There is nothing in your bag. Let's add some items.</div>

                <div class="add-items-in-bag">
                    <button class="add-items-in-bag-button" onclick="window.location.href='../html pages/items.html'">Add Items</button>
                </div>
            </div>
        </div>`
    }

}

function generateItemsHtml(item){
    return `<div class="bag-item-container">
                <div class="item-left-part">
                    <img class="bag-item-img" src="${item.image}">
                </div>
                <div class="item-right-part">
                    <div class="company">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price-container">
                        <span class="current-price">Rs ${item.current_price}</span>
                        <span class="original-price">Rs ${item.original_price}</span>
                        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                    </div>
                    <div class="return-period">
                        <span class="return-period-days">${item.return_period} days</span> return available
                    </div>
                    <div class="delivery-details">
                        Delivery by
                        <span class="delivery-details-days">${item.delivery_date}</span>
                    </div>
                </div>

                <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
            </div>`;
}

function removeFromBag(itemId){
    for ( let i = 0; i < bagItems.length; i++){
        if (itemId == bagItems[i]){
            bagItems.splice(i,1);
            localStorage.setItem('bagItems', JSON.stringify(bagItems));
            loadBagItemObjects();
            console.log(bagItemObject);
            displayBagItems();
            displayBagIcon(); // this is taken from index.js
            displayBagSummary();
            break;
        }
    }
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary')

    let totalItem = bagItemObject.length;    
    let totalMRP = 0;
    let totalDiscount = 0;
    let finalPayment;

    bagItemObject.forEach(bagItem =>{
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;

    })
    finalPayment = totalMRP - totalDiscount + convenience_fee;

    bagSummaryElement.innerHTML = `<div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
                    <div class="price-item">
                        <span class="price-item-tag">Total MRP</span>
                        <span class="price-item-value">₹${totalMRP}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Discount on MRP</span>
                        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
                    </div>
                    <div class="price-item">
                        <span class="price-item-tag">Convenience Fee</span>
                        <span class="price-item-value">₹${convenience_fee}</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                        <span class="price-item-tag">Total Amount</span>
                        <span class="price-item-value">₹${finalPayment}</span>
                    </div>
                </div>
                <button class="btn-place-order">
                        <div class="">PLACE ORDER</div>
                </button>
                `
}

//convenienceFee is defined at top
