import { LightningElement, api, wire } from 'lwc';
import getTasksByJourneyId from '@salesforce/apex/mdFetchTasks.getTasksByJourneyId';
import Onboarding_Start_Date__c from '@salesforce/schema/Journey__c.Onboarding_Start_Date__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import taskTimelineTitle from '@salesforce/label/c.Task_Timeline_Title';
import onboardingStartDateLabel from '@salesforce/label/c.Onboarding_Start_Date_Label';
import dueLabel from '@salesforce/label/c.due_Label';



export default class TaskProgressTimeline extends LightningElement {
    @api recordId;
    tasks;
    labels={
        taskTimelineTitle,
        onboardingStartDateLabel,
        dueLabel
    };

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

    @wire(getRecord, { recordId: '$recordId', fields: [Onboarding_Start_Date__c] })
    wiredRecord({ error, data }) {
        if (data) {
            this.onboardingStartDate = getFieldValue(data, Onboarding_Start_Date__c);
        } else if (error) {
            console.error('Error retrieving Onboarding Start Date:', error);
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








