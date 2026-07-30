import { BLUR_DELAY } from '../utils/constants';

export class BlurShield {
    private controller: AbortController;
    private overlay: HTMLDivElement | null = null;
    private unblurTimeout: number | null = null;

    constructor() {
        this.controller = new AbortController();
        this.init();
    }

    private init() {
        const options = { signal: this.controller.signal, capture: true };
        
        window.addEventListener('blur', (e) => {
            if (e.target === window || e.target === document) this.applyBlur();
        }, options);
        window.addEventListener('focus', (e) => {
            if (e.target === window || e.target === document) this.removeBlur();
        }, options);
        window.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyDown(e), options);
        window.addEventListener('keyup', (e: KeyboardEvent) => this.handleKeyUp(e), options);
        
        // Allow immediate unblur if the user clicks back on the page
        window.addEventListener('pointerdown', () => {
            if (this.overlay && document.hasFocus()) this.removeBlur();
        }, options);
    }

    private triggerProtection() {
        this.applyBlur();
        this.scheduleUnblur(BLUR_DELAY);
    }

    private handleKeyDown(e: KeyboardEvent) {
        if ((e.metaKey && e.shiftKey) || e.key === 'PrintScreen') {
            this.triggerProtection();
        }
    }

    private handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'PrintScreen') {
            this.triggerProtection();
            return;
        }

        // Only schedule unblur if we are currently blurring and focus is active
        if (this.overlay && (!e.metaKey || !e.shiftKey) && document.hasFocus()) {
            this.scheduleUnblur(BLUR_DELAY);
        }
    }

    private scheduleUnblur(ms: number) {
        if (this.unblurTimeout) clearTimeout(this.unblurTimeout);
        this.unblurTimeout = window.setTimeout(() => {
            if (document.hasFocus()) this.removeBlur();
        }, ms);
    }

    private applyBlur() {
        if (this.unblurTimeout) {
            clearTimeout(this.unblurTimeout);
            this.unblurTimeout = null;
        }
        
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                background: black;
            `;
            document.body.appendChild(this.overlay);
            document.body.style.filter = 'blur(20px)';
        }
    }

    private removeBlur() {
        if (this.overlay) {
            if (this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
            this.overlay = null;
            document.body.style.filter = '';
        }
    }

    public destroy() {
        this.controller.abort();
        this.removeBlur();
        if (this.unblurTimeout) clearTimeout(this.unblurTimeout);
    }
}
