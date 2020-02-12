//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
// var userCart = [];
// var list = fetchData ();
 
class GoodsItem {
    constructor(title, price, id, img) {
      this.title = title;
      this.price = price;
      this.id = id,
      this.img = img
    }
    render() {
      return `<div class="product-item" data-id="${this.id}">
                              <img src="${this.img}" alt="Some img">
                              <div class="desc">
                                  <h3>${this.title}</h3>
                                  <p>${this.price} $</p>
                                  <button class="buy-btn" 
                                  data-id="${this.id}"
                                  data-name="${this.title}"
                                  data-image="${this.img}"
                                  data-price="${this.price}">Купить</button>
                              </div>
            </div>`;
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }
    fetchGoods() {
      this.goods = [
        { title: 'Notebook', price: 1000, id:0, img: image},
        { title: 'Display', price: 200, id:1, img: image },
        { title: 'Keyboard', price: 20, id:2, img: image },
        { title: 'Mouse', price: 10, id:3, img: image },
        { title: 'Phones', price: 25, id:4, img: image },
        { title: 'Router', price: 30, id:5, img: image },
        { title: 'USB-camera', price: 18, id:6, img: image },
        { title: 'Gamepad', price: 24, id:7, img: image },
      ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price, good.id, good.img);
          listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
    sumItems() {
        let sum = 0;
        this.goods.forEach(good => {
        //   const goodItem = good.price;
          sum += parseInt(good.price);
        });
        console.log('sum: '+sum);
    }
    
  }

  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.sumItems();

  class Cart{
    addProduct(product){
        let productId = +product.dataset['id'];
        let find = userCart.find (element => element.id === productId);
        if (!find) {
            userCart.push ({
                name: product.dataset ['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        }  else {
            find.quantity++
        }
        renderCart ()
    }
    removeProduct (product) {
            let productId = +product.dataset['id'];
            let find = userCart.find (element => element.id === productId);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                userCart.splice(userCart.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
            }
            renderCart ();
    }
    renderCart () {
            let allProducts = '';
            for (el of userCart) {
                allProducts += `<div class="cart-item" data-id="${el.id}">
                                    <div class="product-bio">
                                        <img src="${el.img}" alt="Some image">
                                        <div class="product-desc">
                                            <p class="product-title">${el.name}</p>
                                            <p class="product-quantity">Quantity: ${el.quantity}</p>
                                            <p class="product-single-price">$${el.price} each</p>
                                        </div>
                                    </div>
                                    <div class="right-block">
                                        <p class="product-price">${el.quantity * el.price}</p>
                                        <button class="del-btn" data-id="${el.id}">&times;</button>
                                    </div>
                                </div>`
            }
        
            document.querySelector(`.cart-block`).innerHTML = allProducts;
    }
  }

  //CART

// Добавление продуктов в корзину
// function addProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (!find) {
//         userCart.push ({
//             name: product.dataset ['name'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     }  else {
//         find.quantity++
//     }
//     renderCart ()
// }

// //удаление товаров
// function removeProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

// //перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }


//кнопка скрытия и показа корзины
// document.querySelector('.btn-cart').addEventListener('click', () => {
//     document.querySelector('.cart-block').classList.toggle('invisible');
// });
//кнопки удаления товара (добавляется один раз)
// document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('del-btn')) {
//         removeProduct (evt.target);
//     }
// })
//кнопки покупки товара (добавляется один раз)
// document.querySelector('.products').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('buy-btn')) {
//         addProduct (evt.target);
//     }
// })

//создание массива объектов - имитация загрузки данных с сервера
// function fetchData () {
//     let arr = [];
//     for (let i = 0; i < items.length; i++) {
//         arr.push (createProduct (i));
//     }
//     return arr
// };

// //создание товара
// function createProduct (i) {
//     return {
//         id: ids[i],
//         name: items[i],
//         price: prices[i],
//         img: image,
//         quantity: 0,
//         createTemplate: function () {
//             return `<div class="product-item" data-id="${this.id}">
//                         <img src="${this.img}" alt="Some img">
//                         <div class="desc">
//                             <h3>${this.name}</h3>
//                             <p>${this.price} $</p>
//                             <button class="buy-btn" 
//                             data-id="${this.id}"
//                             data-name="${this.name}"
//                             data-image="${this.img}"
//                             data-price="${this.price}">Купить</button>
//                         </div>
//                     </div>`
//         },

//         add: function() {
//             this.quantity++
//         }
//     }
// };

// //рендер списка товаров (каталога)
// function renderProducts () {
//     let arr = [];
//     for (item of list) {
//         arr.push(item.createTemplate())
//     }
//     document.querySelector('.products').innerHTML = arr.join();
// }

// function init (){
//     console.log('init start');
//     var list = fetchData ();
//     renderProducts ();
// }

// init ();

// renderProducts ();

//CART

// Добавление продуктов в корзину
// function addProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (!find) {
//         userCart.push ({
//             name: product.dataset ['name'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     }  else {
//         find.quantity++
//     }
//     renderCart ()
// }

// //удаление товаров
// function removeProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

// //перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }
