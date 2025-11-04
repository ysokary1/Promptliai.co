import { PortableText } from "@portabletext/react"

interface CustomContentSectionProps {
  title?: string
  content: any
  alignment?: "left" | "center" | "right"
}

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl font-bold text-white mb-3">{children}</h4>
    ),
    normal: ({ children }: any) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-white/20 pl-6 py-2 text-gray-400 italic mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-gray-200">{children}</code>
    ),
    link: ({ children, value }: any) => {
      const target = value?.blank ? "_blank" : undefined
      const rel = value?.blank ? "noopener noreferrer" : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {children}
        </a>
      )
    },
  },
}

export function CustomContentSection({
  title,
  content,
  alignment = "left",
}: CustomContentSectionProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const containerClasses = {
    left: "max-w-4xl",
    center: "max-w-4xl mx-auto",
    right: "max-w-4xl ml-auto",
  }

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className={`${containerClasses[alignment]} ${alignmentClasses[alignment]}`}>
          {title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{title}</h2>}
          <div className="prose prose-invert max-w-none">
            <PortableText value={content} components={portableTextComponents} />
          </div>
        </div>
      </div>
    </section>
  )
}
