import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import '../styles.css';
const CardSkeleton = ({ cards }) => {
    return Array(cards)
      .fill(0)
      .map((_, i) => (
        <div className="card-skeleton" key={i}>
          <div className="right-col">
          <SkeletonTheme baseColor="#ee7752" highlightColor="#23d5ab">
            <Skeleton count={4} style={{ marginBottom: "0.6rem", width: "100%" }} />
            </SkeletonTheme>
          </div>
        </div>
      ));
  };
export default CardSkeleton;
