import { Image } from 'expo-image';
import { View } from "./View";

interface ProfilePictureProps {
  uri?: string;
  size?: number;
  variant?: 'square' | 'circle';
  outline?: boolean;
  github?: string;
  username?: string;
}

export function ProfilePicture({ size = 50, variant = 'circle', outline = false, github, username, uri }: ProfilePictureProps) {
  if (!uri) {
    uri = `https://github.com/identicons/${username}.png`
  }
  
  if (github) {
    uri = `https://avatars.githubusercontent.com/${github}`;
  }

  return (
    <Image
      source={{ uri: uri, height: size, width: size }}
      style={{
        borderRadius: variant === 'circle' ? 50 : 0,
        borderWidth: outline ? 2 : 0,
        borderColor: outline ? '#007aff' : 'none',
        backgroundColor: 'black',
        width: size,
        height: size,
      }}
    />
  );
}
