import type { Marker } from '../../contexts/MarkersContext';
import { getScreenshotUrl } from '../../utils/api';
import { toTimeAgo } from '../../utils/dates';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import useComments from '../Comment/useComments';
import Loading from '../Loading/Loading';
import { mapFilters } from '../MapFilter/mapFilters';
import styles from './MarkerDetails.module.css';
import Markdown from 'markdown-to-jsx';
import HideMarkerInput from './HideMarkerInput';

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
        <h2>
          {marker.name
            ? `${marker.name} (${filterItem?.title})`
            : filterItem?.title}
        </h2>
      </header>
      <main className={styles.main}>
        <div className={styles.comments}>
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
        </div>
        {loading && <Loading />}
        <AddComment markerId={marker._id} onAdd={refresh} />
      </main>
      <aside className={styles.more}>
        <h4>Actions</h4>
        <HideMarkerInput markerId={marker._id} />
        <h4>Screenshot</h4>
        {marker.screenshotFilename ? (
          <a
            href={
              marker.screenshotFilename &&
              getScreenshotUrl(marker.screenshotFilename)
            }
            target="_blank"
          >
            <img
              className={styles.preview}
              src={
                marker.screenshotFilename
                  ? getScreenshotUrl(marker.screenshotFilename)
                  : '/icon.png'
              }
              alt=""
            />
          </a>
        ) : (
          'No screenshot available'
        )}
        <h4>Details</h4>
        {marker.level && <p>Level {marker.level}</p>}
        {marker.levelRange && <p>Level Range {marker.levelRange.join('-')}</p>}
        {marker.description && <Markdown>{marker.description}</Markdown>}
        {marker.position && <p>[{marker.position.join(', ')}]</p>}
        <small>Added {toTimeAgo(new Date(marker.createdAt))}</small>
      </aside>
    </section>
  );
}

export default MarkerDetails;
