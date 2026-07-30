import { Shield } from './shield';

// For ESM usage
export { Shield };

// Auto-initialize for IIFE context
if (typeof window !== 'undefined') {
    // Prevent multiple initializations
    if (!(window as any).__shield_initialized) {
        (window as any).__shield_initialized = true;
        
        // Wait for DOM to be ready if it isn't already
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new Shield();
            });
        } else {
            new Shield();
        }
    }
}
