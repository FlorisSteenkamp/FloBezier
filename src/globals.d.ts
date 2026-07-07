import type { __Debug__ } from './intersection/bezier-bezier-intersection-fast/debug.js';

declare global {
    var __debug__: __Debug__;

    interface GlobalThis {
        __debug__: __Debug__;
    }
}
