export function formatDateValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day  = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function parseDateValue(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return null
    }

    const [year, month, day] = value.split('-').map(Number);

    const date = new Date(year, month - 1, day, 12);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }

    return date;
}

export function addDaysToDateValue(value: string, days: number): string {
    const date = parseDateValue(value)

    if (!date) {
        return formatDateValue(new Date())
    }

    date.setDate(date.getDate() + days)

    return formatDateValue(date)
}

export function formatFullDate(value: string): string {
    const date = parseDateValue(value)

    if (!date) {
        return 'Unknown Date'
    }

    return new Intl.DateTimeFormat(undefined , {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(date)
}

export function formatNavigationDate(value: string): string {
    const date = parseDateValue(value)

    if (!date) {
        return 'Unknown Date'
    }

    return new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }).format(date)
}