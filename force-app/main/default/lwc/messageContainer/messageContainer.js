/**
 * Created by AlehZhuk on 11/6/2023.
 */

import {api, LightningElement, wire} from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import MESSAGE_EDIT_CHANNEL from '@salesforce/messageChannel/Message_Edit__c';
import EDITED_STATUS from '@salesforce/label/c.Edited_Status';
import Id from '@salesforce/user/Id';

export default class MessageContainer extends LightningElement {
    @api
    message;
    @wire(MessageContext)
    messageContext;
    currentUserId = Id;
    editedStatus = EDITED_STATUS;

    handleClick() {
        if (this.isOwner) {
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

    get isEdit() {
        return this.message.status === 'Edit';
    }

    get isOwner() {
        return this.currentUserId === this.message.owner;
    }

    get messageContainerClass() {
        return this.isOwner ?
            'cm-message_container slds-text-align_right' :
            'cm-message_container slds-text-align_left';
    }
}