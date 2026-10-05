import { ArrowUpRight } from "@/components/Icons";
import { favouriteAnime, favouriteGames, favouriteSeries, favouriteSong, favouriteSports } from "@/lib/habits";

// Original line illustrations keep the shelf lightweight without hotlinking artwork.
function ShelfArt({ kind }: { kind: string }) {
  return <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    {kind === "throne" && <><path d="M30 95h60L78 72V40H42v32Z M42 40 35 15l16 16 9-25 9 25 16-16-7 25 M48 48v21h24V48 M35 15v33M85 15v33" /><path d="m30 95 12-23h36l12 23M60 12v25" /></>}
    {kind === "portal" && <><ellipse cx="60" cy="60" rx="31" ry="44" /><ellipse cx="60" cy="60" rx="22" ry="34" /><path d="m16 88 17-16M88 42l16-15M60 15v-9M60 114v-9M20 46l-9-3M100 77l9 3M45 38l8 13-10 14 20-8 9 18 4-33" /></>}
    {kind === "forest" && <><path d="M60 107V32M36 107V19M86 107V13M14 107V50M107 107V44M36 45 21 31M36 62l16-17M60 53 46 39M60 69l15-17M86 41l-13-17M86 62l18-24" /><circle cx="64" cy="19" r="7" /></>}
    {kind === "sail" && <><path d="M59 18v73M54 23 20 73h34ZM65 29v44h35ZM20 81l14 19h48l20-19Z M13 108q12-9 24 0t24 0 24 0 24 0" /><circle cx="94" cy="20" r="8" /></>}
    {kind === "longboat" && <><path d="M60 20v62M36 27h48v44H36ZM36 40h48M36 56h48M12 70l17 23h62l17-23M20 79h80M8 105q13-8 26 0t26 0 26 0 26 0" /><circle cx="42" cy="84" r="5" /><circle cx="60" cy="84" r="5" /><circle cx="78" cy="84" r="5" /><path d="m42 90-8 10M78 90l8 10" /></>}
    {kind === "blade" && <><path d="m30 99 14-15M43 91l-14-14M40 80l47-57 7-3-2 10-45 56ZM52 73l-6-5M25 103l5-4" /><path d="M17 28h26M30 15v26M84 81h20M94 71v20" opacity=".5" /></>}
    {kind === "spiral" && <><path d="M67 55c0-11-18-10-18 2 0 20 32 20 32-1 0-33-50-33-50 0 0 42 63 45 68 4" /><path d="m99 60 7 35-23-9M20 39l-7-9M37 21l-3-10M63 18l3-10" /></>}
    {kind === "wings" && <><path d="m60 95-3-51L29 19l-8 14 14 16-17-8 1 17 22 13-19-5 9 16 29 13ZM60 95l3-51 28-25 8 14-14 16 17-8-1 17-22 13 19-5-9 16-29 13Z M35 36l19 23M27 54l28 19M86 36 66 59M94 54 65 73" /></>}
    {kind === "clover" && <><path d="M60 57C30 26 46 11 59 27c15-16 30 1 1 30ZM63 60c31-30 46-14 30-1 16 15-1 30-30 1ZM60 63c30 31 14 46 1 30-15 16-30-1-1-30ZM57 60C26 90 11 74 27 61c-16-15 1-30 30-1ZM60 63v44" /></>}
  </svg>;
}

function PlayIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 10 6-10 6Z" fill="currentColor" /></svg>;
}

function HobbyIcon({ sport = false }: { sport?: boolean }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {sport ? <><circle cx="16" cy="16" r="12" /><path d="m16 10 6 4-2 7h-8l-2-7ZM16 10V4M22 14l6-2M20 21l4 5M12 21l-4 5M10 14l-6-2" /></> : <><path d="M10 10h12c5 0 8 14 4 16-3 1-5-5-7-5h-6c-2 0-4 6-7 5-4-2-1-16 4-16ZM12 10V6h8" /><path d="M8 16h7M11.5 12.5v7M23 15h.1M20 18h.1" strokeLinecap="round" /></>}
  </svg>;
}

export function Habits() {
  return <section id="habits" className="page-section habits-section" aria-labelledby="habits-title">
    <div className="site-width">
      <header className="habits-heading">
        <p className="habits-eyebrow">My habits &amp; favourites</p>
        <h2 id="habits-title">Off the clock.</h2>
        <p>The song, stories and games I keep coming back to.</p>
      </header>

      <div className="habits-top">
        <article className="favourite-track" aria-labelledby="track-title">
          <div className="track-topline"><span>My favourite song</span><span className="track-note" aria-hidden="true">♫</span></div>
          <div className="record-art" aria-hidden="true"><div className="record-disc"><div className="record-label"><span>Petta</span><i /><span>Anirudh</span></div></div><div className="record-sleeve">Petta<span>Original soundtrack</span></div></div>
          <div className="track-copy"><h3 id="track-title">{favouriteSong.title}</h3><p>{favouriteSong.film} <span>/</span> {favouriteSong.artist}</p></div>
          <div className="track-links">
            <a href={favouriteSong.spotify} target="_blank" rel="noopener noreferrer" aria-label="Listen to Ullaallaa on Spotify"><PlayIcon />Listen on Spotify</a>
            <a href={favouriteSong.youtube} target="_blank" rel="noopener noreferrer" aria-label="Watch the official Ullaallaa video on YouTube">YouTube <ArrowUpRight /></a>
          </div>
        </article>

        <div className="series-watchlist" aria-labelledby="series-title">
          <h3 id="series-title">Favourite series</h3>
          <div>{favouriteSeries.map((series) => <a className={`series-pick series-${series.art}`} key={series.title} href={series.href} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${series.title} on ${series.platform}`}>
            <div className="series-art"><ShelfArt kind={series.art} /></div>
            <div className="series-copy"><span>{series.theme}</span><h4>{series.title}</h4><p>Watch on {series.platform}</p></div>
            <ArrowUpRight />
          </a>)}</div>
        </div>
      </div>

      <div className="anime-collection" aria-labelledby="anime-title">
        <div className="collection-heading"><h3 id="anime-title">Favourite anime</h3><p>Different worlds. Unforgettable stories.</p></div>
        <div className="anime-shelf">{favouriteAnime.map((anime) => <a className={`anime-pick anime-${anime.tone}`} key={anime.title} href={anime.href} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${anime.title} on ${anime.platform}`}>
          <div className="anime-art"><ShelfArt kind={anime.art} /><span className="anime-open"><ArrowUpRight /></span></div>
          <h4>{anime.title}</h4><p className="anime-genre">{anime.genre}</p><p className="anime-platform">Watch on {anime.platform}</p>
        </a>)}</div>
      </div>

      <div className="hobbies-strip">
        <div className="hobbies-group"><HobbyIcon /><div><h3>Favourite games</h3><ul>{favouriteGames.map((game) => <li key={game}>{game}</li>)}</ul></div></div>
        <div className="hobbies-group"><HobbyIcon sport /><div><h3>Favourite sports</h3><ul>{favouriteSports.map((sport) => <li key={sport}>{sport}</li>)}</ul></div></div>
      </div>
      <p className="watch-availability">Links open the official streaming services. Available seasons vary by region and subscription.</p>
    </div>
  </section>;
}
