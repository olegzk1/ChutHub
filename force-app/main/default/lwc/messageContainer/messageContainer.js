/**
 * Created by AlehZhuk on 11/6/2023.
 */

import {api, LightningElement, wire} from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import MESSAGE_EDIT_CHANNEL from '@salesforce/messageChannel/Message_Edit__c';

export default class MessageContainer extends LightningElement {
    @api
    message;
    @wire(MessageContext)
    messageContext;

    handleClick() {
        if (this.message.isOwner) {
            this.publishEditEvent();
        }
    }

    publishEditEvent() {
        const payload = {
            text: this.message.text,
            id: this.message.id,
            tempId: this.message.tempId
        }
        publish(this.messageContext, MESSAGE_EDIT_CHANNEL, payload);
    }
}