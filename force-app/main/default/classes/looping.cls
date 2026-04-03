public class looping {
    public static void testing(integer m ){
        for(integer i =1 ; i<10; i++){
            system.debug(m*i);
        }
        
    }
    public static void test(integer n ){
        for(integer i =1; i<10 ; i++){  
            if(math.mod(n,2)==0){   // if i add ! besid the euals can print the odd
                system.debug(n);
                
                
            }
        }
    }
    
    public static void finsum(integer n ){
        integer i , sum=0;
        for(i=1;i<n;i++ ){
            sum =sum+i;
            system.debug(i);  // so if u need a one sum at last go for wririg the system dbug outside the end brackets  
        }
    }
    
    public static void whilechecking(){
        integer i =1;  //initialization 
        while(i<10){ //condition
            system.debug('whilellop' +i); 
            i++; // while loop // increment or decrement 
        }
        
        
    }
    
    
    
    

}