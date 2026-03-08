const buyButtons = document.querySelectorAll(".btn-primary");
const storeTitle = document.querySelector("h1");
const cartTable = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

let cart = [];
let total = 0;

storeTitle.addEventListener("mouseover", () => {
  storeTitle.classList.add("text-primary");
});

storeTitle.addEventListener("mouseout", () => {
  storeTitle.classList.remove("text-primary");
});

buyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const productName = card.querySelector("h5").innerText;
    const priceText = e.target.innerText;
    const price = parseInt(priceText.replace(/[^0-9]/g, ""));

    addToCart(productName, price);

    e.target.innerText = "In Cart";
    e.target.classList.replace("btn-primary", "btn-success");
    e.target.disabled = true;
  });
});

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

function updateCartUI() {
  cartTable.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>`;
    cartTable.innerHTML += row;
  });

  totalPriceElement.innerText = `$${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`Order successful! Total: $${total}`);
    cart = [];
    updateCartUI();
  }
}

function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    updateCartUI();
  }
}
