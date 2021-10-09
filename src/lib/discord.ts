import fetch from 'isomorphic-fetch';
import { mapFilters } from '../app/components/MapFilter/mapFilters';
import type { Marker, Comment, User } from '../types';

function postToDiscord(
  content: string,
  embeds?: { title: string; description: string; image?: string }[]
): Promise<Response> {
  const { DISCORD_WEBHOOK_URL } = process.env;
  if (!DISCORD_WEBHOOK_URL) {
    throw new Error('DISCORD_WEBHOOK_URL is not set');
  }

  return fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'BottyMcBotface',
      content,
      embeds,
    }),
  });
}

export async function sendToDiscord({
  marker,
  comment,
  user,
}: {
  marker?: Marker;
  comment?: Comment;
  user?: User;
}): Promise<void> {
  if (comment && marker) {
    postToDiscord(`${comment.username} added a comment ✍`, [
      {
        title: 'Message',
        description: comment.message,
      },
      {
        title: 'Marker Name',
        description: marker.name || '',
      },
      {
        title: 'Marker Position',
        description: marker.position ? marker.position.join(', ') : '',
      },
    ]);
    return;
  }

  if (marker) {
    const { VITE_API_ENDPOINT } = process.env;
    if (!VITE_API_ENDPOINT) {
      throw new Error('VITE_API_ENDPOINT is not set');
    }

    const mapFilter = mapFilters.find((filter) => filter.type === marker.type);
    if (!mapFilter) {
      console.error(`Unknown type ${marker.type}`);
      return;
    }
    postToDiscord(`${mapFilter.title} was added 📌`, [
      {
        title: 'Position',
        description: marker.position ? marker.position.join(', ') : '',
      },
      {
        title: 'Name',
        description: marker.name || '',
      },
      {
        title: 'Description',
        description: marker.description || '',
      },
      {
        title: 'Screenshot',
        description: marker.description || '',
        image: marker.screenshotFilename
          ? `${VITE_API_ENDPOINT}/screenshots/${marker.screenshotFilename}`
          : '',
      },
    ]);
    return;
  }
  if (user) {
    postToDiscord(`${user.username} is using Aeternum Map 🤘`);
    return;
  }
}
