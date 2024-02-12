public class mdFetchTasks{
    @AuraEnabled(cacheable=true)
    public static List<Task__c> getTasksByJourneyId(Id journeyId) {
        return [SELECT Id, Name, Completion_Status__c, Estimated_Completion_Date__c FROM Task__c WHERE Journey__c = :journeyId];
    }
}