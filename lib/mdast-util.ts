import type {
  CompileContext,
  Extension,
  Handle,
  Token
} from 'mdast-util-from-markdown';
import type {
  Options,
  State,
  Info
} from 'mdast-util-to-markdown';
import type {
  Parents
} from 'mdast';
import { parse } from 'svg-parser';

import type { 
  Callout,
  CalloutTitle,
  CalloutContent
} from './types.js';
import { calloutTypes } from './calloutTypes.js';

export function calloutFromMarkdown(): Extension {
  let calloutTypeText: string;
  return {
    enter: {
      callout(this: CompileContext, token: Token) {
        this.enter({
          type: 'callout',
          children: [],
          data: { 
            hName: 'blockquote',
            hProperties: { className: ['callout'] }
          }
        }, token);
      },
      calloutTitle(this: CompileContext, token: Token) {
        const meta = calloutTypes[calloutTypeText];
        const svgHast = parse(meta.svg);
        const icon: { type: 'html', value: string } = {
          type: 'html',
          value: `<span class="callout-icon" style="color: ${meta.color}">${meta.svg}</span>`
        };
        this.enter({
          type: 'calloutTitle',
          children: [
            {
              type: 'element' as any,
              data: {
                hName: 'span',
                hProperties: { 
                  className: ['callout-icon'], 
                  style: `color: ${meta.color}` 
                },
                hChildren: svgHast.children as any
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
      },
      calloutContent(this: CompileContext, token: Token) {
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
      callout(this: CompileContext, token: Token) {
        this.exit(token);
      },
      calloutTypeText(this: CompileContext, token: Token) {
        const type = this.sliceSerialize(token).toLowerCase();
        calloutTypeText = determineCalloutType(type);
      },
      calloutTitle(this: CompileContext, token: Token) {
        this.exit(token);
        calloutTypeText = undefined;
      },
      calloutContent(this: CompileContext, token: Token) {
        this.exit(token);
      }
    }
  }
}

// export function calloutToMarkdown(): Options {
//   return {
//     handlers: {
//       callout(node: Callout, parent: Parents, state: State, info: Info) {
//         return state.containerFlow(node, info);
//       },
//       calloutTitle(node: Callout, parent: Parents, state: State, info: Info) {
//         const type = node.data.hProperties.className[1];
//         const value = state.containerFlow(node.children[1], info);
//         return `[!${type}] ${value}`;
//       },
//       calloutContent(node: Callout, parent: Parents, state: State, info: Info) {
//         const tracker = state.createTracker(info);
//         tracker.move('> ');
//         tracker.shift(2);
//         const value = state.indentLines(
//           state.containerFlow(node, info),
//           (line, _, blank) => '>' + (blank ? '' : ' ') + line
//         )
//         return value;
//       }
//     },
//     join: [
//       function (_, __, parent) {
//         // Do not add blank lines between children.
//         return -1;
//       }
//     ]
//   }
// }

function determineCalloutType(type: string) {
  if (type in calloutTypes) {
    if (typeof calloutTypes[type] === 'string') {
      return calloutTypes[type];
    }
    return type;
  }
  return 'note';
}