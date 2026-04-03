import { LightningElement, api } from 'lwc';

export default class Breadcrumbs extends LightningElement {
    @api levels; // e.g. "Home, Knowledge, Article"
    @api links;  // e.g. "/", "/knowledge", "/article/{!urlName}"

    get breadcrumbs() {
        const labels = this.levels ? this.levels.split(',').map(l => l.trim()) : [];
        const urls = this.links ? this.links.split(',').map(u => u.trim()) : [];
        const resolvedUrls = urls.map(url => this.resolveMergeFields(url));

        return labels.map((label, index) => ({
            label,
            url: resolvedUrls[index] || '#'
        }));
    }

    // Replace {!mergeFields} in the URL with actual values from the URL
    resolveMergeFields(url) {
        if (!url) return '';
        const params = new URL(window.location.href).searchParams;

        // Replace {!paramName} with actual query param values (e.g., urlName, topicId)
        return url.replace(/\{!([\w]+)\}/g, (match, p1) => params.get(p1) || match);
    }
}