/**
 * Created by AlehZhuk on 11/7/2023.
 */

import {api, LightningElement} from 'lwc';

export default class MessageEditComponent extends LightningElement {
    @api
    textForEdit;

    handleClose() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}