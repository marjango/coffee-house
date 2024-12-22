generateProductTabs();

const refreshBtn = document.querySelector(".products__refresh-icon");
refreshBtn.addEventListener("click", () => {
  refreshBtn.classList.add("products__refresh-icon_fetch-made");
  const subloadedCards = document.querySelectorAll(".card_subloaded");
  subloadedCards.forEach((card) => card.classList.remove("card_hidden"));
});

window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth > 768) {
    refreshBtn.classList.remove("products__refresh-icon_fetch-made");
    const subloadedCards = document.querySelectorAll(".card_subloaded");
    subloadedCards.forEach((card) => card.classList.add("card_hidden"));
  }
});

document.getElementById("modal").addEventListener("toggle", () => {
  const windowWidthBefore = document.documentElement.clientWidth;
  document.body.classList.toggle("scroll-block-modal");
  document.body.classList.toggle("modal-open");
  const windowWidthAfter = document.documentElement.clientWidth;

  if (windowWidthBefore < windowWidthAfter) {
    document.body.style.paddingRight = `${
      windowWidthAfter - windowWidthBefore
    }px`;
  } else {
    document.body.style.paddingRight = "";
  }
});

const productsContainer = document.querySelector(".products__tab");
productsContainer.addEventListener("click", showProduct);

async function showProduct(e) {
  const cardId = e.target.closest("[popovertarget='modal']")?.dataset?.id;
  if (!cardId) return;

  const product = (
    await fetch("../products.json").then((res) => res.json())
  ).find((product) => product.id === Number(cardId));

  openModal(product);
}

function openModal(data) {
  const modal = document.getElementById("modal");
  modal.innerHTML = `<div class="modal__wrapper">
        <div class="modal__container">
          <div
            class="modal__preview scale__container scale__trigger card__image"
          >
            <!-- <img
              class="scale__target modal__image"
              src="../assets/img/coffee/coffee-1.jpg"
              alt=""
            /> -->
          </div>
          <form action="#" method="get" class="modal__form">
            <div class="modal__title">
              <!-- <h3>Irish coffee</h3>
              <p>
                Fragrant black coffee with Jameson Irish whiskey and whipped
                milk
              </p> -->
            </div>
            <div class="modal__selection">
              <span>Size</span>
              <div class="modal__tab-block modal__tab-block_size">
                <!-- <label for="s">
                  <input class="modal__selector" type="radio" checked name="size" id="size-s" value="50">
                  <div class="modal-button">
                    <span class="modal-button__icon">S</span
                    ><span class="modal-button__text">200 ml</span>
                  </div>
                </label>
                <label for="m">
                  <input class="modal__selector" type="radio" name="size" id="size-m" value="50">
                  <div class="modal-button">
                    <span class="modal-button__icon">M</span
                    ><span class="modal-button__text">300 ml</span>
                  </div>
                </label>
                <label for="l">
                  <input class="modal__selector" type="radio" name="size" id="size-l" value="50">
                  <div class="modal-button">
                    <span class="modal-button__icon">L</span
                    ><span class="modal-button__text">400 ml</span>
                  </div>
                </label> -->
              </div>
            </div>
            <div class="modal__selection">
              <span>Additives</span>
              <div class="modal__tab-block modal__tab-block_additives">
                <!-- <label for="sugar">
                  <input class="modal__selector" type="checkbox" name="sugar" id="sugar" value="0">
                  <div class="modal-button">
                    <span class="modal-button__icon">1</span
                    ><span class="modal-button__text">Sugar</span>
                  </div>
                </label>
                <label for="cinnamon">
                  <input class="modal__selector" type="checkbox" name="cinnamon" id="cinnamon" value="50">
                  <div class="modal-button">
                    <span class="modal-button__icon">2</span
                    ><span class="modal-button__text">Cinnamon</span>
                  </div>
                </label>
                <label for="syrup">
                  <input class="modal__selector" type="checkbox" name="syrup" id="syrup" value="100">
                  <div class="modal-button">
                    <span class="modal-button__icon">3</span
                    ><span class="modal-button__text">Syrup</span>
                  </div>
                </label> -->
              </div>
            </div>
            <div class="modal__total">
              <h3>Total:</h3>
              <h3 class="modal__price">$7.00</h3>
            </div>
            <div class="modal__alert">
              <img src="../assets/icons/info-empty.svg" />
              <p class="text_caption">
                The cost is not final. Download our mobile app to see the final
                price and place your order. Earn loyalty points and enjoy your
                favorite coffee with up to 20% discount.
              </p>
            </div>
            <button class="modal-button modal-button_wide modal__close"
                    type="button"
                    popovertarget="modal"
                    popovertargetaction="hide">
              <span
                class="modal-button__text"
                >Close</span
              >
            </button>
          </form>
        </div>
      </div>`;
  const imagePreview = modal.querySelector(".modal__preview");
  const image = document.createElement("img");
  image.src = data.img_src;
  image.classList.add("scale__target", "modal__image");
  imagePreview.append(image);
  const modal__titleParagraph = modal.querySelector(".modal__title");
  modal__titleParagraph.innerHTML = `<h3>${data.name}</h3><p>${data.description}</p>`;

  const hiddenPriceInput = document.createElement("input");
  hiddenPriceInput.type = "hidden";
  hiddenPriceInput.name = "initialPrice";
  hiddenPriceInput.value = data.price;
  modal__titleParagraph.after(hiddenPriceInput);
  const tabBlockSize = modal.querySelector(".modal__tab-block_size");
  const tabBlockAdditives = modal.querySelector(".modal__tab-block_additives");
  createSizeTabs();
  createAdditivesTAb();
  function createSizeTabs() {
    const dataArr = Object.entries(data.sizes);
    for (let i = 0; i < dataArr.length; i += 1) {
      const label = document.createElement("label");
      label.for = `size-${dataArr[i][0]}`;
      label.innerHTML = `<input class="modal__selector" type="radio" ${
        i === 0 ? "checked" : ""
      } name="size" id="${dataArr[i][0]}" value="${dataArr[i][1]["add-price"]}">
                  <div class="modal-button">
                    <span class="modal-button__icon">${dataArr[
                      i
                    ][0].toUpperCase()}</span
                    ><span class="modal-button__text">${
                      dataArr[i][1].size
                    }</span>
                  </div>`;
      tabBlockSize.append(label);
    }
  }
  function createAdditivesTAb() {
    for (let i = 0; i < data.additives.length; i += 1) {
      const label = document.createElement("label");
      label.for = `size-${data.additives[i].name}`;
      label.innerHTML = `<input class="modal__selector" type="checkbox" name="${
        data.additives[i].name
      }" id="${data.additives[i].name}" value="${
        data.additives[i]["add-price"]
      }">
                  <div class="modal-button">
                    <span class="modal-button__icon">${i + 1}</span
                    ><span class="modal-button__text">${
                      data.additives[i].name
                    }</span>
                  </div>`;
      tabBlockAdditives.append(label);
    }
  }

  calculatePrice();
  function calculatePrice() {
    const modalForm = document.querySelector(".modal__form");
    const priceContainer = modalForm.querySelector(".modal__price");
    const priceSumm = [...modalForm.elements]
      .filter(
        (el) =>
          (el.tagName === "INPUT" && el.checked) ||
          (el.tagName === "INPUT" && el.type === "hidden")
      )
      .reduce((acc, curr) => acc + Number(curr.value), 0);

    priceContainer.textContent = `$${(priceSumm / 100).toFixed(2)}`;
  }

  modal.querySelector(".modal__form").addEventListener("change", calculatePrice);
}

