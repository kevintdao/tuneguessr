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
          height={100}
          width={100}
          radius="sm"
          className="mt-1"
        />
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Anchor
            className="text-xl"
            fw={700}
            component={Link}
            href={`https://open.spotify.com/track/${songId}`}
            target="_blank"
          >
            {name}
          </Anchor>
          <Text
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {artists.map((item) => item.name).join(", ")}
          </Text>
          <Text
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {album.name}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};

export default SongDetails;
