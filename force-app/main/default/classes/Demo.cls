public class Demo {
    public static void demo(integer num1 , integer num2){
        integer result;
        result = num1 > num2 ? num1 : num2;   //so here if thas true num 1 will be taken if false num 2 will be taken 
        system.debug('maximum '+result);
    }
    
    public static Id acc(string name , string rating ){
        
        Account acc = new account();
        acc.Name = name;
        acc.Rating = rating;
        acc.Create_contacts__c = 685959;
        
        insert acc;
        
        return acc.Id;
        
    }
    
    public static void contact(){
        id accId;
        accId = acc('himouo','hot');
        contact con = new contact(Firstname ='con101',lastname = 'hi');
        con.AccountId = accId;
        insert con;
    }
    
    
}