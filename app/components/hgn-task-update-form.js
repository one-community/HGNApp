
import moment from 'moment';
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({

    timeEntryService: inject('time-entry-service'),
    notes: "",
    dateofWork: "",
    taskhours: "",
    taskminutes: "",

    isTangible: true,
    isFormSubmitted: "",

    init() {
        this._super(...arguments);

        let user = this.get('forUserId');

        this.get('timeEntryService').getUserProjects(user)
            .then(results => { this.set('projects', results); });

    },

    minDateForLogging: computed("loggedinUser.role", function () {

        let userrole = this.get("loggedinUser.role");

        if (userrole != "Administrator") {
            return moment().startOf('week').subtract(2, 'week').format("YYYY-MM-DD");
        }

    }),
    maxDateForLogging: computed("loggedinUser.role", function () {

        let userrole = this.get("loggedinUser.role");

        if (userrole != "Administrator") {
            return moment().format("YYYY-MM-DD");
        }
    }),


    clearform() {
        this.set('isFormSubmitted', "");
        $("#frmSubmitTimeEntry")[0].reset();

    },

    validateform() {
        let isFormValid = true;
        this.set('isFormSubmitted', "submitted");
        let form = $("#frmSubmitTimeEntry").get(0);

        let fieldhours = $("#hours").get(0);
        let fieldminutes = $("#minutes").get(0);



        let hours = parseFloat(fieldhours.value);
        let minutes = parseFloat(fieldminutes.value);


        if (isNaN(hours) && isNaN(minutes)) {
            isFormValid = false;
            fieldhours.setCustomValidity("Effort value cannot be zero");
            fieldminutes.setCustomValidity("Effort value cannot be zero");

        }
        else {
            fieldhours.setCustomValidity("");
            fieldminutes.setCustomValidity("");

            isFormValid = form.checkValidity();
        }

        return isFormValid;
    },

    actions: {
        clearform() {
            this.clearform();

        },
        submitTimeEntry() {
            let toastr = this.get('ToastorService');


            if (this.validateform()) {

                let timeentry = {};

                let hours = (this.get('taskhours')) ? this.get('taskhours') : "00";
                let minutes = (this.get('taskminutes')) ? this.get('taskminutes') : "00";

                let timespent = hours + ":" + minutes;
                let dateofWork = moment(this.get('dateofWork')).format('YYYY-MM-DD');
                timeentry.personId = this.get('forUserId');
                timeentry.projectId = this.get('forprojectId');
                timeentry.taskId = this.get('fortaskId');
                timeentry.dateofWork = dateofWork;
                timeentry.timeSpent = timespent;
                timeentry.isTangible = this.get('isTangible');
                timeentry.notes = this.get('notes');
                this.get('timeEntryService').postTimeEntry(timeentry)
                    .then(results => {
                        console.log(results);
                        toastr.success("", 'Time Entry Saved');
                        this.clearform();
                    }, error => {
                        toastr.warning(error.responseJSON.message, 'Error!!');
                    });


            }
            else {
                alert("Please fix the form values");
            }
        }

    }

});
