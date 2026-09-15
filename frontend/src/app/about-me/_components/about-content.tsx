const sections = [
  {
    title: 'Who is MD Ashikur Rahman Puspo?',
    content: [
      'I am MD Ashikur Rahman Puspo, a Software Engineer and Backend Developer based in Dhaka, Bangladesh. Currently completing my degree in Computer Science & Engineering at United International University, I specialize in architecting resilient server-side architectures, clean APIs, and distributed microservices.',
      'My engineering journey focuses on lower-level system internals, concurrency mechanics, database schema design, and maintaining clean architectural boundaries.',
    ],
  },
  {
    title: 'Engineering Specialization',
    content: [
      'As a Spring Boot developer, I design production-ready microservices, secure endpoints, optimize JPA/Hibernate query execution, and implement CI/CD containerization using Docker.',
      'My work emphasizes Domain-Driven Design (DDD), robust error handling, automated testing, and predictable system scalability.',
    ],
  },
  {
    title: 'Core Disciplines',
    list: [
      'Backend Engineering: RESTful APIs, Spring Boot microservices, security protocols.',
      'Database Architecture: Query tuning and schema optimization for PostgreSQL and MySQL.',
      'Containerization & Cloud: Application packaging with Docker and deployment pipelines.',
      'System Architecture: Concurrency controls, fault tolerance, and performant data processing.',
    ],
  },
]

export const AboutContent = () => {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <div
          key={section.title}
          className="p-6 rounded-lg border border-border bg-card/50 flex flex-col gap-3"
        >
          <h2 className="text-base font-semibold text-foreground tracking-tight">{section.title}</h2>
          {section.content?.map((p, j) => (
            <p key={j} className="text-xs text-muted-foreground leading-relaxed">{p}</p>
          ))}
          {section.list && (
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
              {section.list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
