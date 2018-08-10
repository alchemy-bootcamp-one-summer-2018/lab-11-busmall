import html from '/js/html.js';

import productApi from '/js/services/product-api.js';
import VotingBox from '/js/components/boxes/voting-box.js';
import ResultCard from '/js/components/parts/result-card.js';

let template = function() {
    return html`        
        <header>
            <h1>Bus Mall</h1>
        </header>
        
        <main>
            <section>
                <div class="voting-box"></div>
                <ul class="results-box"></ul>
            </section>
        </main>
    `;
};

export default class App {

    constructor() {
        this.products = productApi.getRandomProducts();
        this.rounds = 3;
    }

    renderResultsBox(products) {

        products.forEach(product => {
            let resultCard = new ResultCard({
                image: product.image,
                views: product.views,
                votes: product.votes,
            });
            this.resultBox.appendChild(resultCard.render());
        });
    }

    render() {
        let dom = template(this.rounds);
        this.resultBox = dom.querySelector('.results-box');
        
        let votingBox = new VotingBox({ 
            products: this.products,
            rounds: this.rounds,
            onSelect: (product) => {
                
                votingBox.rounds--;
                this.rounds--;
                
                productApi.handleClick(product);
                
                if(this.rounds){
                    votingBox.newRound();
                }
                else {
                    this.renderResultsBox(productApi.get());
                    while(this.votingBox.lastElementChild){
                        this.votingBox.lastElementChild.remove();
                    }
                }
            }
        });
        
        this.votingBox = dom.querySelector('.voting-box');
        this.votingBox.appendChild(votingBox.render());

        return dom;
    }
}
