# Moony Sunflowers Admin — secure live setup

## What this version does
The admin page is mobile-first and lets a non-coder edit:
- homepage copy and welcome letter
- book cards
- stories/categories/reader text
- magazine issues and viewer URLs
- Google Form URLs
- Instagram / Goodreads / Amazon links
- UPI ID and payee name
- colors and uploaded logo/QR
- SEO fields
- backup/import of settings

It also contains a public-site Firebase reader so a Firestore `site/content` document can become the live source of truth.

## Important security point
Do **not** put the fallback username/password `Authorselene / goodluckfc05` into JavaScript. A browser can reveal it to anyone.

For the requested "only this Google email can log in", use Firebase Authentication with Google and enforce the same email in Firestore/Storage rules:

`dimplewrites07@gmail.com`

The admin UI is intentionally not pretending that a frontend-only password is secure.

## One-time Firebase setup
1. Create a Firebase project.
2. Add a Web App.
3. Enable Authentication → Google.
4. Add your GitHub Pages domain to Authorized Domains.
5. Copy the Web App config into `firebase-config.js`.
6. Create Firestore.
7. Create a document:
   - collection: `site`
   - document: `content`
   - paste the JSON structure from the DEFAULT object in `admin.js` (or save an edited JSON through a small Firebase write implementation).
8. Add rules like:

### Firestore rules
```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /site/{doc} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "dimplewrites07@gmail.com";
    }
  }
}
```

### Storage rules
```text
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /site/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "dimplewrites07@gmail.com";
    }
  }
}
```

## Important limitation
The included editor's local mode is fully usable for designing/editing on one browser, but **localStorage cannot publish changes to everyone**. Firebase is the secure bridge for true live editing from your phone.

Once Firebase Auth + Firestore + Storage are connected, the intended flow is:
`admin.html → Google login → edit → Firestore/Storage → public index.html updates`.

## Your UPI
The public website has already been changed to:
`dimplelokhande@fam`

The exact QR image supplied in the chat is included at:
`assets/upi_scanner_qr.jpeg`

## Before going live
Replace:
- `https://YOUR-DOMAIN.example/`
- Goodreads URL
- Amazon Author URL
- Google Form URLs
- magazine/Heyzine URLs
- real book information
- real logo if different from the one currently used

Update `robots.txt` and `sitemap.xml` with the real domain.
