import { Job } from '@prisma/client'

import JobOptions from './Options'
import JobTitleForm from './JobTitleForm'

interface NavbarProps {
  data: Job
}

export const Navbar = async ({ data }: NavbarProps) => {
  return (
    <div className=" fixed  flex h-14 w-full items-center bg-green-200">
      <div className="container mx-auto flex">
        <JobTitleForm data={data} />
        <div className="ml-auto">
          <JobOptions id={data.id} />
        </div>
      </div>
    </div>
  )
}
