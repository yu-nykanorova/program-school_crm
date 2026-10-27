type PaginationItem = number | "dots";

export const getPaginationArray = (currentPage: number, totalPages: number): PaginationItem[] => {
    if (totalPages <= 0) {
        return [];
    }

    currentPage = Math.max(1, Math.min(currentPage, totalPages));

    if (totalPages <= 9) {
        return Array.from({length: totalPages}).map((_,index) => index + 1);
    }

    const leftDots = currentPage >= 5;
    const rightDots = currentPage <= totalPages - 5;

    if (!leftDots && rightDots) {
        const leftPart = Array.from({length: 7}).map((_, index) => index + 1);
        return [...leftPart, "dots", totalPages];
    }

    if (leftDots && !rightDots) {
        const rightPart = Array.from({length: 7}).map((_, index) => totalPages - index).reverse();
        return [1, "dots", ...rightPart];
    }

    if (leftDots && rightDots) {
        const middlePart = [
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2
        ];

        return [1, "dots", ...middlePart, "dots", totalPages]
    }

    return [];
}