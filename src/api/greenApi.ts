import axios from 'axios';
import { ApiError } from './apiError';
import type { InstanceCredentials } from './types/types';
import { instanceStateSchema, type InstanceState } from './schemas/instanceState.schema';
import { sendMessageResponseSchema, type SendMessageResponse } from './schemas/sendMessage.schema';

// Хост общий для всех инстансов GREEN-API — маршрутизация идёт по idInstance
// в самом пути запроса, поэтому пользователю не нужно знать/вводить этот URL.
const GREEN_API_BASE_URL = 'https://api.green-api.com';

const greenApi = axios.create({
  baseURL: GREEN_API_BASE_URL,
});

function instancePath({ idInstance }: InstanceCredentials): string {
  return `/waInstance${idInstance}`;
}

// По документации GREEN-API: 403 — проблема с idInstance (его не существует
// или он некорректен), 401 — idInstance верный, но apiTokenInstance неверный.
function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return new ApiError(
      error.response?.data?.message ?? `Ошибка запроса: HTTP ${error.response?.status}`,
      error.response?.status
    );
  }

  return new ApiError(error instanceof Error ? error.message : 'Неизвестная ошибка');
}

export async function getStateInstance(
  creds: InstanceCredentials
): Promise<InstanceState> {
  try {
    const { data } = await greenApi.get(
      `${instancePath(creds)}/getStateInstance/${creds.apiTokenInstance}`
    );

    return instanceStateSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}

export interface SendMessagePayload {
  chatId: string;
  message: string;
}

export async function sendMessage(
  creds: InstanceCredentials,
  payload: SendMessagePayload
): Promise<SendMessageResponse> {
  try {
    const { data } = await greenApi.post(
      `${instancePath(creds)}/sendMessage/${creds.apiTokenInstance}`,
      payload
    );

    return sendMessageResponseSchema.parse(data);
  } catch (error) {
    throw toApiError(error);
  }
}
