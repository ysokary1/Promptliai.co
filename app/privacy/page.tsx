import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getLegalPageBySlug } from "@/lib/sanity.queries"
import { PortableText } from "@portabletext/react"

const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-white mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-white mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold text-white mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-white/20 pl-6 py-2 text-gray-400 italic mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono">{children}</code>
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

const fallbackContent = {
  title: "Privacy Policy",
  lastUpdated: "2024-12-01",
  introduction: "We take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.",
  content: [
    {
      _type: "block",
      style: "h2",
      children: [{ _type: "span", text: "Information We Collect" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "We collect information you provide directly to us, such as when you create an account, request our services, or contact us for support.",
        },
      ],
    },
  ],
  contactEmail: "director@promptliai.co",
}

export default async function PrivacyPolicy() {
  let pageData
  try {
    pageData = await getLegalPageBySlug("privacy")
  } catch (error) {
    console.error("Error fetching privacy page:", error)
  }

  const data = pageData || fallbackContent

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">{data.title}</h1>
            <p className="text-gray-400">
              Last updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : "December 2024"}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            {data.introduction && (
              <div className="text-gray-300 mb-8 text-lg">{data.introduction}</div>
            )}
            <div className="space-y-8 text-gray-300">
              <PortableText value={data.content} components={portableTextComponents} />
            </div>
            {data.contactEmail && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href={`mailto:${data.contactEmail}`} className="text-blue-400 hover:text-blue-300">
                    {data.contactEmail}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
