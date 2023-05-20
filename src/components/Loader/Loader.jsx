import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Loader = () => {
  return (
    <SkeletonTheme
      baseColor="blue"
      highlightColor="yellow"
      height="30px"
      width="100%"
      borderRadius="30px"
    >
      <p>
        <Skeleton count={1} />
      </p>
    </SkeletonTheme>
  );
};
