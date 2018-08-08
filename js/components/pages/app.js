import html from '/js/html.js';

import VotingBox from '../boxes/voting-box.js';
import productApi from '/js/services/product-api.js';


let template = function() {
    return html`        
        <header>
            <h1>Bus Mall</h1>
        </header>
        
        <main>
            <section class="voting-box"></section>
            <section class="results">
                <table>
                    <thead>
                        <th>Image name</th>
                        <th>Total votes</th>
                        <th>Times displayed</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Banana</td>
                            <td>3</td>
                            <td>6</td>
                        </tr>
                        <tr>
                            <td>Beef Jerky</td>
                            <td>5</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    `;
};

export default class App {



    render() {
        let dom = template();

        let products = productApi.getRandomProducts();


        let votingBox = new VotingBox(
            { products: products}
        );


        this.votingBox = dom.querySelector(".voting-box");
        this.votingBox.appendChild(votingBox.render());


        return dom;
    }
}
