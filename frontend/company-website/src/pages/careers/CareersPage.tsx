import { Listing } from '../../components/shared/Listing'
export function CareersPage({ navigate }: { navigate: (path: string) => void }) { return <Listing endpoint="careers" navigate={navigate} title={<>Come build<br /><i>with us.</i></>} intro="We look for curious people who care about the details and the bigger picture." empty="There are no open roles at the moment." /> }
