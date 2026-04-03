trigger mytesttigger on Lead (before insert, before update) {
    for (Lead leadRecord : Trigger.new) {
        // If Lead Source is blank, set it to 'Other'
        if (String.isBlank(leadRecord.LeadSource)) {
            leadRecord.LeadSource = 'Other';
        }

        // If Industry is blank, show an error message
        if (String.isBlank(leadRecord.Industry)) {
            leadRecord.addError('The Industry field cannot be blank');
        }
    }
}