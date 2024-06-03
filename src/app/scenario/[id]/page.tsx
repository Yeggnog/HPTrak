import {fetchBars, fetchScenario} from '@/app/lib/data';
import ScenarioTray from '@/app/ui/ScenarioTray';

export default async function Page({ params }: { params: { id: string } }) {
    // initial fetch of bar/scenario data
    const id = params.id;
    const [bars, scenario] = await Promise.all([
        fetchBars(id),
        fetchScenario(id)
    ]);

    return (
        <ScenarioTray id={id} scenario={scenario} bars={bars} />
    );
}