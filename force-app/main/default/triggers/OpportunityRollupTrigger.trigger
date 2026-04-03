trigger OpportunityRollupTrigger on Opportunity 
    (after insert, after update, after delete, after undelete) {
 
    Set<Id> accountIds = new Set<Id>();
 
    if (Trigger.isInsert || Trigger.isUpdate || Trigger.isUndelete) {
        for (Opportunity opp : Trigger.new) {
            if (opp.AccountId != null) accountIds.add(opp.AccountId);
        }
    }
 
    if (Trigger.isUpdate || Trigger.isDelete) {
        for (Opportunity opp : Trigger.old) {
            if (opp.AccountId != null) accountIds.add(opp.AccountId);
        }
    }
 
    if (accountIds.isEmpty()) return;
 
    List<Opportunity> oppList = [
        SELECT Id, AccountId, Amount
        FROM Opportunity
        WHERE AccountId IN :accountIds AND Amount != null
    ];
 
    Map<Id, List<Decimal>> accAmountMap = new Map<Id, List<Decimal>>();
    for (Opportunity opp : oppList) {
        if (!accAmountMap.containsKey(opp.AccountId)) {
            accAmountMap.put(opp.AccountId, new List<Decimal>());
        }
        accAmountMap.get(opp.AccountId).add(opp.Amount);
    }
 
    List<Account> accountsToUpdate = new List<Account>();
    for (Id accId : accountIds) {
        List<Decimal> amounts = accAmountMap.get(accId);
 
        if (amounts == null || amounts.isEmpty()) {
            accountsToUpdate.add(new Account(
                Id = accId,
                Max_Opp_Amount__c = null,
                Min_Opp_Amount__c = null
            ));
        } else {
            Decimal maxAmt = amounts[0];
            Decimal minAmt = amounts[0];
 
            for (Decimal amt : amounts) {
                if (amt > maxAmt) maxAmt = amt;
                if (amt < minAmt) minAmt = amt;
            }
 
            accountsToUpdate.add(new Account(
                Id = accId,
                Max_Opp_Amount__c = maxAmt,
                Min_Opp_Amount__c = minAmt
            ));
        }
    }
 
    if (!accountsToUpdate.isEmpty()) {
        update accountsToUpdate;
    }
}