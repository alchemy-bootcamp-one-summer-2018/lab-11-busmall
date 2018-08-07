'use strict';
(function(module) {

    let html = module.html;
    let IndividualProduct = module.IndividualProduct;

    // create the flex box that puts the three images side by side
    let template = function() {
        return html`<div class = 'flex-box-choices'><br></div>`;
    };

    // takes in three products to display and renders them
    class ProductsChosenList {
        constructor(props) {
            this.products = props.products; // three chosen products
        }

        // when user submits form, update display
        update(props) {
            let products = props.products;
            let individualProduct = new IndividualProduct({
                individualProduct: individualProduct,
            });

            // remove all data from view
            for(let i = 0; i < 3; i++) {
                this.flexBoxChoices.children[i].remove();
            }

            //view three new products
            for(let i = 0; i < products.length; i++) {
                this.updateProduct(products[i]);
            }
        }

        updateProduct(product) {
            let individualProduct = new IndividualProduct({
                product: product,
            });
            this.flexBoxChoices.appendChild(individualProduct.render());
        }

        // when page first loads display three images
        render() {
            // create new product display
            let dom = template();
            this.flexBoxChoices = dom.querySelector('div.flex-box-choices');
            let products = this.products;

            for(let i = 0; i < products.length; i++) {
                this.updateProduct(products[i]);
            }
            return dom;
        }
    }

    module.ProductsChosenList = ProductsChosenList;

})(window.module = window.module || {});