# Five Ways Out: voiceover script

One clip per scene, so each line lands exactly on its scene. Keep each clip under its time limit.
Suggested ElevenLabs settings: an Australian-accented narrator voice, model `eleven_multilingual_v2`,
stability ~0.45, similarity ~0.75, style ~0.2. Numbers are written out so they're read correctly.

| File | Starts at | Max length | Line |
|---|---|---|---|
| `vo0.mp3` | 0:00.2 | 5.2 s | Five ways Anthony Albanese could stop being prime minister before the next election. |
| `vo1.mp3` | 0:05.6 | 7.4 s | One. He resigns. Labor picks a new leader, and the Governor-General swears them in. No election needed. |
| `vo2.mp3` | 0:13.1 | 7.4 s | Two. A leadership spill. Labor's rules make it tough: seventy-five percent of caucus has to sign a petition first. |
| `vo3.mp3` | 0:20.6 | 7.4 s | Three. No confidence. With ninety-four seats, at least twenty Labor MPs would have to vote against their own government. |
| `vo4.mp3` | 0:28.1 | 7.4 s | Four. Disqualification. The High Court can rule an MP was never validly elected under section forty-four. |
| `vo5.mp3` | 0:35.6 | 7.4 s | Five. The Governor-General dismisses him. It has happened once: Gough Whitlam, nineteen seventy-five. |
| `vo6.mp3` | 0:43.1 | 6.8 s | The bottom line: the realistic exits all run through Labor itself. |

To mix: put the seven files in this folder and run `./mix.sh` (optionally `./mix.sh music.mp3` to add a bed under the voice).
Clips that run long are sped up slightly to fit; nothing is cut off.

The published mix uses ElevenLabs voice Charlie (Deep, Confident, Energetic), one take split at the pauses into vo0–vo6.
