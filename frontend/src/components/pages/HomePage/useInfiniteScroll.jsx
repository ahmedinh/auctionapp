import { useEffect, useRef } from 'react';

const useInfiniteScroll = (setPage, hasMore) => {
    const observer = useRef();
    const lastProductElementRef = useRef(null);

    useEffect(() => {
        if (!hasMore) return undefined;

        const observerInstance = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1.0 });

        if (lastProductElementRef.current) {
            observerInstance.observe(lastProductElementRef.current);
        }

        return () => observerInstance.disconnect();
    }, [hasMore, setPage]);

    return lastProductElementRef;
};

export default useInfiniteScroll;