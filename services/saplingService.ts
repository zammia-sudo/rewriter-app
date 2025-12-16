import { API_ENDPOINT, API_KEY } from '../constants';
import { RephraseRequest, RephraseResponse } from '../types';

export const rephraseText = async (requestData: Omit<RephraseRequest, 'key'>): Promise<string[]> => {
  try {
    const payload: RephraseRequest = {
      ...requestData,
      key: API_KEY,
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.msg || `API Error: ${response.status} ${response.statusText}`);
    }

    const data: RephraseResponse = await response.json();
    
    // Sapling returns { result: [...] }
    return data.result || [];
  } catch (error) {
    console.error('Sapling API Error:', error);
    throw error;
  }
};
