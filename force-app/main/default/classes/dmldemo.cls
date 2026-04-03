public class dmldemo {
    public static void dmling (){
        
        list<account> acclist = new list<account>();
        //list<contact > conlist = new list < contact > ();
        for(integer i=1; i<200 ; i++){
        account acc = new account();
        acc.name ='mouniok'+ i;
        acc.Create_contacts__c = 343439419  ;
        acclist.add(acc);
    
       /* account acc2 = new account();
        acc2.name ='moun1pl';
        acc2.Create_contacts__c = 343334819;
        acclist.add(acc2);
        insert acclist;
        
        
        contact con = new contact();
        con.Firstname = acc.name;
        con.LastName  = acc.Name;
        con.AccountId= acclist[0].id;
        conlist.add(con);
        
        
        
        
      
         contact conn = new contact();
        conn.Firstname = acc2.name;
        conn.LastName  = acc2.Name;
        conn.AccountId= acclist[1].id;
        conlist.add(conn);
        
        insert conlist;  //first insertthe account //then insert the contact 
        
        */
        
    }
    insert acclist;   
}
}