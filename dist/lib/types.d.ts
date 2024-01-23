import type { Parent } from "mdast";
declare module 'micromark-util-types' {
    interface TokenTypeMap {
        callout: 'callout';
        calloutPrefix: 'calloutPrefix';
        calloutGreaterThanMark: 'calloutGreaterThanMark';
        calloutPrefixWhitespace: 'calloutPrefixWhitespace';
        calloutType: 'calloutType';
        calloutTypeMarkerLeft: 'calloutTypeMarkerLeft';
        calloutExclamationMark: 'calloutExclamationMark';
        calloutTypeText: 'calloutTypeText';
        calloutTypeMarkerRight: 'calloutTypeMarkerRight';
        calloutTitle: 'calloutTitle';
        calloutTitleChunk: 'calloutTitleChunk';
        calloutContent: 'calloutContent';
    }
    interface CompileData {
        calloutTypeText?: string;
    }
    interface ContainerState {
        calloutOpen?: boolean;
        calloutContentStarted?: boolean;
    }
}
export interface Callout extends Parent {
    type: 'callout';
}
export interface CalloutContent extends Parent {
    type: 'calloutContent';
}
export interface CalloutTitle extends Parent {
    type: 'calloutTitle';
}
declare module 'mdast-util-from-markdown' {
    interface CompileData {
        calloutTypeText?: string;
    }
}
declare module 'mdast-util-to-markdown' {
    interface ConstructNameMap {
        callout: 'callout';
        calloutTitle: 'calloutTitle';
        calloutContent: 'calloutContent';
    }
}
declare module 'mdast' {
    interface RootContentMap {
        callout: Callout;
        calloutTitle: CalloutTitle;
        calloutContent: CalloutContent;
    }
}
