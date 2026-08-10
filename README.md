# \# 🇳🇵 Nepali Chiya Pasal

# 

# > A minimal, illustrated Nepali music player inspired by the atmosphere of a traditional \*\*chiya pasal\*\* (tea shop).

# 

# Nepali Chiya Pasal is a small, atmospheric web music player where visitors can listen to Nepali music through an illustrated old-fashioned radio interface.

# 

# The public experience is intentionally simple: \*\*play, pause, previous, and next\*\* — nothing unnecessary.

# 

# The owner has access to a private `/admin` dashboard for managing the music library, including uploading, editing, deleting, and reordering songs.

# 

# \---

# 

# \## ✨ Features

# 

# \### 🎵 Public Music Player

# 

# \- Minimal radio-inspired music player

# \- Nepali chiya pasal visual environment

# \- Play / pause controls

# \- Previous / next track controls

# \- Click-to-seek progress bar

# \- Current song title and artist

# \- Automatic playback of the next track

# \- Spacebar shortcut for play / pause

# \- No public search

# \- No public registration

# \- Responsive full-screen experience

# \- Nepal Standard Time (NPT) clock

# \- Spotify and YouTube Music playlist links

# 

# \### 🔐 Private Admin Dashboard

# 

# The owner can manage the entire music library from:

# 

# ```text

# /admin

# ````

# 

# Features include:

# 

# \* Secure admin login

# \* Upload songs

# \* Upload optional artwork

# \* Edit song information

# \* Delete songs

# \* Reorder songs

# \* View the current music library

# 

# There is intentionally \*\*no public sign-up page\*\*.

# 

# \### ☁️ Supabase Backend

# 

# Supabase provides:

# 

# \* PostgreSQL database

# \* Authentication

# \* Audio file storage

# \* Artwork storage

# \* Row Level Security (RLS)

# 

# The public website can read the song library, while write operations require an authenticated Supabase session.

# 

# \---

# 

# \# 🛠️ Tech Stack

# 

# | Technology       | Purpose                   |

# | ---------------- | ------------------------- |

# | Next.js 14       | Frontend framework        |

# | TypeScript       | Type safety               |

# | Tailwind CSS     | Styling                   |

# | Supabase         | Backend platform          |

# | PostgreSQL       | Song metadata database    |

# | Supabase Auth    | Admin authentication      |

# | Supabase Storage | Audio and artwork storage |

# | Vercel           | Deployment                |

# 

# \---

# 

# \# 📁 Project Structure

# 

# ```text

# .

# ├── public/

# │   └── images/

# │       └── chiya-pasal.png

# │

# ├── src/

# │   ├── app/

# │   │   ├── admin/

# │   │   │   ├── login/

# │   │   │   └── ...

# │   │   │

# │   │   ├── page.tsx

# │   │   └── ...

# │   │

# │   ├── components/

# │   │   ├── ChiyaPasalScene.tsx

# │   │   ├── Player.tsx

# │   │   └── ...

# │   │

# │   ├── lib/

# │   │   ├── supabase/

# │   │   └── types.ts

# │   │

# │   └── middleware.ts

# │

# ├── supabase/

# │   └── schema.sql

# │

# ├── .env.local

# ├── package.json

# └── README.md

# ```

# 

# \---

# 

# \# 🚀 Getting Started

# 

# \## 1. Clone the repository

# 

# ```bash

# git clone https://github.com/YOUR\_USERNAME/nepali-chiya-pasal.git

# cd nepali-chiya-pasal

# ```

# 

# \## 2. Install dependencies

# 

# ```bash

# npm install

# ```

# 

# \---

# 

# \# 🗄️ Supabase Setup

# 

# \## 3. Create a Supabase project

# 

# Create a project at:

# 

# \[https://supabase.com/](https://supabase.com/)

# 

# The free tier is sufficient for getting started with a small audience.

# 

# \---

# 

# \## 4. Create the database

# 

# Open your Supabase project and go to:

# 

# \*\*SQL Editor → New query\*\*

# 

# Copy the contents of:

# 

# ```text

# supabase/schema.sql

# ```

# 

# Paste it into the SQL editor and run it.

# 

# This creates:

# 

# \* `songs` table

# \* Row Level Security policies

# \* `audio` storage bucket

# \* `artwork` storage bucket

# \* Storage access policies

# 

# \---

# 

# \# 🔐 Create the Admin Account

# 

# In your Supabase dashboard, go to:

# 

# \*\*Authentication → Users → Add user\*\*

# 

# Create your administrator account using an email and password.

# 

# Example:

# 

# ```text

# Email: you@example.com

# Password: \*\*\*\*\*\*\*\*

# ```

# 

# This account is used to access:

# 

# ```text

# /admin

# ```

# 

