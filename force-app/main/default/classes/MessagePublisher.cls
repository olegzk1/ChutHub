/**
 * Created by AlehZhuk on 10/25/2023.
 */

public with sharing class MessagePublisher {

    @AuraEnabled
    public static void publish(String messageText) {
        Chat_Hub_Message__e event = new Chat_Hub_Message__e(Text__c = messageText, User_Name__c = UserInfo.getLastName());
        Database.SaveResult res = EventBus.publish(event);
        if (res.success) {
            System.debug(res.id);
        } else {
            for (Database.Error error: res.errors) {
                System.debug(error.getMessage());
            }
        }
    }
}