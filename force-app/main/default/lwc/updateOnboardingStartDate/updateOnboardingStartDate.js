import { LightningElement,api,wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import Journey__c from '@salesforce/schema/Journey__c';
import Onboarding_Start_Date__c from '@salesforce/schema/Journey__c.Onboarding_Start_Date__c';
import ID_field from '@salesforce/schema/Journey__c.Id';
import successMessage from '@salesforce/label/c.task_Update_Success_Message';
import errorMessage from '@salesforce/label/c.task_Update_Error_Message';

export default class UpdateOnboardingStartDate extends LightningElement {
    @api recordId;
    userInput;

    labels={
        successMessage,
        errorMessage
    };
    

    handleChange(event){
        this.userInput = event.target.value;
        console.log('this.userInput:'+JSON.stringify(this.userInput))

    }

    handleClick(){

        const fields = {};

        fields[ID_field.fieldApiName] = this.recordId;
        fields[Onboarding_Start_Date__c.fieldApiName] = this.userInput;

        const recordInput={
            fields:fields
        }

        console.log('recordInput:'+JSON.stringify(recordInput));

        updateRecord(recordInput)
        .then(result =>{
            console.log(JSON.stringify(result));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: this.labels.successMessage,
                variant: 'success'
            }));
        })
        .catch(error =>{
            console.log('error'+JSON.stringify(error));
        })

    
        this.dispatchEvent(new CloseActionScreenEvent());

        //Wait before reloading the page
        setTimeout(() => window.location.reload(), 800);
   
    }  
}