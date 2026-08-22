export type QuoteEntry = {
  id: string;
  characterName: string;
  seriesName: string;
  line: string;
  accentColor: string;
  emblem: string;
};

const seeds = [
  ["Monkey D. Luffy", "One Piece", "Freedom means choosing the horizon, then moving toward it with your whole heart.", "☀", "#e8402c"],
  ["Roronoa Zoro", "One Piece", "A promise becomes strength when you keep it through every difficult mile.", "⚔", "#65b886"],
  ["Naruto Uzumaki", "Naruto", "Being overlooked is not the end of your story; it can be the first page.", "◎", "#f08b38"],
  ["Kakashi Hatake", "Naruto", "Skill matters, but the people beside you are what make a mission worth completing.", "雷", "#8a9eff"],
  ["Satoru Gojo", "Jujutsu Kaisen", "Real confidence makes room for others to become powerful too.", "∞", "#57cce8"],
  ["Yuji Itadori", "Jujutsu Kaisen", "A meaningful life is built from the people you choose to help along the way.", "拳", "#e85b78"],
  ["Tanjiro Kamado", "Demon Slayer", "Kindness is not softness; sometimes it is the strongest discipline you can practice.", "水", "#4fa9e8"],
  ["Kyojuro Rengoku", "Demon Slayer", "Use your fire to light the road for people who are still finding theirs.", "炎", "#ff7043"],
  ["Sung Jinwoo", "Solo Leveling", "Quiet progress compounds until the challenge that once towered over you looks small.", "影", "#9e7cff"],
  ["Edward Elric", "Fullmetal Alchemist", "Every result has a cost, so choose work that is worthy of what you give it.", "△", "#d5a84b"],
  ["Levi Ackerman", "Attack on Titan", "You rarely get certainty; make the clearest choice you can and own it fully.", "翼", "#7aa89a"],
  ["Eren Yeager", "Attack on Titan", "The walls around you only define your world if you stop searching beyond them.", "▣", "#8eaa6f"],
  ["Izuku Midoriya", "My Hero Academia", "Study what inspires you, practice what scares you, and use both to lift someone else.", "✦", "#58b985"],
  ["All Might", "My Hero Academia", "Hope becomes believable when someone is willing to carry it into the room.", "A", "#f0c84b"],
  ["Goku", "Dragon Ball", "There is always another level when curiosity is stronger than comfort.", "悟", "#f48a3a"],
  ["Vegeta", "Dragon Ball", "Pride is useful when it pushes you to improve instead of keeping you from learning.", "王", "#5d76d8"],
  ["Ichigo Kurosaki", "Bleach", "Strength finds its purpose when it protects the names you refuse to lose.", "斬", "#e97c3d"],
  ["Mob", "Mob Psycho 100", "Power is only one part of you; character is the part you build every day.", "100", "#83c7d8"],
  ["Shigeo Kageyama", "Mob Psycho 100", "Growth begins when you stop measuring your worth by your loudest talent.", "%", "#b28de0"],
  ["Thorfinn", "Vinland Saga", "The hardest victory is building a life that no longer needs an enemy.", "海", "#7daac5"],
  ["Frieren", "Frieren", "Small moments gain weight over time; notice them while they are still happening.", "✧", "#91cbb8"],
  ["Violet Evergarden", "Violet Evergarden", "Understanding another person starts with learning the meaning behind your own words.", "✉", "#719fe0"],
  ["Spike Spiegel", "Cowboy Bebop", "You can carry the past without letting it choose every direction ahead.", "★", "#d4b662"],
  ["Hinata Shoyo", "Haikyu!!", "Height is a fact, not a verdict; timing, effort, and courage can change the play.", "↑", "#ef8c38"],
] as const;

const closingThoughts = [
  "Begin before the moment feels perfect.",
  "Let the next action prove the idea.",
  "Keep the lesson, then keep moving.",
  "Make resolve visible through the work.",
  "Return tomorrow with sharper intent.",
] as const;

export const quotes: QuoteEntry[] = closingThoughts.flatMap((closing, frame) =>
  seeds.map(([characterName, seriesName, line, emblem, accentColor], index) => ({
    id: `${frame}-${index}`,
    characterName,
    seriesName,
    line: `${line} ${closing}`,
    accentColor,
    emblem,
  })),
);
