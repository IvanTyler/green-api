import { z } from 'zod';

export const instanceStateSchema = z.object({
  stateInstance: z.enum([
    'notAuthorized',
    'authorized',
    'blocked',
    'sleepMode',
    'starting',
    'yellowCard',
    'suspended',
  ]),
});

export type InstanceState = z.infer<typeof instanceStateSchema>;
