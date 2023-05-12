import { TRPCError } from "@trpc/server";
import axios from "axios";
import qs from "qs";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { encrypt } from "~/utils/encryption";

const PLAYLIST_ID = "37i9dQZF1DXcBWIGoYBM5M";
const PLAYLIST_URL = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=50`;
const CURR_DATE = new Date().toISOString().slice(0, 10);

export const spotifyRouter = createTRPCRouter({
  getDailySong: publicProcedure.query(async ({ ctx }) => {
    const token = await loginSpotify();

    // check if daily song is already in db
    try {
      const song = await ctx.prisma.dailySong.findFirst({
        where: {
          date: CURR_DATE,
        },
      });

      // song for current date doesn't exists
      if (!song) {
        // remove all previous songs that's not today's song
        await ctx.prisma.dailySong.deleteMany({});

        // get playlist
        const playlist: PlaylistResponse = await axios.get(PLAYLIST_URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const trackData = await fetchTrack(playlist.data.items, token);

        const re = /\s\(.*|:.*|\sfeat.*|\sft.*/gi;
        const answer = trackData.name.replace(re, "");

        const newDailySong = await ctx.prisma.dailySong.create({
          data: {
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
            songId: trackData.id,
            url: trackData.preview_url,
            date: CURR_DATE,
          },
        });

        return encrypt(JSON.stringify(newDailySong));
      }

      // song for current date already exists
      return encrypt(JSON.stringify(song));
    } catch (e) {
      const message = (e as Error).message;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message,
      });
    }
  }),
});

// --- helper functions --- //
async function loginSpotify() {
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET
      ).toString("base64"),
    Accept: "application/json",
  };

  const body = {
    grant_type: "client_credentials",
  };

  const response: SpotifyResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify(body),
    {
      headers: headers,
    }
  );

  const result = response.data;

  return result.access_token;
}

async function fetchTrack(playlist: PlaylistData[], token: string) {
  let haveUrl = false;
  let trackData: SongInput | null = null;

  while (!haveUrl) {
    // select a random song
    const selectedIndex = Math.floor(Math.random() * 50);
    const randomTrack = playlist[selectedIndex];
    const trackUrl = randomTrack?.track.href ?? "";

    // get track info
    const track: TrackResponse = await axios.get(trackUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    trackData = track.data;

    if (trackData.preview_url) haveUrl = true;
  }

  return trackData as SongInput;
}
