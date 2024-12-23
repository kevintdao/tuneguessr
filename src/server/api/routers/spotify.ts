import { TRPCError } from "@trpc/server";
import axios from "axios";
import qs from "qs";
import { z } from "zod";

import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { encrypt } from "~/utils/encryption";

const PLAYLIST_IDS = {
  pop: "37i9dQZF1DXcBWIGoYBM5M",
  kpop: "37i9dQZF1DX9tPFwDMOaN1",
  dance: "37i9dQZF1DX4dyzvuaRJ0n",
  "80s": "37i9dQZF1DX4UtSsGT1Sbe",
  "90s": "37i9dQZF1DXbTxeAdrVG2l",
  "2000s": "1udqwx26htiKljZx4HwVxs",
  "2010s": "6sLKqrUF3TEfcMkcS6P3gu",
};
const CURR_DATE = new Date().toISOString().slice(0, 10);

export const spotifyRouter = createTRPCRouter({
  getDailySong: publicProcedure
    .input(
      z.object({
        genre: z.enum(["pop", "kpop", "80s", "90s", "2000s", "2010s"]),
      })
    )
    .query(async ({ ctx, input }) => {
      // get genre
      const { genre } = input;

      // get token
      const token = await loginSpotify();

      // get playlist
      const PLAYLIST_URL = `https://api.spotify.com/v1/playlists/${PLAYLIST_IDS[genre]}/tracks?limit=50`;

      // check if daily song is already in db
      try {
        const song = await ctx.prisma.dailySong.findFirst({
          where: {
            date: CURR_DATE,
            genre,
          },
        });

        // song for current date doesn't exists
        if (!song) {
          // remove all previous songs that's not today's song
          await ctx.prisma.dailySong.deleteMany({
            where: {
              date: {
                not: CURR_DATE,
              },
              genre,
            },
          });

          // get playlist
          const playlist: PlaylistResponse = await axios.get(PLAYLIST_URL, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          const trackData = await fetchTrack(playlist.data.items, token);

          const re = /\s\(.*|\sfeat.*|\sft.*/gi;
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
              genre,
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