# There is intentionally \*\*no public registration system\*\*.

# 

# \---

# 

# \# 🔑 Environment Variables

# 

# Create a `.env.local` file in the root of the project:

# 

# ```env

# NEXT\_PUBLIC\_SUPABASE\_URL=https://YOUR\_PROJECT.supabase.co

# NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=YOUR\_PUBLIC\_ANON\_KEY

# ```

# 

# You can find these values in:

# 

# \*\*Supabase → Project Settings → API\*\*

# 

# \### Important

# 

# Never expose your Supabase \*\*service-role key\*\* in client-side code.

# 

# The application uses the public anon key together with Supabase Row Level Security to protect database and storage operations.

# 

# \---

# 

# \# 💻 Run Locally

# 

# Start the development server:

# 

# ```bash

# npm run dev

# ```

# 

# The public website will be available at:

# 

# ```text

# http://localhost:3000

# ```

# 

# The admin dashboard is available at:

# 

# ```text

# http://localhost:3000/admin

# ```

# 

# Unauthenticated visitors are redirected to:

# 

# ```text

# /admin/login

# ```

# 

# \---

# 

# \# 🎶 Uploading Music

# 

# After logging into the admin dashboard, you can upload music directly from the website.

# 

# The upload flow is:

# 

# ```text

# Admin Dashboard

# &#x20;      │

# &#x20;      ▼

# &#x20;  Upload MP3

# &#x20;      │

# &#x20;      ▼

# Supabase Storage

# &#x20;      │

# &#x20;      ├── audio/

# &#x20;      │

# &#x20;      └── artwork/

# &#x20;      │

# &#x20;      ▼

# &#x20; songs database

# &#x20;      │

# &#x20;      ▼

# &#x20;Public Music Player

# ```

# 

# The public player automatically reads the available songs from Supabase.

# 

# You do \*\*not\*\* need to redeploy the website every time you add a song.

# 

# \---

# 

# \# 🔒 Security Model

# 

# The public website uses the Supabase public/anon key.

# 

# This key is safe to expose in browser code because database permissions are enforced using \*\*Row Level Security (RLS)\*\*.

# 

# \### Public visitors can:

# 

# \* Read the song list

# \* Stream public audio

# \* View public artwork

# 

# \### Authenticated users can:

# 

# \* Add songs

# \* Edit songs

# \* Delete songs

# \* Reorder songs

# \* Upload audio

# \* Replace audio

# \* Delete audio

# \* Upload artwork

# \* Replace artwork

# \* Delete artwork

# 

# The application does not provide a public registration form and is intended to use a single administrator account.

# 

# \---

# 

# \# 🗃️ Database

# 

# The primary table is:

# 

# ```text

# songs

# ```

# 

# with the following fields:

# 

# | Field         | Type      | Description             |

# | ------------- | --------- | ----------------------- |

# | `id`          | UUID      | Unique song identifier  |

# | `title`       | text      | Song title              |

# | `artist`      | text      | Artist name             |

# | `audio\_url`   | text      | Public audio URL        |

# | `artwork\_url` | text      | Optional artwork URL    |

# | `sort\_order`  | integer   | Playback/order position |

# | `created\_at`  | timestamp | Creation time           |

# 

# Songs are returned according to:

# 

# ```sql

# ORDER BY sort\_order ASC

# ```

# 

# \---

# 

# \# 📦 Storage

# 

# Supabase Storage contains two public-read buckets:

# 

# ```text

# audio/

# artwork/

# ```

# 

# \### Audio

# 

# Audio uploads are limited to:

# 

# ```text

# 25 MB

# ```

# 

# \### Artwork

# 

# Artwork uploads are limited to:

# 

# ```text

# 5 MB

# ```

# 

# Files are uploaded directly to Supabase Storage from the authenticated admin dashboard.

# 

# \---

# 

# \# 🌐 Deployment

# 

# The recommended deployment platform is \[Vercel](https://vercel.com/).

# 

# \## 1. Push the project to GitHub

# 

# ```bash

# git add .

# git commit -m "Initial Nepali Chiya Pasal setup"

# git push

# ```

# 

# \## 2. Import the repository into Vercel

# 

# Create a new Vercel project and import the GitHub repository.

# 

# \## 3. Add environment variables

# 

# In your Vercel project settings, add:

# 

# ```text

# NEXT\_PUBLIC\_SUPABASE\_URL

# NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY

# ```

# 

# Use the same values from your local `.env.local`.

# 

# \## 4. Deploy

# 

# Vercel will build and deploy the Next.js application.

# 

# After deployment:

# 

# ```text

# https://your-project.vercel.app

# ```

# 

# Your admin dashboard will be:

# 

# ```text

# https://your-project.vercel.app/admin

