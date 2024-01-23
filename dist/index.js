import { callout } from './lib/micromark-syntax.js';
import { calloutFromMarkdown, calloutToMarkdown } from './lib/mdast-util.js';
export default function remarkCallout() {
    const data = this.data();
    add('micromarkExtensions', callout());
    add('fromMarkdownExtensions', calloutFromMarkdown());
    add('toMarkdownExtensions', calloutToMarkdown());
    function add(field, value) {
        const list = (data[field] ? data[field] : (data[field] = []));
        list.push(value);
    }
}
//# sourceMappingURL=index.js.map