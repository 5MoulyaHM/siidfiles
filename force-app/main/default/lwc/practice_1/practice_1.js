import { LightningElement } from 'lwc';

export default class SimpleDomDemo extends LightningElement {

    renderedCallback() {
        // Select the heading and input and button
        const heading = this.template.querySelector('.heading');
        const inputBox = this.template.querySelector('.box');
        const btn = this.template.querySelector('.btn');

        // 1. Add event listener for input (runs while typing)
        inputBox.addEventListener('input', (event) => {
            heading.textContent = event.target.value;   // changes heading live
        });

        // 2. Add event listener for button
        btn.addEventListener('click', () => {
            heading.style.color = 'red';  // change color on click
        });
    }
}