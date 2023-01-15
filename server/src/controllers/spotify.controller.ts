import axios from 'axios';
import { Request, Response } from 'express';
import qs from 'qs';
import { encrypt } from '../lib/encrypt';
import DailySong from '../models/daily.model';

export let ACCESS_TOKEN: string;

export const loginSpotify = async () => {
  const headers = {
    Authorization:
      'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
    Accept: 'application/json',
  };

  const body = {
    grant_type: 'client_credentials',
  };

  const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(body), {
    headers: headers,
  });

  ACCESS_TOKEN = response.data.access_token;
};

export const getDailySong = async (req: Request, res: Response) => {
  const PLAYLIST_ID = '37i9dQZEVXbLRQDuF5jeBp';
  const PLAYLIST_URL = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=50`;
  const CURR_DATE = new Date().toISOString().slice(0, 10);

  // login to spotify
  await loginSpotify();

  // check if daily song is already in db
  try {
    const song = await DailySong.findOne({ date: CURR_DATE });

    // song for current date doesn't exists
    if (!song) {
      // remove all previous songs that's not today's song
      await DailySong.deleteMany();

      const playlist = await axios.get(PLAYLIST_URL, {
        headers: {
          Authorization: 'Bearer ' + ACCESS_TOKEN,
        },
      });

      const trackData = await fetchTrack(playlist.data.items);

      const re = /\s\(.*|:.*|\sfeat.*|\sft.*/gi;
      const answer = trackData.name.replace(re, '');

      const newDailySong = new DailySong({
        name: trackData.name,
        artists: trackData.artists.map((artist: Artist) => ({
          id: artist.id,
          name: artist.name,
        })),
        album: {
          id: trackData.album.id,
          name: trackData.album.name,
          image: trackData.album.images[0],
          external_url: trackData.album.external_urls.spotify,
        },
        answer: answer,
        song_id: trackData.id,
        url: trackData.preview_url,
        date: CURR_DATE,
      });

      await newDailySong.save();
      return res.status(200).json(encrypt(JSON.stringify(newDailySong)));
    }

    // return today's song if exist
    return res.status(200).json(encrypt(JSON.stringify(song)));
  } catch (e) {
    const message = (e as Error).message;
    console.log(message);
    return res.status(500).json({ message });
  }
};

// --- helper functions --- //
async function fetchTrack(playlist: { track: { href: string } }[]) {
  let haveUrl = false;
  let trackData;

  while (!haveUrl) {
    // select a random song
    const selectedIndex = Math.floor(Math.random() * 50);
    const trackUrl = playlist[selectedIndex].track.href;

    // get track info
    const track = await axios.get(trackUrl, {
      headers: {
        Authorization: 'Bearer ' + ACCESS_TOKEN,
      },
    });
    trackData = track.data;

    if (trackData.preview_url) haveUrl = true;
  }

  return trackData;
}
