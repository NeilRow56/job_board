import { notFound, redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { Navbar } from '@/components/job/Navbar'

interface JobIdPageProps {
  params: {
    jobId: string
  }
}

const JobIdPage = async ({ params }: JobIdPageProps) => {
  const job = await db.job.findFirst({
    where: {
      id: params.jobId,
    },
  })

  if (!job) {
    notFound()
  }

  return (
    <div className="h-full overflow-x-auto ">
      <Navbar data={job} />
    </div>
  )
}

export default JobIdPage
