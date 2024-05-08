interface ThreadSkeletonProps {
  count?: number;
}

function ThreadSkeleton({ count = 6 }: ThreadSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="card max-w-full">
          <div className="card-body gap-y-1">
            <div className="flex gap-x-2">
              <div className="skeleton h-10 w-10 rounded-full"></div>
              <div>
                <div className="skeleton h-5 w-16 rounded-md"></div>
                <div className="skeleton h-3 w-10 rounded-md mt-2"></div>
              </div>
            </div>

            <div className="skeleton h-6 mt-4 rounded-md"></div>
            <div className="skeleton h-4 mt-1 rounded-md"></div>

            <div className="skeleton h-5 w-16 mt-3 rounded-xl"></div>

            <div className="flex gap-x-3 mt-4">
              <div className="flex gap-x-1">
                <div className="skeleton h-4 w-5 rounded-md"></div>
                <div className="skeleton h-4 w-5 rounded-md"></div>
              </div>
              <div className="flex gap-x-1">
                <div className="skeleton h-4 w-5 rounded-md"></div>
                <div className="skeleton h-4 w-5 rounded-md"></div>
              </div>
              <div className="flex gap-x-1 ms-auto">
                <div className="skeleton h-4 w-5 rounded-md"></div>
                <div className="skeleton h-4 w-5 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThreadSkeleton;
