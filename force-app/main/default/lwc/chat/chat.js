/**
 * Created by AlehZhuk on 10/26/2023.
 */

import {LightningElement} from 'lwc';
import PageHeaderHide from '@salesforce/resourceUrl/PageHeaderHide';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class Chat extends LightningElement {
    connectedCallback() {
        loadStyle(this, PageHeaderHide);
    }
}