export const formatDate = (date: string | null): string => {
    if (!date) {
        return "null";
    }

    const toDate = new Date(date);

    if (Number.isNaN(toDate.getTime())) {
        return "null";
    }

    return toDate.toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric"});
};