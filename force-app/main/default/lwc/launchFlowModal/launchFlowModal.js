import { LightningElement, api, track } from 'lwc';

export default class LaunchFlowModal extends LightningElement {
    @api flowName = 'SLI_ClientCaseEscalation';
    @api modalHeader = 'Flow';
    @api flowInputVariables;
    @api autoLaunchFlow = false;
    @api hideButton = false;
    @api buttonLabel = 'Escalate Case';
    @api buttonAlignment = 'Right';
    @api recordId;

    @track isModalOpen = false;

    connectedCallback() {
        if (this.autoLaunchFlow === true || this.autoLaunchFlow === 'true') {
            this.isModalOpen = true;
        }
    }

    get flowInputs() {
        if (this.flowInputVariables) {
            try {
                const parsed = JSON.parse(this.flowInputVariables);
                if (Array.isArray(parsed)) {
                    return parsed.map(v => {
                        const val = { ...v };
                        if (typeof val.value === 'string' && val.value.includes('{!recordId}') && this.recordId) {
                            val.value = val.value.replace('{!recordId}', this.recordId);
                        }
                        return val;
                    });
                }
            } catch (e) {
                console.error('Invalid JSON in flowInputVariables:', e);
            }
        }
        return this.recordId ? [{ name: 'recordId', type: 'String', value: this.recordId }] : [];
    }

    get buttonContainerClass() {
        switch ((this.buttonAlignment || 'Right').toLowerCase()) {
            case 'left':
                return 'align-left';
            case 'center':
                return 'align-center';
            default:
                return 'align-right';
        }
    }

    openModal() { this.isModalOpen = true; }
    closeModal() { this.isModalOpen = false; }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.closeModal();
        }
    }
}