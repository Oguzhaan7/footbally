import { apolloClientServer } from "@/lib/apollo";
import { GET_LEAGUES } from "@/graphql/client/queries/leagueQueries";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedLeagues } from "@/components/home/FeaturedLeagues";

export const dynamic = "force-dynamic";

export default async function Home() {
  const client = apolloClientServer();
  const { data } = await client.query({ query: GET_LEAGUES });

  return (
    <div className="flex flex-col  min-h-screen">
      <HeroSection />
      <FeaturedLeagues leagues={data.leagues} />
    </div>
  );
}
