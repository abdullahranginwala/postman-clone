import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const form = document.querySelector('[data-form]');

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    axios({
        url: document.querySelector('[data-url]').value,
        method: document.querySelector('[data-method]').value,
        params: keyValuePairsToObject(queryParamsContianer),
        headers: keyValuePairsToObject(headersContainer),
        
    }).then(response => {
        console.log(response);
    });
});

function keyValuePairsToObject(container) {
    const pairs = container.querySelectorAll('[data-key-value-pair]')
    return [...pairs].reduce((data, pair) => {
        const key = pair.querySelector('[data-key]').value
        const value = pair.querySelector('[data-value]').value

        if(key === '') {
            return data
        }
        return{...data, [key]: value}
    }, {});
}


const queryParamsContianer = document.querySelector('[data-query-params]')
const headersContainer = document.querySelector('[data-headers')
const keyValueTemplate = document.querySelector('[data-key-value-template]');


document.querySelector('[data-add-query-params-btn]').addEventListener('click', (e) => {
    queryParamsContianer.append(createKeyValuePair())
});

document.querySelector('[data-add-headers-btn]').addEventListener('click', (e) => {
    headersContainer.append(createKeyValuePair())
});

function createKeyValuePair() {
    const element =  keyValueTemplate.content.cloneNode(true);
    element.querySelector('[data-remove-btn]').addEventListener('click', (e) => {
        e.target.closest('[data-key-value-pair]').remove();
    });
    return element;
}
