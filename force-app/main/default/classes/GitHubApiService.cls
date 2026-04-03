public with sharing class GitHubApiService {

    @AuraEnabled(cacheable=true)
    public static List<String> getUserRepos(String accessToken) {

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.github.com/user/repos');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('Accept', 'application/vnd.github+json');

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            List<Object> repos =
                (List<Object>) JSON.deserializeUntyped(res.getBody());

            List<String> repoNames = new List<String>();

            for (Object o : repos) {
                Map<String, Object> repo = (Map<String, Object>) o;
                repoNames.add((String) repo.get('full_name'));
            }
            return repoNames;

        } else {
            throw new AuraHandledException('GitHub API error: ' + res.getBody());
        }
    }
}