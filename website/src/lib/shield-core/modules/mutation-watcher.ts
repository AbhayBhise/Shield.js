import { DOMPoisoner } from './dom-poisoner';
import { ImageProtector } from './image-protector';

export class MutationWatcher {
    private observer: MutationObserver | null = null;
    private poisoner: DOMPoisoner;
    private imageProtector: ImageProtector;
    private frameId: number | null = null;
    private pendingNodes: Set<HTMLElement> = new Set();
    private pendingImages: Set<HTMLImageElement> = new Set();

    constructor(poisoner: DOMPoisoner, imageProtector: ImageProtector) {
        this.poisoner = poisoner;
        this.imageProtector = imageProtector;
        this.init();
    }

    private init() {
        // Initial pass
        const initialParagraphs = document.querySelectorAll('p');
        initialParagraphs.forEach(p => {
            if (!this.poisoner.poisonedNodes.has(p as HTMLElement)) {
                this.pendingNodes.add(p as HTMLElement);
            }
        });
        
        const initialImages = document.querySelectorAll('img');
        initialImages.forEach(img => {
            this.pendingImages.add(img);
        });

        if (this.pendingNodes.size > 0 || this.pendingImages.size > 0) this.scheduleProcessing();

        this.observer = new MutationObserver((mutations) => {
            let hasAddedNodes = false;
            
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const el = node as HTMLElement;
                            if (el.tagName === 'P' && !this.poisoner.poisonedNodes.has(el)) {
                                this.pendingNodes.add(el);
                                hasAddedNodes = true;
                            } else if (el.tagName === 'IMG') {
                                this.pendingImages.add(el as HTMLImageElement);
                                hasAddedNodes = true;
                            }
                            
                            const childParagraphs = el.querySelectorAll('p');
                            if (childParagraphs.length > 0) {
                                childParagraphs.forEach(p => {
                                    if (!this.poisoner.poisonedNodes.has(p as HTMLElement)) {
                                        this.pendingNodes.add(p as HTMLElement);
                                        hasAddedNodes = true;
                                    }
                                });
                            }
                            
                            const childImages = el.querySelectorAll('img');
                            if (childImages.length > 0) {
                                childImages.forEach(img => {
                                    this.pendingImages.add(img as HTMLImageElement);
                                    hasAddedNodes = true;
                                });
                            }
                        }
                    });
                }
            }

            if (hasAddedNodes) {
                this.scheduleProcessing();
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    private scheduleProcessing() {
        if (this.frameId === null) {
            this.frameId = requestAnimationFrame(() => {
                this.processPendingNodes();
                this.frameId = null;
            });
        }
    }

    private processPendingNodes() {
        this.pendingNodes.forEach(el => {
            this.poisoner.poisonElement(el);
        });
        this.pendingNodes.clear();
        
        this.pendingImages.forEach(img => {
            this.imageProtector.protectImage(img);
        });
        this.pendingImages.clear();
    }

    // processElements removed as it is now handled directly in init

    public destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
        this.pendingNodes.clear();
    }
}
