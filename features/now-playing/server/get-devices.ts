import fetcher from '@/lib/fetcher';

import { PLAYER_DEVICES_ENDPOINT } from '../constants';
import { pairDevices } from '../pair-devices';
import type { Device, DeviceObject } from '../types';
import { getAccessToken } from './get-access-token';

export const getDevices = async (): Promise<Array<Device>> => {
  const { access_token } = await getAccessToken();

  const response = await fetcher<{ devices?: Array<DeviceObject> }>(
    PLAYER_DEVICES_ENDPOINT,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const deviceList = response?.devices ?? [];

  const devices: Array<Device> = deviceList.map((device) => ({
    name: device.name,
    isActive: device.is_active,
    type: device.type,
    model: pairDevices[device.type]?.model ?? 'Unknown device',
    id: pairDevices[device.type].id ?? 'unknown-device-id',
  }));

  return devices;
};
