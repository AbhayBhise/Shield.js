export class ImageProtector {
    private protectedImages = new WeakSet<HTMLImageElement>();

    public protectImage(img: HTMLImageElement) {
        if (this.protectedImages.has(img)) return;

        const parent = img.parentElement;
        if (!parent) return;

        // Create the invisible overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 50;
            background: transparent;
        `;
        
        overlay.addEventListener('contextmenu', e => e.preventDefault());
        overlay.addEventListener('dragstart', e => e.preventDefault());

        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position: relative; display: inline-block; padding: 0; margin: 0; max-width: 100%;';
        
        // Inherit margin for layout flow
        const computedStyle = window.getComputedStyle(img);
        wrapper.style.marginTop = computedStyle.marginTop;
        wrapper.style.marginRight = computedStyle.marginRight;
        wrapper.style.marginBottom = computedStyle.marginBottom;
        wrapper.style.marginLeft = computedStyle.marginLeft;
        
        img.style.margin = '0';

        parent.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(overlay);

        this.protectedImages.add(img);
    }
}
