import { User2 } from 'lucide-react'
import { FormPopover } from '../form/form-popover'

type Props = {}

const JobList = (props: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Jobs
      </div>
      <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
          >
            <p className="text-sm">Create new job</p>
            <span className="text-xs">5 remaining</span>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

export default JobList
