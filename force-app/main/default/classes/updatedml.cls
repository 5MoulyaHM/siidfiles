public class updatedml {
   public static void createAccMaps(){
         list<contact> conlist =[select id,Accountid,lastName from Contact where Accountid!=null];
      map<id,list<contact>> accMaps = new map<id,list<contact>>();
     for(contact con:conlist){
         if (!accMaps.containsKey(con.AccountId)) accMaps.put(con.AccountId, new List<Contact>());
        accMaps.get(con.AccountId).add(con);
    }
      // accMaps.put(con.AccountId,conlist); 
        system.debug(accMaps);
        for(id key:accMaps.keyset()){
            list<contact> convalue = accMaps.get(key);
                system.debug(key+':'+convalue);
            }  
    }
}