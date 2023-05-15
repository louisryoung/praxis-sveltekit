export const isEmpty = (o: Record<string, unknown>) =>
  o && Object.keys(o).length === 0;

export function groupBy<T = unknown, U = string>(
  arr: T[],
  keyGetter: (arg: T) => U,
  tuples?: boolean
) {
  const map = new Map<U, T[]>();
  arr.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return tuples ? [...map.entries()] : map;
}

const defaultMappers = {
  key: (k: string, v: any) => k,
  value: (k: string, v: any) => v,
};

export const encodeURIParams = (
  p: Record<string, string | number | any>,
  mappers: any = defaultMappers
) =>
  Object.entries(p)
    .map(
      ([k, v]) =>
        `${encodeURIComponent(
          mappers?.key?.(k, v) ?? defaultMappers.key(k, v)
        )}=${encodeURIComponent(
          mappers?.value?.(k, v) ?? defaultMappers.value(k, v)
        )}`
    )
    .join('&');

export const getQueryParams = (
  p: Record<string, string | number | any>,
  mappers: any = defaultMappers
) => {
  const params = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    params.append(
      mappers?.key?.(k, v) ?? defaultMappers.key(k, v),
      mappers?.value?.(k, v) ?? defaultMappers.value(k, v)
    );
  });
  return params;
};

export const getFullPath = (base: string, path: string) =>
  encodeURI((base ?? '') + path);

export const parseNestedOnjects = (obj: any) => {
  for (const key of Object.keys(obj)) {
    if (key.indexOf('__') !== -1) {
      const parent = key.split('__')[0];
      const child = key.split('__').slice(1).join('__');
      obj[parent] = parseNestedOnjects({ ...obj[parent], [child]: obj[key] });
      delete obj[key];
    }
  }
  return obj;
};

// interface GroupBy<T = any, U = string> {
//   (arr: T[], keyGetter: (arg: T) => U): Map<U, T[]>;
// }

// const groupBy: GroupBy = (arr, keyGetter) => null;
