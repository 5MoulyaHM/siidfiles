import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecordForm extends LightningElement {
    @api objectApiName = 'Account';
    @api recordTypeId;
    @api fields = 'Name,Phone,Website';
    @api actionName = 'Create Record';
    @api batchMode = false;

    get fieldsArray() {
        return this.fields
            ? this.fields.split(',').map(f => f.trim())
            : [];
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: `${this.objectApiName} Created`,
            message: `Record ID: ${event.detail.id}`,
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }
}