import { Anchor, Box, Group, Image, Paper, Text } from '@mantine/core';

type Props = {
  song: Song;
};

export default function SongDetail({ song }: Props) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { song_id, name, artists, album } = song;

  return (
    <Paper withBorder p="sm">
      <Group noWrap align="top">
        <Image
          src={album.image.url}
          alt={album.image.url}
          withPlaceholder
          height={140}
          width={140}
          radius="sm"
          className="mt-1"
        />
        <Box>
          <Text className="text-xl" fw={700}>
            {name}
          </Text>
          <Text>
            {artists
              .map((item) => {
                return item.name;
              })
              .join(', ')}
          </Text>
          <Text>{album.name}</Text>
          <Anchor href={`https://open.spotify.com/track/${song_id}`} target="_blank">
            Song Link
          </Anchor>
        </Box>
      </Group>
    </Paper>
  );
}
