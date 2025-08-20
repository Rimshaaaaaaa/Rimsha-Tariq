document.addEventListener("DOMContentLoaded", () =>{
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDesc = document.getElementById("modalDesc");
    const variantSelect = document.getElementById("varientSelect");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const closeBtn = document.querySelector(".close-btn");

    let selectedProductHandle = "";
    //Open modal on product click
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            modal.classList.remove("hidden");
            modalTitle.textContent = card.dataset.title;
            modalPrice.textContent = card.dataset.price;
            modalDesc.textContent = card.dataset.description;
            selectedProductHandle = card.dataset.handle;

            //populate varients dynamically 
            variantSelect.innerHTML = `
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Black - Medium</option>
            `;
        });
    });
    //close Modal
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

    //Add to cart
    addToCartBtn.addEventListener("click", () => {
        const chosenVariant = variantSelect.value ;

        // Add main product to cart
        fetch("/cart/add.js", {
            method: "POST",
            header: { "Content-Type": "application/json"},
            body: JSON.stringify({ items: [{ quantity: 1, id: selectedProductHandle}]})
        });

        // Special rule: add soft Winter Jackets if Black + Medium\
        if (chosenVarient.includes("Black") && chosenVarient.includes("Medium")) {
            feth("/cart/add.js", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: [{ quantity: 1, id: "soft-winter-jakect-handle"}]})
            });
        }
        
        alert("Added to cart!");
        modal.classList.add("hidden");

});


});
