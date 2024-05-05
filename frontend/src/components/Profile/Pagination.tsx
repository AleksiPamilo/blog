import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ProfilePaginationProps {
    totalComments: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function ProfilePagination({ totalComments, currentPage, onPageChange }: ProfilePaginationProps) {
    const limit = 5;
    const totalPages = Math.ceil(totalComments / limit);

    const handleNext = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            onPageChange(nextPage);
        }
    };

    const handlePrevious = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            onPageChange(prevPage);
        }
    };

    const renderPaginationItems = () => {
        const paginationItems = [];

        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => onPageChange(i)} isActive={currentPage === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return paginationItems;
    };

    return (
        <Pagination>
            <PaginationContent className="hover:cursor-pointer">
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrevious} />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                    <PaginationNext onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}