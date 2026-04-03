import { LightningElement, api, track } from 'lwc';

export default class FlowLauncher extends LightningElement {
    @api flowName = 'SLI_ClientCaseEscalation'; // Default Flow Name
    @api modalHeader = 'Flow'; // Modal Header
    @api buttonLabel = 'Escalate Case'; // Button Label
    @api recordId; // Passed from the page context

    @track isModalOpen = false;

    get flowInputVariables() {
        return [
            {
                name: 'recordId',
                type: 'String',
                value: this.recordId
            }
        ];
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.closeModal();
        }
    }
}