async function generateProductTabs() {
  const categories = await getCategories();
  async function getCategories() {
    const products = await fetch("../products.json").then((res) => res.json());
    const categoriesObj = products
      .map((product) => ({
        [product.category]: product.category_icon_path,
      }))
      .reduce((acc, curr) => {
        Object.keys(curr).forEach((key) => {
          if (!acc[key]) {
            acc[key] = curr[key];
          }
        });
        return acc;
      }, {});
    return categoriesObj;
  }

  const tabsContainer = document.querySelector(
    ".products__switchers.tabs__switchers"
  );
  generateTabSwitchers(tabsContainer, categories);

  const productsContainer = document.querySelector(".products__tab");
  generateProductsTiles(productsContainer, Object.keys(categories)[0]);
}

function generateTabSwitchers(container, categories) {
  Object.entries(categories).forEach((info, i) => {
    const button = createTabSwitcher(info, i);
    container.append(button);

    function createTabSwitcher([category, iconPath], position) {
      const tabSwitcher = document.createElement("button");
      tabSwitcher.classList.add("tab-button");
      if (position === 0) {
        tabSwitcher.classList.add("tab-button_active");
      }
      tabSwitcher.dataset.category = category;
      tabSwitcher.innerHTML = `<span class="tab-button__icon"
                    ><img src="${iconPath}"
                  ></span>
                  <span class="tab-button__text">${
                    category[0].toUpperCase() + category.slice(1)
                  }</span>`;

      return tabSwitcher;
    }
  });

  container.addEventListener("click", switchTab);
  function switchTab(e) {
    const button = e.target.closest(".tab-button:not(.tab-button_active)");
    if (!button) return;

    const currentActiveButton = container.querySelector(".tab-button_active");
    currentActiveButton.classList.remove("tab-button_active");
    button.classList.add("tab-button_active");
    const category = button.dataset.category;

    const productsContainer = document.querySelector(".products__tab");
    generateProductsTiles(productsContainer, category);
  }
}

async function generateProductsTiles(productsContainer, category) {
  productsContainer.innerHTML = "";
  const refreshBtn = document.querySelector(".products__refresh-icon");
  refreshBtn.classList.remove(
    "products__refresh-icon_no-fetch",
    "products__refresh-icon_fetch-made"
  );

  const products = await fetch("../products.json").then((res) => res.json());
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  filteredProducts.forEach((product, i) => {
    const card = createProductCard(product, i);
    productsContainer.append(card);
  });
  function createProductCard(product, position) {
    const card = document.createElement("button");
    card.setAttribute("popovertarget", "modal");
    card.classList.add("card", "scale__trigger");
    if (position > 3) {
      card.classList.add("card_hidden", "card_subloaded");
    }
    card.dataset.id = `${product.id}`;
    card.innerHTML = `<div class="card__image scale__container">
                  <img
                    class="scale__target"
                    src=${product.img_src}
                    alt=${product.name}"
                  >
                </div>
                <div class="card__description">
                  <div class="card__title">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                  </div>
                  <h3 class="product-price">$${(product.price / 100).toFixed(2)}</h3>
                </div>`;

    return card;
  }

  if (filteredProducts[0].total_in_category <= 4) {
    const refreshBtn = document.querySelector(".products__refresh-icon");
    refreshBtn.classList.add("products__refresh-icon_no-fetch");
  }
}
