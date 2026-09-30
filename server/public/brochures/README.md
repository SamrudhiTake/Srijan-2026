# Event Brochures Directory

Place your official event brochure PDF files in this directory using the filenames specified in `src/data/events.js`:

- `event-1.pdf` -> Event 01 Brochure
- `event-2.pdf` -> Event 02 Brochure
- `event-3.pdf` -> Event 03 Brochure
- `event-4.pdf` -> Event 04 Brochure
- `event-5.pdf` -> Event 05 Brochure

### Activating Brochures in the Website:
Once you have placed a PDF here (for example, `event-1.pdf`), open `src/data/events.js` and set:
```javascript
brochureAvailable: true
```
for that event. The website's "View Brochure" and "Download Brochure" buttons will immediately enable direct viewing and downloading for that event.
