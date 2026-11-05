# LateLoop

**Train late? See the city. Be back on time.**

Live: **https://lateloop.vercel.app** · mirror: https://shubhammishra0212.github.io/lateloop/

LateLoop turns a train delay into a short, safe local trip. You tell it how late your train is. It plans a loop of nearby sights, food and markets around the station, and works out the return time so you are always back before the train.

---

## The problem

- Every winter, fog delays **50–80 trains a day** in the Ambala railway division, by 30 minutes to more than 10 hours ([The Tribune](https://www.tribuneindia.com/news/haryana/low-visibility-delays-50-trains-in-ambala-div-575687), [The Tribune](https://www.tribuneindia.com/news/haryana/80-trains-delayed-railways-faces-operational-challenges-582256)).
- Thousands of passengers sit on the platform for hours. They don't leave because they are afraid of missing the train and don't know what is nearby or how long it takes.
- Station towns have real heritage, food and markets that most passengers never see, and local businesses miss out on that footfall.

Existing apps only list "places near the station". None of them plans around the delay or promises a safe return time.

## What LateLoop does

| | Feature |
|---|---|
| 🕒 | **Plans around the delay.** You enter how late the train is; LateLoop builds the best loop that fits. |
| 🛡️ | **Safety buffer.** It assumes the train may make up **30%** of its delay and keeps **30 minutes** spare. The rule is shown in plain words. |
| 🗺️ | **Real routes.** A street-level walking or auto route is drawn on the map, with arrive, stay and leave-by times for each stop. |
| 🌙 | **Opening hours.** It only suggests places open at that hour, which matters for late-night fog delays. |
| 🔴 | **Live re-planning.** Press "Train delay changed?" and the trip shrinks or grows from wherever you are. If time runs out, a **HEAD BACK NOW** alert flashes, speaks and vibrates. |
| 📖 | **Local stories.** Every stop has a short story in **English and Hindi**, with read-aloud. |
| ✦ | **Ask LateLoop (AI agent).** Type or speak in plain words, for example "my train is 2 hours late, I want food". The agent sets up and plans the trip itself, then answers questions about hours, distance, veg food, luggage and safety from the station's own data. When an online model is available, it rewrites the answer more naturally. |
| 📤 | **Share plan.** One tap sends the plan to family over WhatsApp. |
| ♿ | **Accessible.** Large tap targets, high contrast, plain language, keyboard support, screen-reader labels, light and dark themes, works on any phone. |

## How the safety rule works

```
earliest train arrival = now + 70% of the delay     (trains can recover time)
back-at-station time   = earliest train arrival − 30 minutes
time to explore        = back-at-station time − now
```

The planner searches every ordering of up to 5 stops. A stop is allowed only if it is open on arrival and the walk or auto back still fits. It keeps the plan with the highest interest score.

## Tech

- **Frontend:** plain HTML, CSS and JavaScript. No build step, no server, no API keys.
- **Map:** Leaflet with OpenStreetMap tiles (grey-scaled).
- **Routing:** OSRM (`routing.openstreetmap.de`). Travel-time matrices were fetched ahead of time, so planning works offline, and the live route line falls back to a dashed line if routing is slow.
- **Places:** OpenStreetMap / Nominatim coordinates, saved in `data/stations.js`.
- **Voice:** Web Speech API for speech-to-text and text-to-speech (`en-IN`, `hi-IN`).
- **AI:** a grounded intent and Q&A agent that runs on the device, plus an optional online LLM (Pollinations).
- **Hosting:** Vercel (production) and GitHub Pages (mirror).
- **Photos:** Wikimedia Commons (Brahma Sarovar, Sheikh Chilli's Tomb).

## Run locally

```bash
git clone https://github.com/shubhammishra0212/lateloop.git
cd lateloop
python3 -m http.server 8080
# open http://localhost:8080
```

## Project structure

```
index.html        UI
styles.css        design system (light and dark)
app.js            planner, map, live trip, AI agent, i18n
data/stations.js  stations, places, travel-time matrices, stories
```

## Impact

- **Passengers:** dead waiting time becomes a short trip, with no fear of missing the train.
- **Local businesses:** dhabas, bazaar shops and heritage sites near stations get visitors who would otherwise never leave the platform.
- **Hidden heritage:** places like the 1857 St. Paul's Church ruins get visitors on every delayed train.
- **Scale:** India has 7,000+ stations. Adding one is just a data entry. Railways or state tourism departments could promote it with a QR poster on platforms.

## Roadmap

- Live train status through NTES / official APIs, so the delay updates automatically.
- More stations: Kurukshetra, Ludhiana, Saharanpur, Delhi.
- Partner offers from local businesses near stations.
- Hours and tips crowdsourced from locals.

---

Built at a 90-minute local tourism hackathon. Map data © OpenStreetMap contributors.
