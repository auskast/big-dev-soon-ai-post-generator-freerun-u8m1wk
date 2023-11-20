import { Container } from "@/components/Container";
import { SocialPlatforms } from "@/components/SocialPlatforms";

export default function Home() {
  return (
    <main>
      <Container>
        <h1 className="header1 text-center">Generate your post</h1>
        <SocialPlatforms />
      </Container>
    </main>
  );
}
