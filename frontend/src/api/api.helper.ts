export const errorCatch = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
        const response = (error as { response?: unknown }).response as Record<string, unknown> | undefined;
        const data = response?.data as Record<string, unknown> | undefined;
        const message = data?.message;
        if (message) return Array.isArray(message) ? String((message as unknown[])[0]) : typeof message === 'string' ? message : String(message);
        const msg = (error as { message?: unknown }).message;
        if (typeof msg === 'string') return msg;
    }
    if (typeof error === 'string') return error;
    return 'Unknown error';
}