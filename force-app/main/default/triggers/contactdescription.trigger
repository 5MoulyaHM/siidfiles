trigger contactdescription on Contact (before insert,before update) {
    // Collect Account Ids from Contacts that have one
    Set<Id> accountIds = new Set<Id>();
    for (Contact con : Trigger.new) {
        if (con.AccountId != null) {
            accountIds.add(con.AccountId);
        }
    }

    // Query Accounts to get their Descriptions
    Map<Id, Account> accountMap = new Map<Id, Account>(
        [SELECT Id, Description FROM Account WHERE Id IN :accountIds]
    );

    // Loop through Contacts and set the description
    for (Contact con : Trigger.new) {
        if (con.AccountId != null && accountMap.containsKey(con.AccountId)) {
            con.Account_Description__c = accountMap.get(con.AccountId).Description;
        }
    }
}