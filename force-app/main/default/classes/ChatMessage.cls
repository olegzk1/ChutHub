/**
 * Created by AlehZhuk on 10/26/2023.
 */

public with sharing class ChatMessage {
    public Id id;
    public String name;
    public String text;
    public Datetime createdDate;
    public String status;
    public Boolean isRead;
    public Id ownerId;
//    public String ownerUserName;
//    public String ownerLastName;
}