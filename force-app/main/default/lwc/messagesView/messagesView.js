/**
 * Created by AlehZhuk on 10/25/2023.
 */

import {LightningElement, api, track, wire} from 'lwc';
import {subscribe}  from 'lightning/empApi';
import getMessageHistory from '@salesforce/apex/MessageController.getMessageHistory';
import Id from '@salesforce/user/Id';

export default class MessagesView extends LightningElement {

    subscription = {};
    @api
    channelName = '/event/Chat_Hub_Message__e';
    @track
    messages = [];
    @track
    history = [];
    currentUserId = Id;
    error;

    connectedCallback() {
        getMessageHistory()
            .then(history =>
                this.messages = history.map(message =>
                    this.chatMessageToMessage(message)))
            .catch(error => this.error = error);
        this.handleSubscribe();
    }

    renderedCallback() {
        const scrollArea = this.template.querySelector(".cm-messages-container");
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    }

    handleSubscribe() {
        subscribe(this.channelName, -1, (response) => {
            const payload = response.data.payload;
            if (payload.Action__c ==='Edit') {
                const message = (!payload.Chat_Message_Id__c && payload.From_Event__c) ?
                    this.messages.find(msg => msg.tempId === payload.Temp_Id__c) :
                    this.messages.find(msg => msg.id === payload.Chat_Message_Id__c);
                this.updateMessage(message, payload);
            } else {
                this.messages.push(this.eventToMessage(payload));
            }
        }).then(response => {
            this.subscription = response;
        });
    }

    updateMessage(message, payload) {
        message.text = payload.Text__c;
        message.status = payload.Action__c;
    }

    eventToMessage(message) {
        let isOwner = this.isOwner(message.CreatedById);
        return {
            id: message.Chat_Message_Id__c,
            tempId: message.Temp_Id__c,
            text: message.Text__c,
            status: message.Action__c,
            owner: message.CreatedById,
            lastName: message.User_Name__c,
            date: message.CreatedDate,
            isOwner: isOwner,
            align: this.getAlign(isOwner)
        };
    }

    chatMessageToMessage(message) {
        let isOwner = this.isOwner(message.OwnerId);
        return {
            id: message.Id,
            tempId: message.Temp_Id__c,
            text: message.Message_Text__c,
            status: message.Status__c,
            owner: message.OwnerId,
            date: message.Created_Date__c,
            isOwner: isOwner,
            align: this.getAlign(isOwner)
        }
    }

    isOwner(ownerId) {
        return ownerId === this.currentUserId;
    }

    getAlign(isOwner) {
        if (isOwner)
            return 'slds-text-align_right';
        else
            return 'slds-text-align_left';
    }
}