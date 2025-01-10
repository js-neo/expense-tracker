const generateId = (): string => {
    const timestamp = Date.now().toString(36); // Текущая метка времени
    const randomPart = Math.random().toString(36).slice(2, 11); // Случайная строка
    return `${timestamp}-${randomPart}`; // Объединяем обе части
};

export default generateId;