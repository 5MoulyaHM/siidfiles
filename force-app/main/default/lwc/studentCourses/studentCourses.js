import { LightningElement, api, track, wire } from 'lwc';
import getCoursesByStudentId from '@salesforce/apex/StudentCourseController.getCoursesByStudentId';
import createCourseWithValidation from '@salesforce/apex/StudentCourseController.createCourseWithValidation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentCourses extends LightningElement {
    @api recordId; // Student Id passed from record page

    @track courses = [];
    @track error;

    @track newCourseName = '';
    @track newCourseFee = 0;

    columns = [
        { label: 'Course Name', fieldName: 'Course_Name__c' },
        { label: 'Fee', fieldName: 'Fee__c', type: 'currency' }
    ];

    @wire(getCoursesByStudentId, { studentId: '$recordId' })
    wiredCourses({ error, data }) {
        if (data) {
            this.courses = data;
            this.error = undefined;
        } else if (error) {
            this.error = error.body.message;
            this.courses = [];
        }
    }

    handleNameChange(event) {
        this.newCourseName = event.target.value;
    }

    handleFeeChange(event) {
        this.newCourseFee = parseFloat(event.target.value);
    }

    async handleAddCourse() {
        if (!this.newCourseName || this.newCourseFee <= 0) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please provide a valid course name and fee.',
                    variant: 'error'
                })
            );
            return;
        }

        try {
            const result = await createCourseWithValidation({
                courseName: this.newCourseName,
                fee: this.newCourseFee,
                studentId: this.recordId
            });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Course added successfully.',
                    variant: 'success'
                })
            );
            // Refresh the list
            return refreshApex(this.wiredCourses);
        } catch (err) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: err.body ? err.body.message : err.message,
                    variant: 'error'
                })
            );
        }
    }
}