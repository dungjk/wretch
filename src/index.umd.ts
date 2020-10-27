import { Wretcher } from './wretcher';

// eslint-disable-next-line @typescript-eslint/unbound-method
const factory = Wretcher.factory;
// eslint-disable-next-line @typescript-eslint/unbound-method
factory['default'] = Wretcher.factory;

/**
 * Return a fresh Wretcher instance.
 */
export default factory;
