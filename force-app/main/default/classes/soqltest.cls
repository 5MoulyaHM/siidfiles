public class soqltest {
    public static void sqlquery(){
        list<account> acc1 = [select id , name from account limit 10];
        set< id > acc2 = new set < id > ();
        
        for(account acc : acc1){
            acc2.add(acc.Id);
        }
        
        list < account > acc3 = [ select id , name from account where id in:acc2];
        
        system.debug('list contains of '+acc3);
    }

}