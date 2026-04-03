import { LightningElement, track } from 'lwc';
import getAccessToken from '@salesforce/apex/GitHubAuthController.getAccessToken';
import getUserRepos from '@salesforce/apex/GitHubApiService.getUserRepos';

export default class GithubLogin extends LightningElement {
    @track repos = [];
    accessToken;

    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            this.exchangeCode(code);
        }
    }

    handleLogin() {
        const clientId = 'Ov23lifuZDUqLpUrZONR';
        const githubAuthUrl =
            'https://github.com/login/oauth/authorize' +
            '?client_id=' + clientId +
            '&scope=repo';

        window.location.href = githubAuthUrl;
    }

    exchangeCode(code) {
        getAccessToken({ code: code })
            .then(token => {
                this.accessToken = token;
                return getUserRepos({ accessToken: token });
            })
            .then(result => {
                this.repos = result;
            })
            .catch(error => {
                console.error(error);
                alert('GitHub connection failed');
            });
    }
}