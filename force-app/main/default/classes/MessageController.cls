/**
 * Created by AlehZhuk on 10/26/2023.
 */

public with sharing class MessageController {

    @AuraEnabled
    public static List<Chat_Message__c> getMessageHistory() {
        return getMessages();
    }

    private static List<Chat_Message__c> getMessages() {
        return [SELECT Id, Name, Status__c, Readed__c, Message_Text__c, Created_Date__c, OwnerId
                FROM Chat_Message__c ORDER BY Created_Date__c LIMIT 40];
    }

    private static void updateMessage(Id messageId, String textForUpdate) {
        //code for update
    }
}