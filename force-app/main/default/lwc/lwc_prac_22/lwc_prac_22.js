import { LightningElement } from 'lwc';

export default class Lwc_prac_22 extends LightningElement {
    subme(event){
        //step1 ----> create and dispatch event
        this.dispatchEvent(new CustomEvent('evtsubmit',{detail:'Hi',bubbles:true , composed:true}));
    }

    byeeme(event){
        this.dispatchEvent(new CustomEvent('evtbye', {detail:'bye',bubbles:true , composed:true}));
    }
}