import { EventDataInterface } from "../../data/events"

interface Props {
  events: EventDataInterface[]
}

function FilteredDisplay({events} : Props): JSX.Element {
  return (
    <div className="filtered-display">FilteredDisplay</div>
  )
}

export default FilteredDisplay