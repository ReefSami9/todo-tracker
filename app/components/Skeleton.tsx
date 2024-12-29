import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => (
      <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                  <Skeleton height={40} width="50%" className="mb-4" />
                  <Skeleton height={20} width="75%" className="mb-2" />
                  <Skeleton height={20} width="100%" className="mb-2" />
            </div>
            <div className="flex gap-6">
                  <div className="flex-1">
                        <Skeleton height={30} width="60%" className="mb-4" />
                        <Skeleton height={200} width="100%" className="rounded-md" />
                  </div>
                  <div className="flex-1">
                        <Skeleton height={30} width="60%" className="mb-4" />
                        <Skeleton count={5} height={20} width="90%" className="mb-2" />
                  </div>
            </div>
      </div>
);

export default SkeletonLoader;