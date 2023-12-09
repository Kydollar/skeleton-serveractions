import { format, formatDistanceToNow, getTime } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(
    date: string | number | Date | undefined,
    newFormat?: string
): string {
    const fm = newFormat || 'dd MMM yyyy';

    return date ? format(new Date(date), fm) : '';
}

export function fDateTime(
    date: string | number | Date | undefined,
    newFormat?: string
): string {
    const fm = newFormat || 'EEEE, dd MMM yyyy';

    return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(
    date: string | number | Date | undefined
): number | string {
    return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: string | number | Date | undefined): string {
    return date
        ? formatDistanceToNow(new Date(date), {
              addSuffix: true,
          })
        : '';
}