# ```

# 

# Supabase remains responsible for:

# 

# \* Database

# \* Authentication

# \* Audio storage

# \* Artwork storage

# 

# Vercel hosts the Next.js application.

# 

# \---

# 

# \# 🧩 Architecture

# 

# ```text

# &#x20;                   ┌──────────────────┐

# &#x20;                   │     Visitor      │

# &#x20;                   └────────┬─────────┘

# &#x20;                            │

# &#x20;                            ▼

# &#x20;                   ┌──────────────────┐

# &#x20;                   │    Next.js App   │

# &#x20;                   │                  │

# &#x20;                   │ Public Player    │

# &#x20;                   │ Admin Dashboard  │

# &#x20;                   └────────┬─────────┘

# &#x20;                            │

# &#x20;                            ▼

# &#x20;                   ┌──────────────────┐

# &#x20;                   │     Supabase     │

# &#x20;                   ├──────────────────┤

# &#x20;                   │ PostgreSQL       │

# &#x20;                   │ Authentication   │

# &#x20;                   │ Storage          │

# &#x20;                   │ RLS              │

# &#x20;                   └──────────────────┘

# ```

# 

# \---

# 

# \# 🎨 Public Experience

# 

# The public page intentionally keeps the interface minimal.

# 

# The main visual focus is an illustrated Nepali tea shop with an old radio.

# 

# The player provides only the essential controls:

# 

# ```text

# Previous    Play/Pause    Next

# ```

# 

# Along with:

# 

# \* Song title

# \* Artist

# \* Progress

# \* Current playback time

# \* Total duration

# 

# The goal is to make the site feel more like \*\*sitting inside a quiet Nepali chiya pasal listening to the radio\*\*, rather than using a traditional streaming-service interface.

# 

# \---

# 

# \# 🖼️ Artwork

# 

# Artwork support is already implemented on the backend.

# 

# Artwork can be uploaded and stored with each song.

# 

# Currently, artwork is \*\*not displayed in the public player\*\* because the radio remains the primary visual focus.

# 

# The `artwork\_url` field is retained so artwork can easily be added to the interface later.

# 

# \---

# 

# \# 🔀 Song Reordering

# 

# Songs currently use a numeric:

# 

# ```text

# sort\_order

# ```

# 

# field.

# 

# The admin dashboard provides simple up/down controls for changing the playback order.

# 

# The system can later be extended to support drag-and-drop reordering without changing the basic database architecture.

# 

# \---

# 

# \# 🧪 Standalone Demo

# 

# The project also includes a standalone:

# 

# ```text

# nepali-chiya-pasal.html

# ```

# 

# demo.

# 

# The standalone demo:

# 

# \* Has no backend

# \* Uses placeholder tracks

# \* Can be opened independently

# \* Demonstrates the visual/public experience

# 

# The main Next.js application is the \*\*production version\*\* with Supabase authentication, database, storage, and admin functionality.

# 

# \---

# 

# \# 📋 Current Limitations

# 

# \* Audio uploads are limited to 25 MB.

# \* Artwork uploads are limited to 5 MB.

# \* Reordering currently uses up/down controls.

# \* Artwork is stored but not currently displayed publicly.

# \* There is no public search.

# \* There is no public registration.

# \* The public player intentionally remains minimal.

# \* Database write access is granted to authenticated Supabase users according to the configured RLS policies.

# 

# \---

# 

# \# 🔮 Possible Future Improvements

# 

# Potential future additions include:

# 

# \* Drag-and-drop song ordering

# \* Animated radio controls

# \* Visual audio spectrum

# \* More detailed song metadata

# \* Displaying artwork

# \* Multiple playlists

# \* Recently added songs

# \* Listening statistics

# \* Admin activity logs

# \* Better mobile controls

# \* Progressive audio loading

# \* PWA/offline enhancements

# 

# \---

# 

# \# ⚠️ Security Notes

# 

# Do not commit `.env.local` to Git.

# 

# Make sure your `.gitignore` contains:

# 

# ```gitignore

# .env

# .env.local

# .env.\*.local

# ```

# 

# Never put a Supabase service-role key into:

# 

# \* React components

# \* Client-side JavaScript

# \* Public files

# \* GitHub

# \* Browser-exposed environment variables

# 

# The service-role key has elevated privileges and should remain server-side only.

# 

# \---

# 

# \# 📜 License

# 

# This project is intended for personal use and experimentation.

# 

# If you plan to publicly distribute music, make sure you have the necessary rights or permissions to host and stream the audio files.

# 

# \---

# 

# \## 🇳🇵 Nepali Chiya Pasal

# 

# \*\*Simple music.

# A quiet radio.

# A little taste of a Nepali chiya pasal.\*\*

# 

# ```

# ```



