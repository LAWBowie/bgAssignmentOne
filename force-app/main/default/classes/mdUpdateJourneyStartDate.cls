public class mdUpdateJourneyStartDate {
    @AuraEnabled
    public static void updateTasks(Id journeyId) {
         // Fetch the updated Onboarding Start Date and related tasks
        Journey__c journey = [SELECT Onboarding_Start_Date__c FROM Journey__c WHERE Id = :journeyId];
        List<Task__c> tasks = [SELECT Id, Relative_Days_To_Complete__c FROM Task__c WHERE Journey__c = :journeyId];

        // Perform a dummy update to trigger recalculation of formula fields
        for(Task__c task : tasks) {
            task.Relative_Days_To_Complete__c = task.Relative_Days_To_Complete__c;
        }

        // Update the tasks
        if (!tasks.isEmpty()) {
            update tasks;
        }
    }
}
