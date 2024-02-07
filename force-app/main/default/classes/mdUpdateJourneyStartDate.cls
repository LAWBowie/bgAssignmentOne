public with sharing class mdUpdateJourneyStartDate {
    
    @AuraEnabled(cacheable=true)
    public static List<Task__c> getRelatedTasks(Id journeyId) {
        return [
            SELECT Id, Relative_Days_To_Complete__c
            FROM Task__c
            WHERE Journey__c = :journeyId
        ];
    }
}
