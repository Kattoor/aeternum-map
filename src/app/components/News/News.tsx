import styles from './News.module.css';
import { Tweet } from 'react-twitter-widgets';
import { useEffect, useState } from 'react';

function News(): JSX.Element {
  const [tweets, setTweets] = useState<{ id: number; sourceId: string }[]>([]);

  useEffect(() => {
    fetch('/api/tweets')
      .then((response) => response.json())
      .then(setTweets);
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
