/**
 * Created by AlehZhuk on 10/26/2023.
 */

public with sharing class MessageMapper {
    public static ChatMessage toDomain(Chat_Message__c message) {
        ChatMessage domain = new ChatMessage();
        domain.id = message.Id;
        domain.name = message.Name;
        domain.text = message.Message_Text__c;
        domain.status = message.Status__c;
        domain.isRead = message.Readed__c;
        domain.createdDate = message.Created_Date__c;
        domain.ownerId = message.OwnerId;
        return domain;
    }

    public static List<ChatMessage> toDomains(List<Chat_Message__c> messages) {
        List<ChatMessage> domains = new List<ChatMessage>();
        for (Chat_Message__c message: messages) {
            domains.add(toDomain(message));
        }
        return domains;
    }
}