/**
 * Created by AlehZhuk on 10/25/2023.
 */

import {LightningElement} from 'lwc';
import publish from '@salesforce/apex/MessagePublisher.publish';
// import {createRecord} from 'lightning/uiRecordApi';

export default class MessageSender extends LightningElement {
    maxLength = 255;
    error;

    publishMessage() {
        let messageInput = this.template.querySelector('lightning-input');
        let messageText = messageInput.value;

        if (messageText) {
            this.publishEvent(messageText);
            messageInput.value = '';
        }
    }

    publishEvent(messageText) {
        publish({messageText: messageText})
            .then(() => this.error = undefined)
            .catch((error) => this.error = error);
    }
}