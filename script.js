import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const form = document.querySelector('[data-form]');

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
const responseHeadersContainer = document.querySelector('[response-headers]');


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


//Handling API Request
form.addEventListener('submit', (e)=> {
    e.preventDefault();

    axios({
        url: document.querySelector('[data-url]').value,
        method: document.querySelector('[data-method]').value,
        params: keyValuePairsToObject(queryParamsContianer),
        headers: keyValuePairsToObject(headersContainer),
        
    }).then(response => {
        updateResponseDetails(response)
        //updateResponseEditor(response.data)
        updateResponseHeaders(response.headers)
        console.log(response);
    });
});

function updateResponseHeaders(headers) {
    responseHeadersContainer.innerHTML = ""
    Object.entries(headers).forEach(([key, value]) => {
        const keyElement = document.createElement('div')
        keyElement.textContent = key
        responseHeadersContainer.append(keyElement)

        const valueElement = document.createElement('div')
        valueElement.textContent = value
        responseHeadersContainer.append(valueElement)
    })
}

function updateResponseDetails(response) {
    document.querySelector('[data-status]').textContent = response.status
}

function updateResponseEditor(data) {
    
}
