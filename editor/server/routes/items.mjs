import { handleGetData, handleSaveData } from './data.mjs';

export async function handleGetItems(response) {
  await handleGetData('items', response);
}

export async function handleSaveItems(request, response) {
  await handleSaveData('items', request, response);
}
