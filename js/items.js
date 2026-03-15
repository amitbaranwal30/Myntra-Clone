let bagItems;

onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr): [];
    dispalyItemOnHomePage();
    displayBagIcon();
} 


function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count')
    if (bagItems.length > 0){
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    } else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function dispalyItemOnHomePage(){
    const itemsContainerElement = document.querySelector('.items-container')

    if (!itemsContainerElement){
        return;
    }   
    let innerHtml = '';
    items.forEach(item => {

    innerHtml += `
            <div class="item-container">
                <img class="item-image" src="${item.image}" alt="">
                <div class="rating">
                    ${item.rating.stars} ⭐| ${item.rating.count}
                </div>
                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% off)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>`;
    })

    itemsContainerElement.innerHTML = innerHtml;
}

// to refrech the page on click of backbutton 
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});


