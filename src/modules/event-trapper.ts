export class EventTrapper {
    private controller: AbortController;
    private styleElement: HTMLStyleElement | null = null;

    constructor() {
        this.controller = new AbortController();
        this.init();
    }

    private init() {
        const { signal } = this.controller;

        // Block basic events
        const blockedEvents = ['contextmenu', 'copy', 'cut', 'paste', 'dragstart', 'selectstart'];
        
        blockedEvents.forEach(evt => {
            document.addEventListener(evt, this.preventDefault, { signal, capture: true });
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
            }
        }, { signal, passive: false });
    }

    private preventDefault(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    public destroy() {
        this.controller.abort();
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
        }
    }
}
