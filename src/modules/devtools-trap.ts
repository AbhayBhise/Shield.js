import type { ShieldEvent } from '../shield';

export class DevToolsTrap {
    private threshold = 160; 
    private controller: AbortController;
    private hasTrapped = false;
    private onBlock?: (event: ShieldEvent) => void;

    constructor(onBlock?: (event: ShieldEvent) => void) {
        this.controller = new AbortController();
        this.onBlock = onBlock;
        this.init();
    }

    private init() {
        // Method 1: Width/Height diff via resize event (0 CPU when idle)
        window.addEventListener('resize', () => this.detectDevToolsDimensions(), { signal: this.controller.signal });
        // Initial check just in case it's already open
        this.detectDevToolsDimensions();

        // Method 2: Profiling toString (Logged ONCE to avoid memory leaks)
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: () => {
                this.triggerTrap('console-getter');
            }
        });
        // Browsers evaluate getters in console history when DevTools is opened
        console.log('%cShield.js', element); 
    }

    private detectDevToolsDimensions() {
        if (this.hasTrapped) return;
        
        const widthDiff = window.outerWidth - window.innerWidth > this.threshold;
        const heightDiff = window.outerHeight - window.innerHeight > this.threshold;
        
        if (widthDiff || heightDiff) {
            this.triggerTrap('viewport-diff');
        }
    }

    private triggerTrap(source?: string) {
        if (this.hasTrapped) return;
        this.hasTrapped = true;

        this.onBlock?.({
            type: 'DEVTOOLS',
            metadata: { detectionSource: source || 'unknown' },
            pageUrl: typeof window !== 'undefined' ? window.location.href : '',
            timestamp: new Date().toISOString()
        });
        
        document.body.innerHTML = '<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:black;color:white;text-align:center;padding:2rem;"><h1 style="color:red;font-size:2rem;margin-bottom:1rem;">Security Access Denied</h1><p style="font-size:1.2rem;max-width:600px;line-height:1.5;">This website is protected by Shield.js client-side security.</p><p style="font-size:1rem;color:#ccc;max-width:600px;margin-top:1rem;">We detected behavior consistent with Developer Tools inspection or a dynamic viewport resize. If you are on a mobile phone, this can trigger accidentally if your browser navigation bar auto-hides while scrolling. Please try viewing this portfolio on a desktop computer, or disable Developer Tools.</p></div>';
        this.destroy();
    }

    public destroy() {
        this.controller.abort();
    }
}
