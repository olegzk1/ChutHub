/**
 * Created by AlehZhuk on 11/6/2023.
 */

import {api, LightningElement} from 'lwc';

export default class MessageContainer extends LightningElement {
    @api
    message;
    // @api
    author;

    handleClick() {
        console.log('editing');
    }
}