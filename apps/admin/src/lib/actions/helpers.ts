/**
 * Creates a ServerActionError object with the specified error message. This is useful for standarizing error handling from server actions.
 * @param error The error message.
 * @returns A ServerActionError object.
 */
export function actionError(error: string) {
  return { error };
}

/**
 * Creates an action emitter object with an error function that can be used to emit an error inside an action.
 * @param template - The template string. This is used to identify the action where the error was emitted. It will be prepended to the error message.
 * @returns An object with an `error` function that can be used to emit an error inside an action.
 */
export function actionEmitter(template: string) {
  function error(detail: string) {
    const errorMessage = `${template}: ${detail}`;
    console.error(errorMessage);
    return actionError(errorMessage);
  }
  return { error };
}
export type ActionEmitterType = ReturnType<typeof actionEmitter>;

/**
 * Executes the provided callback function within an action context.
 *
 * @template T - The return type of the callback function.
 * @template A - The types of the arguments passed to the callback function.
 *
 * @param callback - The callback function to be executed.
 * @returns A function that wraps the callback function and handles any errors that occur during execution.
 */
export function action<T, A extends any[]>(
  callback: (...props: A) => Promise<T>
) {
  const emitter = actionEmitter(`Error in action ${callback.name}`);
  return async function (...props: A) {
    try {
      const res = await callback(...props);
      return { data: res };
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return emitter.error(message);
    }
  };
}

/**
 * Represents a server form action function.
 * @template T - The type of data returned by the server.
 * @param data - The form data to be sent to the server.
 * @returns A promise that resolves to an object containing either the data returned by the server or an error message.
 */
export type ServerFormAction<T = void> = (
  data: FormData
) => Promise<{ data: T } | { error: string }>;

/**
 * Extracts form data values based on the provided keys.
 *
 * @param formData - The FormData object containing the form data.
 * @param keys - An array of keys representing the form data fields to extract.
 * @returns A record object containing the extracted form data values, where the keys are the provided keys and the values are the corresponding form data values.
 */
export function extractFormData<K extends string>(
  formData: FormData,
  keys: K[]
) {
  const result = {} as Record<K, FormDataEntryValue | null>;
  for (const key of keys) {
    result[key] = formData.get(key);
  }
  return result;
}
