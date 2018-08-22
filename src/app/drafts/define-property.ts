export function overrideSetter(context: any, key: string, setter?: (newValue: any) => any) {
  defineProperty(context, key, {set: setter});
}

export function defineProperty(context: any, key: string, overrides: {
  set?: (newValue: any) => any,
  get?: () => any,
  enumerable?: boolean
}) {
  const enumerable = typeof overrides.enumerable === 'boolean' ? overrides.enumerable : true;
  const properties: PropertyDescriptorMap = {};
  const hiddenProperty = '_' + key;
  properties[hiddenProperty] = {writable: true, enumerable: false};
  properties[key] = {
    get: () => typeof overrides.get === 'function' ? overrides.get() : context[hiddenProperty],
    set: (newValue: any) => context[hiddenProperty] = typeof overrides.set === 'function' ? overrides.set(newValue) : newValue,
    enumerable: enumerable
  };
  Object.defineProperties(context, properties);
}
