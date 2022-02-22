let storageServiceContainer;

class StorageService {
    store = (key, value) => {
        localStorage[key] = JSON.stringify(value);
    };

    load = (key) => {
        const requestedKey = localStorage[key] || null;
        return JSON.parse(requestedKey);
    };

    remove = (key) => {
        localStorage.removeItem(key);
    };
}

/** @returns {StorageService} */
const initStorageService = () => {
    if (!storageServiceContainer) {
        storageServiceContainer = new StorageService();
    }
    return storageServiceContainer;
};

export default initStorageService();
