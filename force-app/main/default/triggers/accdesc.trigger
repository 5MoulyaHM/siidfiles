trigger accdesc on Account (before insert) {
    for(account accd: trigger.new){
        accd.Description = 'new account gor created';
    }

}