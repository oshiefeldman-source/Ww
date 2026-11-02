#!/usr/bin/env bash
# Mix vo0..vo6.mp3 onto the reel at each scene's start. Optional arg: a music bed, ducked under the voice.
set -euo pipefail
cd "$(dirname "$0")"
VIDEO=../rates-${VARIANT:-hike}.mp4
OUT=../rates-${VARIANT:-hike}-vo.mp4
STARTS=(0.0 3.05 6.55 10.05 13.55 16.9 20.6)
MAXLEN=(3.0 3.4 3.4 3.4 3.4 3.65 4.2)

inputs=(-i "$VIDEO"); filters=""; labels=""
for k in 0 1 2 3 4 5 6; do
  f="vo$k.mp3"; [[ -f $f ]] || { echo "missing $f"; exit 1; }
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  tempo=$(awk -v d="$dur" -v m="${MAXLEN[$k]}" 'BEGIN{t=d/m; if(t<1)t=1; if(t>1.25)t=1.25; printf "%.3f", t}')
  ms=$(awk -v s="${STARTS[$k]}" 'BEGIN{printf "%d", s*1000}')
  inputs+=(-i "$f")
  filters+="[$((k+1)):a]atempo=$tempo,adelay=${ms}|${ms},aresample=48000[v$k];"
  labels+="[v$k]"
done
filters+="${labels}amix=inputs=7:normalize=0,apad,atrim=0:25[vo];"
if [[ $# -ge 1 ]]; then
  inputs+=(-stream_loop -1 -i "$1")
  filters+="[8:a]atrim=0:25,afade=t=out:st=23:d=2,volume=0.6,aresample=48000[bed];"
  filters+="[vo]asplit=2[vo1][vo2];"
  filters+="[bed][vo1]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[duck];"
  filters+="[duck][vo2]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5[a]"
else
  filters+="[vo]loudnorm=I=-14:TP=-1.5[a]"
fi
ffmpeg -loglevel error -y "${inputs[@]}" -filter_complex "$filters" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$OUT"
echo "wrote $OUT"
