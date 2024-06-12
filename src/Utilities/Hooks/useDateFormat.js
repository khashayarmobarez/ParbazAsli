import { useCallback } from 'react';

const useDateFormat = () => {
    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            // Handle invalid date value
            return 'Invalid Date';
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }, []);

    return { formatDate };
};

export default useDateFormat;