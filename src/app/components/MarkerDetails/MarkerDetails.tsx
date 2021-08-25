import type { Marker } from '../../contexts/MarkersContext';
import { getScreenshotUrl } from '../../utils/api';
import { toTimeAgo } from '../../utils/dates';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import useComments from '../Comment/useComments';
import Loading from '../Loading/Loading';
import { mapFilters } from '../MapFilter/mapFilters';
import styles from './MarkerDetails.module.css';

type MarkerDetailsProps = {
  marker: Marker;
};

function MarkerDetails({ marker }: MarkerDetailsProps): JSX.Element {
  const { comments, loading, refresh } = useComments(marker._id);
  const filterItem = mapFilters.find(
    (mapFilter) => mapFilter.type === marker.type
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img src={filterItem?.iconUrl} alt="" width={64} height={64} />
        <h2>{filterItem?.title}</h2>
        <p>[{marker.position.join(', ')}]</p>
      </header>
      <aside className={styles.aside}>
        {marker.screenshotFilename && (
          <a href={getScreenshotUrl(marker.screenshotFilename)} target="_blank">
            Screenshot
          </a>
        )}
        <span>Added {toTimeAgo(new Date(marker.createdAt))}</span>
      </aside>
      <main className={styles.main}>
        {comments?.map((comment) => (
          <Comment
            key={comment._id}
            displayName={comment.displayName}
            avatar={comment.avatar}
            message={comment.message}
            createdAt={comment.createdAt}
          />
        ))}
        {!loading && comments?.length === 0 && (
          <div className={styles.empty}>Be the first to write a comment</div>
        )}
        {loading && <Loading />}
      </main>
      <AddComment markerId={marker._id} onAdd={refresh} />
    </section>
  );
}

export default MarkerDetails;
