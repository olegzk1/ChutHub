trigger ChatHubMessageTrigger on Chat_Hub_Message__e (after insert) {
    List<Chat_Message__c> messages = new List<Chat_Message__c>();

    for (Chat_Hub_Message__e event: Trigger.new) {
        Chat_Message__c message = new Chat_Message__c();
        message.Message_Text__c = event.Text__c;
        message.Created_Date__c = event.CreatedDate;
        message.Status__c = 'New';
        message.OwnerId = event.CreatedById;
        messages.add(message);
    }

    insert messages;
}