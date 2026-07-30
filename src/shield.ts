import { EventTrapper } from './modules/event-trapper';
import { ShortcutBlocker } from './modules/shortcut-blocker';
import { DevToolsTrap } from './modules/devtools-trap';
import { BlurShield } from './modules/blur-shield';
import { DOMPoisoner } from './modules/dom-poisoner';
import { MutationWatcher } from './modules/mutation-watcher';
import { PrintBlocker } from './modules/print-blocker';
import { ImageProtector } from './modules/image-protector';
import { FrameBuster } from './modules/frame-buster';

export class Shield {
    private eventTrapper: EventTrapper;
    private shortcutBlocker: ShortcutBlocker;
    private devToolsTrap: DevToolsTrap;
    private blurShield: BlurShield;
    private domPoisoner: DOMPoisoner;
    private imageProtector: ImageProtector;
    private mutationWatcher: MutationWatcher;
    private printBlocker: PrintBlocker;

    constructor() {
        this.eventTrapper = new EventTrapper();
        this.shortcutBlocker = new ShortcutBlocker();
        this.devToolsTrap = new DevToolsTrap();
        this.blurShield = new BlurShield();
        this.domPoisoner = new DOMPoisoner();
        this.imageProtector = new ImageProtector();
        this.mutationWatcher = new MutationWatcher(this.domPoisoner, this.imageProtector);
        this.printBlocker = new PrintBlocker();
        new FrameBuster(); // Instantiated once, no cleanup needed
        
        console.log('Shield.js initialized. Content protected.');
    }

    public destroy() {
        this.eventTrapper.destroy();
        this.shortcutBlocker.destroy();
        this.devToolsTrap.destroy();
        this.blurShield.destroy();
        this.mutationWatcher.destroy();
        this.printBlocker.destroy();
    }
}
