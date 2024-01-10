import { LightningElement, api, wire } from 'lwc';
import getTasksByJourneyId from '@salesforce/apex/mdFetchTasks.getTasksByJourneyId';

export default class TaskProgressTimeline extends LightningElement {
    @api recordId;
    tasks = [];

    @wire(getTasksByJourneyId, { journeyId: '$recordId' })
    wiredTasks({ data }) {
        if (data) {
            this.tasks = data.map(task => ({
                ...task,
                isInProgress: task.Completion_Status__c === 'In Progress',
                isComplete: task.Completion_Status__c === 'Complete',
                isOverdue: task.Completion_Status__c === 'Overdue'
            }));
        }
    }
}
