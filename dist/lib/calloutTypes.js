// copied from 
// https://github.com/datopian/portaljs/blob/main/packages/remark-callouts/src/lib/calloutTypes.ts
export const calloutTypes = {
    // aliases
    summary: "abstract",
    tldr: "abstract",
    hint: "tip",
    important: "tip",
    check: "success",
    done: "success",
    help: "question",
    faq: "question",
    caution: "warning",
    attention: "warning",
    fail: "failure",
    missing: "failure",
    error: "danger",
    cite: "quote",
    // base types
    note: {
        keyword: "note",
        color: "#448aff",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5L2 22l1.5-5.5Zm-2 2l4 4"/></svg>',
    },
    tip: {
        keyword: "tip",
        color: "#00bfa6",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3c-1.072-2.143-.224-4.054 2-6c.5 2.5 2 4.9 4 6.5c2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5"/></svg>',
    },
    warning: {
        keyword: "warning",
        color: "#ff9100",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/></svg>',
    },
    abstract: {
        keyword: "abstract",
        color: "#00aeff",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01"/></g></svg>',
    },
    info: {
        keyword: "info",
        color: "#00b8d4",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>',
    },
    todo: {
        keyword: "todo",
        color: "#00b8d4",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g></svg>',
    },
    success: {
        keyword: "success",
        color: "#00c853",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/></svg>',
    },
    question: {
        keyword: "question",
        color: "#63dd17",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/></g></svg>',
    },
    failure: {
        keyword: "failure",
        color: "#ff5252",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>',
    },
    danger: {
        keyword: "danger",
        color: "#ff1745",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 2L3 14h9l-1 8l10-12h-9z"/></svg>',
    },
    bug: {
        keyword: "bug",
        color: "#f50057",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 2l1.88 1.88m4.24 0L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6m0 0v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5m3 8H2m1 8c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4m-.8 4c2.1.1 3.8 1.9 3.8 4"/></g></svg>',
    },
    example: {
        keyword: "example",
        color: "#7c4dff",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    },
    quote: {
        keyword: "quote",
        color: "#9e9e9e",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1m12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1"/></svg>',
    },
};
//# sourceMappingURL=calloutTypes.js.map