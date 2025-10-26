"use strict";

const productsGrid = document.querySelector(".products__container--grid");

const JSONparser = async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    function renderProducts(productData) {
      productData.forEach((product) => {
        productsGrid.insertAdjacentHTML(
          "beforeend",
          `<div class="product__preview">
                <div class="product__preview--thumbnail">
                    <img src="${product.image.mobile}" alt="thumbnail" />
                    <div class="product__add">
                        <img src="assets/images/icon-add-to-cart.svg" alt="cart" />
                        <p>Add to Cart</p>
                    </div>
                </div>

                

                <div class="product__preview--details">
                    <p class="product__type">${product.category}</p>
                    <p class="product__name">${product.name}</p>
                    <p class="product__price">$${Number(product.price).toFixed(
                      2
                    )}</p>
                </div>
                                                
            </div>`
        );
      });
    }

    renderProducts(data);
  } catch (error) {
    console.error("Server is down for maintenance, please try again later");
  }
};

JSONparser();
