const CardSkeleton = () => {
    return <>
       <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse w-full overflow-x-hidden">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
    </div>
    </>
  
};
export default CardSkeleton;
  