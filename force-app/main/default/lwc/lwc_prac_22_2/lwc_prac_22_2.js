import { LightningElement } from 'lwc';

export default class Lwc_prac_22_2 extends LightningElement {
    msgfromchild
    constructor()
    {
        super();
        this.template.addEventListener('evtsubmit',this.SayHi.bind(this));
        this.template.addEventListener('evtbye',this.SayBye.bind(this));  // bind keyword used to gt the data from child 
   // i wanna lsten evtsubmit from add eventsten  when they do that call say hi 
   // if u have more than one event kistener add all the things in constructor 
    }
    SayHi(event){
        this.msgfromchild = event.detail;
        alert('Hi Good Morning. This message is in a parent component when child component is clicked' + this.msgfromchild);
    }

    SayBye(event){
        alert('Bye Good Evening. This message is in a parent component when child component is clicked');
    }
    }