import { Anchor, Container, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container size="lg">
      <Title order={1}>Page Not Found</Title>
      <p>Looks like you&apos;ve followed a broken link or entered a URL that doesn&apos;t exist on this site.</p>
      <Anchor to="/" component={Link}>
        Take me back to the home page
      </Anchor>
    </Container>
  );
}
