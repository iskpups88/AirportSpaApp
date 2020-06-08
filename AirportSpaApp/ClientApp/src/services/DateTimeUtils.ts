function apiDateTimeZoneCorrection(date: string): Date {
    return new Date(new Date(date).getTime());
}

export const toLocalDateTime = (value: string) => {
    if (!value)
        return null;

    return apiDateTimeZoneCorrection(value).toLocaleString('ru-RU', { hour12: false });
}

export const toLocalDate = (value: string) => {
    if (!value)
        return null;

    return apiDateTimeZoneCorrection(value).toLocaleDateString('ru-RU');
}

export const toDate = (value: string) => {
    if (!value)
        return null;

    return new Date(value).toLocaleDateString('ru-RU');
}