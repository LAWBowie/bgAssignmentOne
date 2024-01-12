import { LightningElement, api, wire } from 'lwc';
import getTasksByJourneyId from '@salesforce/apex/mdFetchTasks.getTasksByJourneyId';

export default class TaskProgressTimeline extends LightningElement {
    @api recordId;
    tasks;

    @wire(getTasksByJourneyId, { journeyId: '$recordId' })
    wiredTasks({ error, data }) {
        if (data) {
            console.log(data); //Check data in browser console
            this.tasks = data.map(task => ({
                ...task,
                cssClass: this.getStatusClass(task.Completion_Status__c)
            }));
        } else if (error){
            console.error('Error retrieving tasks:', error);
        }
    }

    getStatusClass(status) {
        switch (status) {
            case 'In Progress':
                return 'yellow';
            case 'Complete':
                return 'green';
            case 'Overdue':
                return 'red';
            default:
                return '';
        }
    }
}








