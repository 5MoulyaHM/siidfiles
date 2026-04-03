trigger newacc on Account (before insert) {
    for(account acc: trigger.new){
        acc.description = 'This is a new account';
    }

}