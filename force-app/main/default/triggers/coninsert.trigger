trigger coninsert on Contact (before insert) {
    for(contact coninsertt : trigger.new){
        if(string.isblank(coninsertt.title)){
            coninsertt.title = 'Not Provided';
            
        }
    }

}