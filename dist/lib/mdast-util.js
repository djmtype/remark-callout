import { parse } from 'svg-parser';
import { calloutTypes } from './calloutTypes.js';
export function calloutFromMarkdown() {
    let calloutTypeText;
    return {
        enter: {
            callout(token) {
                this.enter({
                    type: 'callout',
                    children: [],
                    data: {
                        hName: 'blockquote',
                        hProperties: {
                            className: ['callout']
                        }
                    }
                }, token);
            },
            calloutTitle(token) {
                // Inside calloutTitle, we will know current calloutTypeText, 
                // as calloutTypeText token is after calloutTitle.
                const meta = calloutTypes[calloutTypeText];
                const svgHast = parse(meta.svg);
                // modify the callout node to add a className.
                const callout = this.stack[this.stack.length - 1];
                callout.data.hProperties.className
                    .push(calloutTypeText);
                this.enter({
                    type: 'calloutTitle',
                    children: [
                        {
                            type: 'element',
                            data: {
                                hName: 'span',
                                hProperties: {
                                    className: ['callout-icon'],
                                    // style: `color: var(--callout-${calloutTypeText}, ${meta.color})`  
                                },
                                hChildren: svgHast.children
                            }
                        }
                    ],
                    data: {
                        hName: 'div',
                        hProperties: {
                            className: ['callout-title', calloutTypeText]
                        }
                    }
                }, token);
                calloutTypeText = undefined;
            },
            calloutContent(token) {
                this.enter({
                    type: 'calloutContent',
                    children: [],
                    data: {
                        hName: 'div',
                        hProperties: { className: ['callout-content'] }
                    }
                }, token);
            }
        },
        exit: {
            callout(token) {
                this.exit(token);
            },
            calloutTypeText(token) {
                const type = this.sliceSerialize(token).toLowerCase();
                calloutTypeText = determineCalloutType(type);
            },
            calloutTitle(token) {
                this.exit(token);
            },
            calloutContent(token) {
                this.exit(token);
            }
        }
    };
}
export function calloutToMarkdown() {
    return {
        handlers: {
            callout(node, parent, state, info) {
                const exit = state.enter('callout');
                const tracker = state.createTracker(info);
                tracker.move('> ');
                tracker.shift(2);
                const value = state.indentLines(state.containerFlow(node, tracker.current()), (line, _, blank) => '>' + (blank ? '' : ' ') + line);
                exit();
                return value;
            },
            calloutTitle(node, parent, state, info) {
                // Get the type of this callout.
                const type = node.data.hProperties.className[1];
                const typeString = `[!${type}]`;
                const titleString = state.containerPhrasing(
                // We know that the second children of calloutTitle
                // is a flow element node by construction of this mdast,
                // and which children are phrasing elements.
                node.children[1], info);
                const value = typeString + (titleString ? ' ' : '') + titleString;
                return value;
            },
            calloutContent(node, parent, state, info) {
                const value = state.containerFlow(node, info);
                return value;
            }
        }
    };
}
function determineCalloutType(type) {
    if (type in calloutTypes) {
        if (typeof calloutTypes[type] === 'string') {
            return calloutTypes[type];
        }
        return type;
    }
    return 'note';
}
//# sourceMappingURL=mdast-util.js.map