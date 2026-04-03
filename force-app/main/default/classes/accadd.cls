public class accadd{
    public static Id accadd(string name , string rating){
        Account acc = new Account();
        acc.Name = name;
        acc.Rating = rating;
        insert acc;
        
        return acc.id;
        
        
    }
}