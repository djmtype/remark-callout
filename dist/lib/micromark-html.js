export function calloutHtml() {
    return {
        enter: {
            'callout': function (token) {
                this.tag('<blockquote class="callout">');
            },
            'calloutTitle': function (token) {
                this.tag(`<div class="callout-title ${this.getData('calloutTypeText')}">`);
            }
        },
        exit: {
            'callout': function (token) {
                this.tag('</div>');
                this.tag('</blockquote>');
            },
            'calloutTitle': function (token) {
                this.tag('</div>');
                this.tag('<div class="callout-content">');
            },
            'calloutTypeText': function (token) {
                const type = this.sliceSerialize(token).toLowerCase();
                this.setData('calloutTypeText', type);
            },
        }
    };
}
//# sourceMappingURL=micromark-html.js.map