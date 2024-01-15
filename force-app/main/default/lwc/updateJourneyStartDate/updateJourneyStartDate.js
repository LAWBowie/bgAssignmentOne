import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateTasks from '@salesforce/apex/mdUpdateJourneyStartDate.updateTasks';

export default class updateJourneyStartDate extends LightningElement {
    @api recordId; // This will be set to the Journey Id when the Quick Action is invoked

    connectedCallback() {
        updateTasks({ journeyId: this.recordId })
            .then(() => {
                // Show success message
                this.dispatchEvent(new
                    ShowToastEvent({
                    title: 'Success',
                    message: 'Task dates updated successfully',
                    variant: 'success'
                    }));
                    // Close the Quick Action Modal
                    this.dispatchEvent(new CustomEvent('closequickaction'));
                    })
                    .catch(error => {
                    // Show error message
                    this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                    }));
                    });
                    }
                    }

