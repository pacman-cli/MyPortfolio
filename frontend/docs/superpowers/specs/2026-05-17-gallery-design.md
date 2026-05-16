# Gallery Page Design

## Goal
Add a Gallery item in the navbar that links to a new `/gallery` route showing personal photos from a public Google Drive folder in a masonry grid with lightbox viewing.

## Non-goals
- User authentication for Drive
- Uploading or editing photos
- Multiple albums or folder browsing
- Photo captions or comments

## Architecture

```
Google Drive API
    ↓ (API key in query param, server-side only)
/api/gallery (Next.js API route)
    ↓ (JSON response with photo URLs + pagination)
Gallery Page (Client Component)
    ↓ (masonry grid + lightbox)
User's browser
```

- Environment variables: `GOOGLE_DRIVE_API_KEY`, `GOOGLE_DRIVE_FOLDER_ID`
- API key stays server-side — never exposed to client
- Client fetches from `/api/gallery` with pagination params
- Images served directly from `drive.google.com` (already in `next.config.ts` remote patterns)

## Data source
- Public folder ID: provided by user (env var `GOOGLE_DRIVE_FOLDER_ID`)
- Google Drive API `files.list` with:
  - `q`: `'<folderId>' in parents and mimeType contains 'image/' and trashed=false`
  - `orderBy`: `modifiedTime desc`
  - `pageSize`: 20
  - `pageToken`: for pagination
  - `fields`: `nextPageToken, files(id, name, mimeType, size, createdTime, imageMediaMetadata)`
- API key via `GOOGLE_DRIVE_API_KEY` (server-side only, never committed)

## Data model

```ts
interface GalleryPhoto {
  id: string
  name: string
  url: string          // drive thumbnail/preview URL
  width: number
  height: number
  createdTime: string
}

interface GalleryResponse {
  photos: GalleryPhoto[]
  nextPageToken: string | null
}
```

## API route

`GET /api/gallery?pageToken=<token>&limit=20`

Returns `GalleryResponse`. Client uses `nextPageToken` for "load more".

## User experience
- Navbar includes `Gallery` link on desktop and mobile menus
- `/gallery` displays a responsive masonry grid of images
- Masonry via CSS `columns-2 md:columns-3 lg:columns-4` with `break-inside-avoid`
- Skeleton placeholders while loading (6-8 pulsing rectangles)
- "Load more" button at bottom of grid (not infinite scroll — better for 20-50 photos)
- Clicking a photo opens a full-screen lightbox with prev/next navigation
- Lightbox supports keyboard: Esc to close, arrow keys to navigate
- Empty state: "No photos yet" message
- Error state: "Failed to load photos" with retry button

## Components

| File | Type | Purpose |
|------|------|---------|
| `src/app/gallery/page.tsx` | Page | Shell, metadata, mounts `GalleryGrid` |
| `src/components/gallery/gallery-grid.tsx` | Client | Fetches `/api/gallery`, masonry layout, load-more |
| `src/components/gallery/photo-card.tsx` | Client | Individual photo tile, click opens lightbox |
| `src/components/gallery/lightbox.tsx` | Client | Full-screen overlay, prev/next, keyboard nav |
| `src/app/api/gallery/route.ts` | API | Proxies Google Drive API |

## Lightbox
- Custom implementation (no dependency)
- Framer Motion for enter/exit transitions
- Controlled by `selectedIndex` state, `null` = closed
- Backdrop click or Esc to close
- Left/right arrow buttons + keyboard support
- Photo counter: "3 / 20"
- Uses `next/image` with `fill` for responsive sizing

## Navbar integration
- Add `{ name: 'Gallery', href: '/gallery', id: null }` to `NAV_LINKS`
- `id: null` because it's a route, not a homepage section
- Active state: `pathname === '/gallery'`
- Add to `SITE_NAVIGATION` in `site.ts`

## Loading states
- **Initial load:** Skeleton grid (6-8 gray pulsing rectangles)
- **Load more:** Button with spinner at bottom
- **Empty:** "No photos yet" message
- **Error:** "Failed to load photos" with retry button

## SEO
- `constructMetadata()` for title/description
- No JSON-LD needed
- OG image: first photo in the folder

## Testing
- Unit test for Drive API response mapping and pagination token handling
- Render tests for loading, empty, and error states
- Manual verification of lightbox navigation and keyboard support
