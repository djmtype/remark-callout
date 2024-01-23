/*
 * Syntax extension for micromark.
 */
import { codes, constants } from 'micromark-util-symbol';
import { factorySpace } from 'micromark-factory-space';
import { asciiAlpha, markdownLineEnding, markdownSpace } from 'micromark-util-character';
const calloutConstruct = {
    name: 'callout',
    tokenize: tokenizeCalloutStart,
    continuation: { tokenize: tokenizeCalloutContinuation },
    exit: exitCallout,
    // precedes blockquote
    add: 'before'
};
export function callout() {
    return {
        document: { [codes.greaterThan]: calloutConstruct }
    };
}
function tokenizeCalloutStart(effects, ok, nok) {
    const self = this;
    return start;
    function start(code) {
        if (code === 62) {
            const state = self.containerState;
            // Do not use blockquote's "open", use customized "calloutOpen".
            // Otherwise, blockquotes will be affected.
            effects.enter('callout', { _container: true });
            state.calloutOpen = true;
            effects.enter('calloutPrefix');
            effects.enter('calloutGreaterThanMark');
            effects.consume(code);
            effects.exit('calloutGreaterThanMark');
            return after;
        }
        return nok(code);
    }
    function after(code) {
        if (markdownSpace(code)) {
            effects.enter('calloutPrefixWhitespace');
            effects.consume(code);
            effects.exit('calloutPrefixWhitespace');
            return typeMarkerLeft;
        }
        return typeMarkerLeft(code);
    }
    function typeMarkerLeft(code) {
        if (code === codes.leftSquareBracket) {
            effects.enter('calloutType');
            effects.enter('calloutTypeMarkerLeft');
            effects.consume(code);
            effects.exit('calloutTypeMarkerLeft');
            return exclaminationMark;
        }
        return nok(code);
    }
    function exclaminationMark(code) {
        if (code === codes.exclamationMark) {
            effects.enter('calloutExclamationMark');
            effects.consume(code);
            effects.exit('calloutExclamationMark');
            effects.enter('calloutTypeText');
            return type;
        }
        return nok(code);
    }
    function type(code) {
        if (code === codes.rightSquareBracket) {
            effects.exit('calloutTypeText');
            effects.enter('calloutTypeMarkerRight');
            effects.consume(code);
            effects.exit('calloutTypeMarkerRight');
            effects.exit('calloutType');
            return afterTypePotentialWhitespace;
        }
        if (asciiAlpha(code)) {
            effects.consume(code);
            return type;
        }
        return nok(code);
    }
    function afterTypePotentialWhitespace(code) {
        if (markdownSpace(code)) {
            effects.enter('calloutPrefixWhitespace');
            effects.consume(code);
            effects.exit('calloutPrefixWhitespace');
            effects.exit('calloutPrefix');
            effects.enter('calloutTitle');
            effects.enter('calloutTitleChunk', {
                _tokenizer: self.parser.flow(self.now()),
                contentType: constants.contentTypeFlow
            });
            return insideTitle;
        }
        effects.enter('calloutTitle');
        effects.enter('calloutTitleChunk', {
            _tokenizer: self.parser.flow(self.now()),
            contentType: constants.contentTypeFlow
        });
        return insideTitle(code);
    }
    function insideTitle(code) {
        if (markdownLineEnding(code) || code === codes.eof) {
            const token = effects.exit('calloutTitleChunk');
            const stream = self.sliceStream(token);
            // eof, because we have finished the title.
            stream.push(null);
            token._tokenizer.write(stream);
            effects.exit('calloutTitle');
            return ok(code);
        }
        effects.consume(code);
        return insideTitle;
    }
}
function tokenizeCalloutContinuation(effects, ok, nok) {
    const self = this;
    return contStart;
    function contStart(code) {
        const state = self.containerState;
        if (!state.calloutContentStarted) {
            effects.enter('calloutContent');
        }
        if (markdownSpace(code)) {
            return factorySpace(effects, contBefore, 'linePrefix', self.parser.constructs.disable.null.includes('codeIndented')
                ? undefined
                : 4)(code);
        }
        return contBefore(code);
    }
    function contBefore(code) {
        if (code === 62) {
            effects.enter('calloutPrefix');
            effects.enter('calloutGreaterThanMark');
            effects.consume(code);
            effects.exit('calloutGreaterThanMark');
            return contAfter;
        }
        return nok(code);
    }
    function contAfter(code) {
        const state = self.containerState;
        state.calloutContentStarted = true;
        if (markdownSpace(code)) {
            effects.enter('calloutPrefixWhitespace');
            effects.consume(code);
            effects.exit('calloutPrefixWhitespace');
            effects.exit('calloutPrefix');
            return ok;
        }
        effects.exit('calloutPrefix');
        return ok(code);
    }
}
function exitCallout(effects) {
    const state = this.containerState;
    if (state.calloutContentStarted) {
        effects.exit('calloutContent');
    }
    effects.exit('callout');
}
//# sourceMappingURL=micromark-syntax.js.map