import { LightningElement } from 'lwc';
 
import cardImage from '@salesforce/resourceUrl/salesforccard';
import bankLogo from '@salesforce/resourceUrl/bankLogo';
import successIcon from '@salesforce/resourceUrl/successGreen';
 
export default class LwcBankPage extends LightningElement {
 
    cardImage = cardImage;
    bankLogo = bankLogo;
    successIcon = successIcon;
 
    customerNumber = "1234 567 8910 5678";
    accountNumber = "1234 567 8910 5678";
    openedDate = "26/04/2023";
    fundingBalance = "Not yet funded";
}