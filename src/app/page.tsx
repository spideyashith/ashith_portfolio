import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <section id="home" className="h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">
          Welcome to My Portfolio
        </h1>
      </section>
    </main>
  );
}
