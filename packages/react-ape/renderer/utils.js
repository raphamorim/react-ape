/**
 * Returns a relatively "guaranteed" unique id.
 * It's still not 100% guaranteed, that's why we added the "unsafe" prefix on
 * this function.
 */
export function unsafeCreateUniqueId(): string {
  return (Math.random() * 10e18 + Date.now()).toString(36);
}
