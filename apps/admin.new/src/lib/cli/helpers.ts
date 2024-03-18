/**
 * Checks if the objects in the provided record are self-referenced by comparing the keys with the name property of each object.
 * @param objects - The record of objects to check.
 * @returns A boolean indicating whether the objects are self-referenced or not.
 */
export function checkSelfReferencedObjects(
  objects: Record<string, { name: string }>
) {
  let valid = true;
  for (const key in objects) {
    if (key !== objects[key].name) {
      valid = false;
      break;
    }
  }
  return valid;
}
