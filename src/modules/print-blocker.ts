import type { ShieldEvent } from '../shield';

export class PrintBlocker {
    private styleElement: HTMLStyleElement | null = null;
    private controller: AbortController;
    private onBlock?: (event: ShieldEvent) => void;

    constructor(onBlock?: (event: ShieldEvent) => void) {
        this.controller = new AbortController();
        this.onBlock = onBlock;
        this.init();
    }

    private init() {
        this.styleElement = document.createElement('style');
        this.styleElement.textContent = `
            @media print {
                body {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(this.styleElement);

        window.addEventListener('beforeprint', (e) => {
            e.preventDefault();
            this.onBlock?.({
                type: 'PRINT',
                pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                timestamp: new Date().toISOString()
            });
        }, { signal: this.controller.signal });
    }

    public destroy() {
        this.controller.abort();
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
        }
    }
}
