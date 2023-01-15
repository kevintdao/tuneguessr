type Song = {
  id: string;
  album: Album;
  artists: [Artist];
  name: string;
  href: string;
  preview_url: string;
  external_urls: {
    spotify: string;
  };
};

type Album = {
  id: string;
  name: string;
  image?: string;
  images: [string];
  external_urls: {
    spotify: string;
  };
};

type Artist = {
  id: string;
  name: string;
};
