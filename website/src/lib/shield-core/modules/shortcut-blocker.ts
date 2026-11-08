import { BLOCKED_KEYS } from '../utils/constants';
import type { ShieldEvent } from '../shield';

export class ShortcutBlocker {
    private controller: AbortController;
    private onBlock?: (event: ShieldEvent) => void;

    constructor(onBlock?: (event: ShieldEvent) => void) {
        this.controller = new AbortController();
        this.onBlock = onBlock;
        this.init();
    }

    private init() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();

            if (
                e.key === BLOCKED_KEYS.F12 ||
                e.key === 'ContextMenu' ||
                (isCtrlOrCmd && key === BLOCKED_KEYS.U) ||
                (isCtrlOrCmd && key === BLOCKED_KEYS.P) ||
                (isCtrlOrCmd && key === BLOCKED_KEYS.S) ||
                (isCtrlOrCmd && e.shiftKey && key === BLOCKED_KEYS.I) ||
                (isCtrlOrCmd && e.shiftKey && key === BLOCKED_KEYS.J) ||
                (isCtrlOrCmd && e.shiftKey && key === 'c') || // Mac Inspect Element
                (isCtrlOrCmd && e.altKey && key === 'i') || // Mac DevTools
                (isCtrlOrCmd && e.altKey && key === 'u') // Mac View Source (Safari)
            ) {
                e.preventDefault();
                e.stopPropagation();

                this.onBlock?.({
                    type: 'SHORTCUT',
                    metadata: {
                        key: e.key,
                        ctrlKey: e.ctrlKey,
                        metaKey: e.metaKey,
                        shiftKey: e.shiftKey,
                        altKey: e.altKey
                    },
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                    timestamp: new Date().toISOString()
                });
            }
        }, { signal: this.controller.signal, capture: true });
    }

    public destroy() {
        this.controller.abort();
    }
}
