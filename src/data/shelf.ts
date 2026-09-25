// quotes verbatim; no song lyrics
export type Book = { title: string; author: string; color: string; quote?: string };

export const books: Book[] = [
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    color: '#3d6bac',
    quote: 'Primroses and landscapes, he pointed out, have one grave defect: they are gratuitous. A love of nature keeps no factories busy.',
  },
  {
    title: 'Tuesdays with Morrie',
    author: 'Mitch Albom',
    color: '#b5452f',
    quote: 'I give myself a good cry if I need it. But then I concentrate on the good things still in my life.',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    color: '#079f3b',
    quote: 'You could never convince a monkey to give you a banana by promising him limitless bananas after death in monkey heaven.',
  },
  {
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    color: '#c2750a',
    quote: 'People are usually afraid of change because they fear the unknown. But the single greatest constant of history is that everything changes.'
  },
  {
    title: 'A Brief History of Time',
    author: "Stephen Hawking",
    color: '#5b4da8',
    quote: 'The universe doesn\'t allow perfection.'
  },
  {
    title: '1984',
    author: "George Orwell",
    color: '#c9a227',
    quote: 'Perhaps one did not want to be loved so much as to be understood.'
  },
];

export const movies = [
  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: 2014,
    quote: 'Time is relative, okay? It can stretch and it can squeeze, but... it can\'t run backwards. It just can\'t.',
  },
  {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    year: 1994,
    quote: 'Hope is a good thing, maybe the best of things, and no good thing ever dies.',
  },
  {
    title: 'Star Wars: Return of the Jedi',
    director: 'Richard Marquand',
    year: 1983,
    quote: 'Many of the truths we cling to depend greatly on our own point of view.',
  },
];

// `audio` = previewUrl, `link` = trackViewUrl (itunes.apple.com/search?entity=song&term=…)
export const music: { artist: string; song?: string; audio?: string; link?: string }[] = [
  {
    artist: 'Post Malone',
    song: 'Ain’t How It Ends',
    audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/57/3d/92/573d9223-a1c4-5060-d65d-d8dfc87f1840/mzaf_9315886877890865767.plus.aac.p.m4a',
    link: 'https://music.apple.com/us/album/aint-how-it-ends/1762471747?i=1762473461',
  },
  {
    artist: 'Jack Johnson',
    song: 'My Mind Is for Sale',
    audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/52/9a/3e/529a3e4d-b6f2-efcc-135a-6e10192607aa/mzaf_10109671963576962596.plus.aac.p.m4a',
    link: 'https://music.apple.com/us/album/my-mind-is-for-sale/1440890871?i=1440891294',
  },
  {
    artist: 'Fresno',
    song: 'Quando o Pesadelo Acabar',
    audio: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/31/6f/79/316f7920-2bcf-f0b1-9356-e95a6febd89c/mzaf_8876854009964025567.plus.aac.p.m4a',
    link: 'https://music.apple.com/us/album/quando-o-pesadelo-acabar/1777057961?i=1777057963',
  },
];

export const games = [
  { name: 'Counter-Strike' },
  { name: 'League of Legends' },
  { name: 'Rocket League', note: 'the only one I was actually good at' },
];
