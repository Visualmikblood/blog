const STORAGE_KEY = 'mis-posts';

export function loadPosts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('Error: espacio en localStorage lleno. No se pudo guardar.');
      // Aquí podrías implementar alguna acción: limpiar localStorage, notificar al usuario, etc.
    } else {
      throw e;
    }
  }
}