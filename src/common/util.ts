export const isNullOrUndefined =  (str: string | undefined | null) : boolean => !str;
export const isStringEmpty = (str: string | undefined | null): boolean => !str || 0 === str.length;