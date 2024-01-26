import { Job } from '@prisma/client'

import JobTitleForm from './JobTitleForm'
import { Button } from '../ui/button'
import Link from 'next/link'
import { JobOptions } from './Options'

interface NavbarProps {
  data: Job
}

export const Navbar = async ({ data }: NavbarProps) => {
  return (
    <div className=" fixed  flex h-14 w-full items-center bg-green-200">
      <div className="container mx-auto flex">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>

        <JobTitleForm data={data} />
        <div className="ml-auto">
          <JobOptions id={data.id} />
        </div>
        <Button className="ml-4" asChild>
          <Link href="/job">Create Job</Link>
        </Button>
      </div>
    </div>
  )
}
