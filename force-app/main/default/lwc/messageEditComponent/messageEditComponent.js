/**
 * Created by AlehZhuk on 11/7/2023.
 */

import {api, LightningElement} from 'lwc';
import EDIT_MESSAGE_LABEL from '@salesforce/label/c.Edit_Message';

export default class MessageEditComponent extends LightningElement {
    label = EDIT_MESSAGE_LABEL;
    @api
    textForEdit;

    handleClose() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}