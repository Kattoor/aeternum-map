import { useCallback, useEffect, useState } from 'react';

export type Comment = {
  _id: string;
  markerId: string;
  createdAt: Date;
  username: string;
  message: string;
};

function useComments(markerId: string): {
  comments: Comment[] | null;
  loading: boolean;
  refresh: () => void;
} {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetch(`/api/markers/${markerId}/comments`)
      .then((response) => response.json())
      .then((comments) =>
        comments.map((comment: Comment) => ({
          ...comment,
          createdAt: new Date(comment.createdAt),
        }))
      )
      .then(setComments)
      .finally(() => setLoading(false));
  }, [markerId]);

  useEffect(() => {
    refresh();
  }, [refresh, markerId]);

  return { comments, loading, refresh };
}

export default useComments;
