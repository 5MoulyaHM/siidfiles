import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountPagination.getAccounts';
import getTotalPages from '@salesforce/apex/AccountPagination.getTotalPages';

export default class AccountPaginationSmall extends LightningElement {
    @track accounts = [];
    page = 1;
    pageSize = 10;
    totalPages = 0;
    @track pages = [];

    connectedCallback() {
        this.loadTotal();
        this.loadAccounts();
    }

    loadTotal() {
        getTotalPages({ pageSize: this.pageSize }).then(t => {
            this.totalPages = t;
            this.makePages();
            console.log('moul');
        });
    }

    loadAccounts() {
        getAccounts({ pageNumber: this.page, pageSize: this.pageSize })
            .then(res => this.accounts = res);
    }

    makePages() {
        let p = [];
        const make = (n) => ({ label: n, className: n===this.page ? 'active' : '' });

        if(this.totalPages <=5){
            for(let i=1;i<=this.totalPages;i++) p.push(make(i));
        } else if(this.page<=3){
            p = [make(1),make(2),make(3),{label:'...',className:''},make(this.totalPages)];
        } else if(this.page >= this.totalPages-2){
            p = [make(1),{label:'...',className:''},make(this.totalPages-2),make(this.totalPages-1),make(this.totalPages)];
        } else {
            p = [make(1),{label:'...',className:''},make(this.page-1),make(this.page),make(this.page+1),{label:'...',className:''},make(this.totalPages)];
        }

        this.pages = p;
    }

    prev(){
        if(this.page>1){ this.page--; this.loadAccounts(); this.makePages(); }
    }
    next(){
        if(this.page<this.totalPages){ this.page++; this.loadAccounts(); this.makePages(); }
    }
    goPage(e){
        const val = e.target.dataset.id;
        if(val==='...') return;
        this.page=parseInt(val);
        this.loadAccounts();
        this.makePages();
    }

    get isFirst(){ return this.page===1; }
    get isLast(){ return this.page===this.totalPages; }
}