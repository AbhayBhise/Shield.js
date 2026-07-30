export class DevToolsTrap {
    private threshold = 160; 
    private controller: AbortController;
    private hasTrapped = false;

    constructor() {
        this.controller = new AbortController();
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
                this.triggerTrap();
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
            this.triggerTrap();
        }
    }

    private triggerTrap() {
        if (this.hasTrapped) return;
        this.hasTrapped = true;
        
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;font-size:2rem;font-weight:bold;color:red;background:black;">Nice Try</div>';
        this.destroy();
    }

    public destroy() {
        this.controller.abort();
    }
}
