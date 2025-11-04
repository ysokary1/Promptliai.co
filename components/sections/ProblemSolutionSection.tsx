import { CheckCircle } from "lucide-react"

interface ProblemSolutionSectionProps {
  problemTitle?: string
  problems?: string[]
  solutionTitle?: string
  solutions?: string[]
}

export function ProblemSolutionSection({
  problemTitle = "Still Managing Everything Manually?",
  problems = [],
  solutionTitle = "We Build AI Solutions That Work",
  solutions = [],
}: ProblemSolutionSectionProps) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problems */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{problemTitle}</h2>
            <div className="space-y-4 text-gray-300">
              {problems.map((problem, index) => (
                <p key={index} className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  {problem}
                </p>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{solutionTitle}</h3>
            <div className="space-y-4 text-gray-300">
              {solutions.map((solution, index) => (
                <p key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  {solution}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
