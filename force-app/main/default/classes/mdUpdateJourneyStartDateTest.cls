@IsTest
private class mdUpdateJourneyStartDateTest {

    @IsTest
    static void testGetRelatedTasks() {
        // Create test data for Journey and related Tasks
        Journey__c testJourney = new Journey__c(
            Name = 'Test Journey',
            Candidate_Email__c = 'test@example.com',
            Candidate_Name__c = 'Test Candidate',
            Manager_Email__c = 'manager@example.com',
            Manager_Name__c = 'Test Manager'
        );
        insert testJourney;

        Task__c task1 = new Task__c(
            Name = 'Task 1',
            Relative_Days_To_Complete__c = 5,
            Journey__c = testJourney.Id
        );

        Task__c task2 = new Task__c(
            Name = 'Task 2',
            Relative_Days_To_Complete__c = 10,
            Journey__c = testJourney.Id
        );

        insert new List<Task__c>{ task1, task2 };

        // Call test method
        Test.startTest();
        List<Task__c> relatedTasks = mdUpdateJourneyStartDate.getRelatedTasks(testJourney.Id);
        Test.stopTest();

        // Verify the related tasks are retrieved
        System.assertEquals(2, relatedTasks.size(), 'There should be 2 related tasks.');
        System.assertEquals(task1.Id, relatedTasks[0].Id, 'The first task ID should match.');
        System.assertEquals(task2.Id, relatedTasks[1].Id, 'The second task ID should match.');
    }
}

