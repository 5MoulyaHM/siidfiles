trigger AccountTrigger on Account (after update) {
 
    Map<Id, String> accDescMap = new Map<Id, String>();      
 
    for (Account acc : Trigger.new) {            
        Account oldAcc = Trigger.oldMap.get(acc.Id);
        
        if (acc.Description != oldAcc.Description) {
            accDescMap.put(acc.Id, acc.Description);
            
        }
    }    
     
    List<Contact> conList = [ SELECT Id, AccountId, Description FROM Contact WHERE AccountId IN :accDescMap.keySet()];
 
    for (Contact con : conList) {
        con.Description = accDescMap.get(con.AccountId);
        
    }
 
    if (!conList.isEmpty()) {
        update conList;
    }
}