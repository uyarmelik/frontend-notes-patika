const section = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

fetch("../json/menu.json")
  .then((response) => response.json())
  .then((menuJSON) => {
    const categories = menuJSON.reduce(
      (values, item) => {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["All"]
    );

    const categoryList = () => {
      const categoryBtns = categories
        .map((category) => {
          return `<button class="btn btn-outline-dark btn-item" data-id=${category}>${category}</button>`;
        })
        .join("");

      btnContainer.innerHTML = categoryBtns;
      const filterBtns = document.querySelectorAll(".btn-item");

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const category = e.currentTarget.dataset.id;
          console.log(category);
          const menuCategory = menuJSON.filter((menuItem) => {
            if (menuItem.category === category) {
              return menuItem;
            }
          });
          if (category === "All") {
            menuList(menuJSON);
          } else {
            menuList(menuCategory);
          }
        });
      });
    };

    const menuList = (menuItems) => {
      let displayMenu = menuItems.map((item) => {
        return `<div class="menu-items col-lg-6 col-sm-12">
                  <a href="${item.img}" target="_blank">
                  <img src=${item.img} alt=${item.title} class="photo"/>
                  </a>
                  <div class="menu-info">
                    <div class="menu-title">
                      <h4>${item.title}</h4>
                      <h4 class="price">${item.price} TL</h4>
                    </div>
                    <div class="menu-text">
                    ${item.desc}
                    </div>
                  </div>
                </div>
                `;
      });
      displayMenu = displayMenu.join("");
      section.innerHTML = displayMenu;
    };

    menuList(menuJSON);
    categoryList();
  })
  .catch((error) => {
    console.error("JSON verisi yüklenirken bir hata oluştu: " + error);
  });