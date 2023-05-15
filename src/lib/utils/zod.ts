import type { SafeParseReturnType } from 'zod';

export const parseZodErrors = <T>(result: SafeParseReturnType<T, T>) => {
  if (result.success) {
    return {};
  }
  let errors: any = {};
  const addError = (key: string, message: string) => {
    if (!errors.hasOwnProperty(key)) {
      errors[key] = message;
    } else {
      if (!Array.isArray(errors[key])) {
        errors[key] = [errors[key]];
      }
      errors[key].push(message);
    }
  };
  for (let issue of result.error.issues) {
    const { message, path } = issue;
    const [key, index] = path as [string, number | undefined];
    let prop = key;
    if (index !== undefined) {
      prop = `${key}[${index}]`;
    }
    addError(key, message);
  }

  return errors;
};
