export class FrameBuster {
    constructor() {
        this.init();
    }

    private init() {
        // Anti-clickjacking & Anti-framing
        try {
            if (window.top !== window.self) {
                // If we are inside an iframe, force the parent window to navigate to our URL
                if (window.top) {
                    window.top.location.href = window.self.location.href;
                }
            }
        } catch (e) {
            // If the iframe is cross-origin, accessing window.top might throw a SecurityError.
            // If it throws, we know we're definitely in a cross-origin iframe!
            // We can't change window.top.location directly sometimes, so we set our own location to break out,
            // or we just blank out the page.
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;font-size:2rem;font-weight:bold;color:red;background:black;">Unauthorized Framing Detected</div>';
        }
    }
}
