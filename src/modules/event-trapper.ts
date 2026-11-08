import type { ShieldEvent } from '../shield';

export class EventTrapper {
    private controller: AbortController;
    private styleElement: HTMLStyleElement | null = null;
    private onBlock?: (event: ShieldEvent) => void;

    constructor(onBlock?: (event: ShieldEvent) => void) {
        this.controller = new AbortController();
        this.onBlock = onBlock;
        this.init();
    }

    private init() {
        const { signal } = this.controller;

        // Block basic events
        const blockedEvents = ['contextmenu', 'copy', 'cut', 'paste', 'dragstart', 'selectstart'];
        
        blockedEvents.forEach(evt => {
            document.addEventListener(evt, this.createEventHandler(evt), { signal, capture: true });
        });

        // Inject anti-selection CSS
        this.styleElement = document.createElement('style');
        this.styleElement.textContent = `
            *:not(input):not(textarea):not([contenteditable="true"]) {
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
        `;
        document.head.appendChild(this.styleElement);

        // Mobile specific: Prevent touch long-press
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
                this.onBlock?.({
                    type: 'SELECT',
                    metadata: { reason: 'multi-touch' },
                    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                    timestamp: new Date().toISOString()
                });
            }
        }, { signal, passive: false });
    }

    private createEventHandler(evtName: string) {
        return (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            let type: ShieldEvent['type'] = 'CONTEXT_MENU';
            if (evtName === 'contextmenu') type = 'CONTEXT_MENU';
            else if (evtName === 'copy' || evtName === 'cut') type = 'COPY';
            else if (evtName === 'selectstart') type = 'SELECT';
            else if (evtName === 'dragstart') type = 'DRAG';

            this.onBlock?.({
                type,
                metadata: { eventName: evtName },
                pageUrl: typeof window !== 'undefined' ? window.location.href : '',
                timestamp: new Date().toISOString()
            });
        };
    }

    public destroy() {
        this.controller.abort();
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
        }
    }
}
