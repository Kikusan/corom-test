import { useCallback, useState } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    message: string;
    type: NotificationType;
}

export const UseNotificationManager = () => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [open, setOpen] = useState(false);

    const notify = useCallback((message: string, type: NotificationType = 'info') => {
        setNotification({ message, type });
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return { notification, open, notify, handleClose };
};
