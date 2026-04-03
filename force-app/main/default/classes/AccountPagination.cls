public with sharing class AccountPagination {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer pageNumber, Integer pageSize) {
        if (pageNumber == null) pageNumber = 1;
        if (pageSize == null) pageSize = 10;

        Integer offsetVal = (pageNumber - 1) * pageSize;

        return [
            SELECT Id, Name, Phone, Type
            FROM Account
            ORDER BY Name
            LIMIT :pageSize OFFSET :offsetVal
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalPages(Integer pageSize) {
        Integer total = [SELECT COUNT() FROM Account];
        return (Integer)Math.ceil((Decimal)total / pageSize);
    }
}