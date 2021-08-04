import styles from './News.module.css';
import { Tweet } from 'react-twitter-widgets';
import { useEffect, useState } from 'react';
import { fetchJSON } from '../../utils/api';

type Tweet = { id: number; sourceId: string };

function News(): JSX.Element {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    fetchJSON<Tweet[]>('/api/tweets').then(setTweets);
  }, []);

  return (
    <div className={styles.container}>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.sourceId}
          options={{ theme: 'dark' }}
        />
      ))}
    </div>
  );
}

export default News;
