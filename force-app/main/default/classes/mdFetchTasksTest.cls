@isTest
public class mdFetchTasksTest {

    @isTest static void testGetTasksByJourneyId() {
        // Create test data
        Journey__c testJourney = new Journey__c(
            Candidate_Email__c = 'test@example.com',
            Candidate_Name__c = 'Test Candidate',
            Manager_Email__c = 'manager@example.com',
            Manager_Name__c = 'Test Manager'
            // ... other required fields
        );
        insert testJourney;

        Task__c task1 = new Task__c(Name = 'Task 1', Journey__c = testJourney.Id,Relative_Days_To_Complete__c = 2);
        Task__c task2 = new Task__c(Name = 'Task 2', Journey__c = testJourney.Id,Relative_Days_To_Complete__c = 2);
        // ... Create more tasks as needed

        insert new List<Task__c>{task1, task2};

        // Call the method
        Test.startTest();
        List<Task__c> tasks = mdFetchTasks.getTasksByJourneyId(testJourney.Id);
        Test.stopTest();

        // Assert the results
        System.assertEquals(2, tasks.size(), 'There should be 2 tasks related to the test journey.');
        System.assertEquals(task1.Id, tasks[0].Id, 'The first task ID should match.');
        System.assertEquals(task2.Id, tasks[1].Id, 'The second task ID should match.');
    }
}
