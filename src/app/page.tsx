import { Container } from "@/components/Container";
import { GeneratePostForm } from "@/components/GeneratePostForm";

export default function Home() {
  return (
    <main>
      <Container>
        <h1 className="header1 text-center mb-16">Generate your post</h1>
        <GeneratePostForm />
      </Container>
    </main>
  );
}
