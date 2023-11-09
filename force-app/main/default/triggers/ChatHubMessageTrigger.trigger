trigger ChatHubMessageTrigger on Chat_Hub_Message__e (after insert) {
    List<Chat_Message__c> messages = new List<Chat_Message__c>();

    for (Chat_Hub_Message__e event: Trigger.new) {
        Chat_Message__c message = new Chat_Message__c();
        if (event.Action__c == 'Edit') {
            if (String.isEmpty(event.Chat_Message_Id__c)) {
                message.Id = [SELECT Id FROM Chat_Message__c WHERE Temp_Id__c =:event.Temp_Id__c LIMIT 1].Id;
            } else {
                message.Id = event.Chat_Message_Id__c;
            }
        } else {
            message.Temp_Id__c = event.Temp_Id__c;
            message.Created_Date__c = event.CreatedDate;
            message.OwnerId = event.CreatedById;
        }
        message.Status__c = event.Action__c;
        message.Message_Text__c = event.Text__c;
        message.Updated_Date__c = event.CreatedDate;
        messages.add(message);
    }

    upsert messages;
}