import { Anchor, Box, Group, Image, Paper, Text } from "@mantine/core";
import Link from "next/link";

const SongDetails = ({ song }: { song: Song }) => {
  const { songId, name, artists, album } = song;

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
          <Anchor
            className="text-xl"
            fw={700}
            component={Link}
            href={`https://open.spotify.com/track/${songId}`}
            target="_blank"
          >
            {name}
          </Anchor>
          <Text>{artists.map((item) => item.name).join(", ")}</Text>
          <Text>{album.name}</Text>
        </Box>
      </Group>
    </Paper>
  );
};

export default SongDetails;
