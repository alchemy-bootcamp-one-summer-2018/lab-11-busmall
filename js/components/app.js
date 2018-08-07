'use strict';

(function(module) {
    let html = module.html;
    let productApi = module.productApi; //loads products
    let ProductsChosenList = module.ProductsChosenList; //renders three products
    let ProductForm = module.ProductForm; //keeps track of form submissions

    // header of html file with main tag to add things to
    let template = function() {
        return html`
        <header>
            <h1> Market Research </h1>
        </header>   
        <section id='take-survey'>
        <main></main>
        </section>
        `;
    };

    // prints product data to screen upon page load and form submission
    class App {
        render() {
            let dom = template();

            // finds where to place info inside html
            this.main = dom.querySelector('main');

            //load all products
            let products = productApi.load();

            // keep track of votes submitted
            let totalClicks = 0;

            // randomly choose three products not just shown
            let subset = [];
            [subset, products] = chooseThreeProducts(products);

            // display these products
            let productsChosenList = new ProductsChosenList({
                products: subset
            });

            // create submission form
            let productForm = new ProductForm({
                products: products,
                totalClicks: totalClicks,
                productsChosenList: productsChosenList,
                // if form is submitted
                onSubmit: function(products) {
                    //randomly chose another three products and display them
                    [subset, products] = chooseThreeProducts(products);
                    this.productsChosenList = new ProductsChosenList({
                        products: subset
                    });
                    // clear previous products
                    // while(this.form.lastElementChild) {
                    //     console.log(this.form.lastElementChild);
                    //     this.form.lastElementChild.remove();
                    // }

                    // display the new products on the page
                    this.form.appendChild(this.productsChosenList.render());
                }
            });

            // adds products to screen upon page load
            this.main.appendChild(productForm.render());
            return dom;
        }
    }

    module.App = App;

})(window.module = window.module || {});

//get random sample of array using fisher-yates shuffle method
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while(i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function chooseThreeProducts(products) {
    // create list of not most recently viewed items
    let notLastViewed = [];
    for(let i = 0; i < products.length; i++){
        if(products[i].lastViewed === false){
            notLastViewed.push(products[i]);
        }
    }
    //choose three items that were not last viewed
    let subset = getRandomSubarray(notLastViewed, 3);

    let indices = [];
    for(let i = 0; i < subset.length; i++){
        indices.push(products.indexOf(subset[i]));
    }

    // reset lastViewed key to clear out previously stored values
    for(let i = 0; i < products.length; i++){
        products[i].lastViewed = false;
    }

    //update lastViewed key to store most recent ones
    for(let i = 0; i < indices.length; i++){
        products[indices[i]].numViews += 1;
        products[indices[i]].lastViewed = true;
    }
    return [subset, products];
}