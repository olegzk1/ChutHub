/**
 * Created by AlehZhuk on 10/25/2023.
 */

import {api, LightningElement, track, wire} from 'lwc';
import publish from '@salesforce/apex/MessagePublisher.publish';
import {subscribe, MessageContext} from 'lightning/messageService';
import MESSAGE_EDIT_CHANNEL from '@salesforce/messageChannel/Message_Edit__c';

export default class MessageSender extends LightningElement {
    @api
    messageText;
    messageId;
    messageTempId;
    messageTextForEdit;
    @api
    isEdit;
    error;
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    sendMessage() {
        const messageInput = this.template.querySelector('.cm-text_input');
        const text = messageInput.value;

        if (text) {
            if (this.isEdit) {
                if (text !== this.messageTextForEdit) {
                    this.handleEditMessage(text, this.messageId, this.messageTempId);
                }
            } else {
                this.handleNewMessage(text);
            }
        }

        this.toDefaultState();
    }

    subscribeToMessageChannel() {
        this.editMessageSubscription = subscribe(
            this.messageContext,
            MESSAGE_EDIT_CHANNEL,
            (message) => this.messageEditChannelListener(message));
    }

    messageEditChannelListener(message) {
        this.isEdit = true;
        this.messageText = message.text;
        this.messageId = message.id;
        this.messageTempId = message.tempId;
        this.messageTextForEdit = message.text;
    }

    handleNewMessage(messageText) {
        this.publishEvent(messageText, 'New', undefined, undefined)
    }

    handleEditMessage(messageText, messageId, messageTempId) {
        this.publishEvent(messageText, 'Edit', messageId, messageTempId);
    }

    handleDeleteMessage(messageId, messageTempId) {
        this.publishEvent(undefined, 'Delete', messageId, messageTempId);
    }

    publishEvent(messageText, status, messageId, messageTempId) {
        publish({
            messageText: messageText,
            status: status,
            messageId: messageId,
            messageTempId: messageTempId
        })
            .then(() => this.error = undefined)
            .catch((error) => this.error = error);
    }

    toDefaultState() {
        this.isEdit = false;
        this.messageText = '';
    }
}