// Santos FC: matches since the last loss and the last game (ESPN, all competitions)

const TEAM_ID = '2674';

export type Match = { date: string; opponent: string; home: boolean; score: string; result: 'W' | 'D' | 'L' };

type EspnCompetitor = { homeAway: 'home' | 'away'; team: { id: string; displayName: string }; score?: { value: number } };
type EspnEvent = {
  date: string;
  competitions: { competitors: EspnCompetitor[]; status: { type: { completed: boolean } } }[];
};

/* finished matches, newest first; shootouts count as draws */
async function fetchSeason(season: number): Promise<Match[]> {
  const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/${TEAM_ID}/schedule?season=${season}`);
  if (!res.ok) throw new Error(`ESPN responded ${res.status}`);
  const { events } = (await res.json()) as { events: EspnEvent[] };

  const matches: Match[] = [];
  for (const event of events) {
    const game = event.competitions[0];
    if (!game.status.type.completed) continue;
    const us = game.competitors.find((c) => c.team.id === TEAM_ID)!;
    const them = game.competitors.find((c) => c.team.id !== TEAM_ID)!;
    const [a, b] = [us.score?.value ?? 0, them.score?.value ?? 0];
    matches.push({
      date: event.date,
      opponent: them.team.displayName,
      home: us.homeAway === 'home',
      score: `${a}–${b}`,
      result: a > b ? 'W' : a < b ? 'L' : 'D',
    });
  }
  return matches.sort((x, y) => y.date.localeCompare(x.date));
}

// looks back up to three seasons, in case there's no loss yet this year
async function loadForm() {
  const year = new Date().getFullYear();
  let unbeaten = 0;
  let last: Match | undefined;
  for (let season = year; season > year - 3; season--) {
    const matches = await fetchSeason(season);
    last ??= matches[0];
    for (const m of matches) {
      if (m.result === 'L') return { unbeaten, last: last! };
      unbeaten++;
    }
  }
  return { unbeaten, last: last! };
}

// fetch once per build / visit
let form: ReturnType<typeof loadForm> | undefined;
export const santosForm = () => (form ??= loadForm());

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/Sao_Paulo' });

/** "Sep 19: won 2–1 at Remo" */
export const describe = (m: Match) =>
  `${shortDate(m.date)}: ${{ W: 'won', D: 'drew', L: 'lost' }[m.result]} ${m.score} ${m.home ? 'vs' : 'at'} ${m.opponent}`;
