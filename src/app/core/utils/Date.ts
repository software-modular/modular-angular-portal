export function formatServerDate(date: Date): string {
    return date !== null || date !== undefined ? date?.toISOString() : '';
}

export function stringDateToFormatServerDate(date?: string): string {
    if (date !== undefined) {
        return formatServerDate(new Date(date));
    }
    return "";

}