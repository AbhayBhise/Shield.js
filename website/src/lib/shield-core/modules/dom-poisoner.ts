import { ZERO_WIDTH_CHARS } from '../utils/constants';

export class DOMPoisoner {
    private garbageWords = ['ads', 'click', 'subscribe', 'free', 'discount', 'buy', 'now'];
    public poisonedNodes = new WeakSet<HTMLElement>();

    constructor() {}
    
    private getHiddenStyle(): string {
        const styles = [
            'display:none !important;',
            'position:absolute;left:-9999px;opacity:0;',
            'font-size:0;width:0;height:0;overflow:hidden;position:fixed;',
            'clip:rect(0,0,0,0);position:absolute;pointer-events:none;',
            'visibility:hidden;position:absolute;z-index:-1;'
        ];
        return styles[Math.floor(Math.random() * styles.length)];
    }

    public poisonElement(el: HTMLElement) {
        if (this.poisonedNodes.has(el)) return;

        // Add a random class for obfuscation
        const randomClass = 'sh-' + Math.random().toString(36).substring(2, 8);
        el.classList.add(randomClass);

        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        let node;
        const textNodes: Text[] = [];

        while (node = walker.nextNode()) {
            if (node.nodeValue && node.nodeValue.trim().length > 0) {
                textNodes.push(node as Text);
            }
        }

        textNodes.forEach(textNode => {
            if (!textNode.parentNode) return;
            
            const words = textNode.nodeValue?.split(/\s+/) || [];
            if (words.length <= 1) return;

            const fragment = document.createDocumentFragment();

            for (let i = 0; i < words.length; i++) {
                fragment.appendChild(document.createTextNode(words[i]));
                
                if (i < words.length - 1) {
                    let separator = ' ';
                    // 50% chance to inject zero-width char alongside the space
                    if (Math.random() > 0.5) {
                        separator += ZERO_WIDTH_CHARS[Math.floor(Math.random() * ZERO_WIDTH_CHARS.length)];
                    }
                    fragment.appendChild(document.createTextNode(separator));
                    
                    // 20% chance to inject garbage span
                    if (Math.random() > 0.8) {
                        const span = document.createElement('span');
                        // Use a randomized style each time so scrapers can't hook onto a single CSS rule
                        span.style.cssText = this.getHiddenStyle();
                        // Mix up tag names sometimes
                        if (Math.random() > 0.5) {
                            const b = document.createElement('b');
                            b.style.cssText = span.style.cssText;
                            span.style.cssText = '';
                            b.textContent = this.garbageWords[Math.floor(Math.random() * this.garbageWords.length)];
                            span.appendChild(b);
                        } else {
                            span.textContent = this.garbageWords[Math.floor(Math.random() * this.garbageWords.length)];
                        }
                        fragment.appendChild(span);
                    }
                }
            }
            
            textNode.parentNode.replaceChild(fragment, textNode);
        });

        this.poisonedNodes.add(el);
    }
}
