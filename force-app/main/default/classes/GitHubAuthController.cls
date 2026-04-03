public with sharing class GitHubAuthController {

    // Replace with your GitHub OAuth App details
    private static final String CLIENT_ID = 'Ov23lifuZDUqLpUrZONR';
    private static final String CLIENT_SECRET = 'eeeba3e7b2d42007cf017b205a00e26328563f49';
    private static final String TOKEN_URL = 'https://github.com/login/oauth/access_token';

    @AuraEnabled
    public static String getAccessToken(String code) {

        HttpRequest req = new HttpRequest();
        req.setEndpoint(TOKEN_URL);
        req.setMethod('POST');
        req.setHeader('Accept', 'application/json');

        String body = 'client_id=' + CLIENT_ID +
                      '&client_secret=' + CLIENT_SECRET +
                      '&code=' + code;

        req.setBody(body);

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            Map<String, Object> result =
                (Map<String, Object>) JSON.deserializeUntyped(res.getBody());

            String accessToken = (String) result.get('access_token');

            return accessToken;
        } else {
            throw new AuraHandledException('GitHub token error: ' + res.getBody());
        }
    }
}