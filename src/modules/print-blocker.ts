export class PrintBlocker {
    private styleElement: HTMLStyleElement | null = null;
    private controller: AbortController;

    constructor() {
        this.controller = new AbortController();
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
        }, { signal: this.controller.signal });
    }

    public destroy() {
        this.controller.abort();
        if (this.styleElement && this.styleElement.parentNode) {
            this.styleElement.parentNode.removeChild(this.styleElement);
        }
    }
}
