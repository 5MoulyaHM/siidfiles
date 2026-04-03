public class deletedml {
    public static void deletedmli(){
        list<account> mylist = new list <account>();
        mylist =[select id,name from account where rating = 'hot'];
        
        
        if(!mylist.isempty()){
        delete mylist;
        }
        
        
    }

}