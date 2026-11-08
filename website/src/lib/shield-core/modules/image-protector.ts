export class ImageProtector {
    private protectedImages = new WeakSet<HTMLImageElement>();

    public protectImage(img: HTMLImageElement) {
        if (this.protectedImages.has(img)) return;

        // We avoid wrapping the image in a DOM node (which breaks React and layouts).
        // event-trapper.ts already handles global contextmenu/drag blocks.
        // We just ensure draggable is explicitly false.
        img.draggable = false;

        this.protectedImages.add(img);
    }
}
