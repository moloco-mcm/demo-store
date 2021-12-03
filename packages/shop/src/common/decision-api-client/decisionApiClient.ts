import { v1 } from '@moloco-rmp/decision-api-client';

export const client = v1.createClient({
  baseURL: process.env.RMP_DECISION_API_URL,
  apiKey: process.env.RMP_DECISION_API_KEY || '',
  platformId: process.env.NEXT_PUBLIC_RMP_PLATFORM_ID || '',
});
