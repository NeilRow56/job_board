import JobForm from '@/components/job/JobForm'
import { db } from '@/lib/db'
import Link from 'next/link'

const Todos = async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <div className="flex  flex-col items-center justify-center">
      <h2 className="py-12 text-2xl font-bold">To Do</h2>

      <JobForm />
      <div className="container mx-auto flex w-[800px] flex-col gap-y-4  py-5">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/job/${job.id}`}
            className="flex w-full  rounded-md border border-slate-400 px-12 py-2"
          >
            <div className="" />
            <p className="relative font-semibold text-slate-900">{job.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Todos
