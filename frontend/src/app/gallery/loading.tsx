export default function GalleryLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-6xl pt-28 pb-20">
        <div className="mb-16">
          <div className="h-12 w-48 bg-muted rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-96 bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
