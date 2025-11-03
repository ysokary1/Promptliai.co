export const metadata = {
  title: 'Sanity Studio - Promptli AI',
  description: 'Content management for Promptli AI website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
