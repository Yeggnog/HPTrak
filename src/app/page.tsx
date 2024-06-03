//import Image from "next/image";
import ScenarioList from '@/app/ui/ScenarioList';
import {fetchScenarios} from '@/app/lib/data';

export default async function Page() {
  // fetch test data
  const scenarios = await fetchScenarios();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Modify / Use bars in this section</h1>
      <div className="w-1/2">
        { <ScenarioList scenarios={scenarios}/> }
      </div>
    </main>
  );
}
