/**
 * Created by AlehZhuk on 10/25/2023.
 */

public with sharing class MessagePublisher {

    @AuraEnabled
    public static void publish(String messageText, String status, String messageId, String messageTempId) {
        Chat_Hub_Message__e event = new Chat_Hub_Message__e(
                Text__c = messageText,
                User_Name__c = UserInfo.getLastName(),
                Action__c = status,
                Chat_Message_Id__c = messageId
        );
        if (String.isEmpty(messageId)) {
            event.From_Event__c = true;
        }
        if (status == 'Edit') {
            event.Temp_Id__c = messageTempId;
        } else {
            event.Temp_Id__c = generateTempId();
        }
        Database.SaveResult res = EventBus.publish(event);
        if (res.success) {
            System.debug(res.id);
        } else {
            for (Database.Error error: res.errors) {
                System.debug(error.getMessage());
            }
        }
    }

    private static String generateTempId() {
        Blob b = Crypto.generateAesKey(128);
        String hex = EncodingUtil.convertToHex(b);
        return hex.substring(0, 15);
    }
}