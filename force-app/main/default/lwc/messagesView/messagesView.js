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

    connectedCallback() {
        getMessageHistory()
            .then(value =>
                this.messages = value.map(value1 =>
                    this.chatMessageToMessage(value1)))
            .catch(reason => console.log(reason));
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
            this.messages.push(this.eventToMessage(payload));
        }).then(response => {
            this.subscription = response;
        });
    }

    eventToMessage(message) {
        let isOwner = message.CreatedById === this.currentUserId;
        return {
            text: message.Text__c,
            owner: message.CreatedById,
            lastName: message.User_Name__c,
            date: message.CreatedDate,
            isOwner: isOwner
        };
    }

    chatMessageToMessage(message) {
        let isOwner = message.OwnerId === this.currentUserId;
        return {
            text: message.Message_Text__c,
            owner: message.OwnerId,
            date: message.Created_Date__c,
            isOwner: isOwner,
            align: this.getAlign(isOwner)
        }
    }

    getAlign(isOwner) {
        if (isOwner)
            return 'slds-text-align_right';
        else
            return 'slds-text-align_left';
    }

    //if isOwner -> toRight, else set left class
}