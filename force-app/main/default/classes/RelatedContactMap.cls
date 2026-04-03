public class RelatedContactMap {
    public static void getRelatedcontacts(){
        map<Id,List<Contact>> mapContacts=new map<Id,List<Contact>>();
List<Contact> contacts=[select AccountId,id,name from contact where accountId!=null];
        for(Contact c:contacts){
            if(mapContacts.containsKey(c.AccountId)){
                mapContacts.get(c.AccountId).add(c);
            }else{
                mapContacts.put(c.AccountId,New list<Contact>{c});
            }
        }
    System.debug(mapContacts);
}
}