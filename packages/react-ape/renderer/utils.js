/**
 * Returns a relatively "guaranteed" unique id.
 * It's still not 100% guaranteed, that's why we added the "unsafe" prefix on
 * this function.
 */
export function unsafeCreateUniqueId(): string {
  return (Math.random() * 10e18 + Date.now()).toString(36);
}

export const isWebAssemblySupported = (() => {
    try {
        if (typeof WebAssembly === "object"
            && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    } catch (e) {
    }
    return false;
})();
