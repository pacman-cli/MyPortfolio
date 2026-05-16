# Gallery page design

## Goal
Add a Gallery item in the navbar that links to a new `/gallery` route showing photos from a public Google Drive folder in a grid with infinite scroll.

## Non-goals
- User authentication for Drive
- Uploading or editing photos
- Full-screen lightbox or carousel

## User experience
- Navbar includes `Gallery` on desktop and mobile menus.
- `/gallery` displays a responsive grid of images.
- Images show skeleton placeholders while loading.
- Clicking an image opens it in a new tab.
- Infinite scroll loads more images automatically.

## Data source
- Public folder ID: `13GV6w5NOoOJ_Mf44ho9082swYTKKMORy`
- Use Google Drive API `files.list` with:
  - `q`: `'<folderId>' in parents and mimeType contains 'image/' and trashed=false`
  - `orderBy`: `modifiedTime desc`
  - `pageSize`: 24 (tunable)
  - `pageToken`: for infinite scrolling
  - `fields`: `nextPageToken, files(id, name, modifiedTime, thumbnailLink, webViewLink)`
- API key via `NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY` (public key; do not commit actual value).

## Data flow
1. Gallery page loads and requests the first page from Drive API.
2. Response maps files to gallery items (id, name, modifiedTime, thumbnailUrl, viewUrl).
3. UI renders grid cards with skeletons until each image loads.
4. Intersection observer triggers next page fetch using `nextPageToken`.

## UI components
- `GalleryPage`: page container with header + grid.
- `GalleryGrid`: renders list of items in CSS grid.
- `GalleryCard`: image thumbnail + accessible name.
- `GallerySkeleton`: placeholder blocks for loading state.

## Error handling
- Show friendly error message with retry button on request failure.
- Log failures using `console.error`.
- Empty state message when no images are found.

## Testing
- Unit test for Drive API mapping and pagination token handling.
- Render tests for loading, empty, and error states.
- Manual verification of infinite scroll and link opening.

## Open questions resolved
- Route: `/gallery`
- Sort: newest first
- Click behavior: open in new tab
- Loading: skeleton
- Scroll: infinite
