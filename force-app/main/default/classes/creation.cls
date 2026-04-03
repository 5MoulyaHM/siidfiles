public class creation {
    
    
    
    public static void demow(){
        list<account> acclist  = new list < account> ();
        acclist = [select id, name from account limit 5];
        
        map<Id , account > accmap = new map<Id ,  account>(acclist);
        system.debug('contain map= '+accmap);
        system.debug('contain map with only set value = '+accmap.keyset());
        system.debug('contain map with only list vlue like = '+accmap.values());
            
    }	
    
    
    public static void demo(){
        list<account> acclist =  new list <account>();
        map<id,Account> accountmap = new map <id,Account>();
        
        acclist = [select id,name from account limit 5];
        
        accountmap.putAll(acclist);
        system.debug(accountmap);
    }
    public static void object(){
   Map<String, Integer> studentScores = new Map<String, Integer>();
        
        
        studentScores.put('Alice', 85);
        studentScores.put('Bob', 90);
        studentScores.put('Charlie', 78);

system.debug('map contains='+ studentscores);

    }
}