#!/usr/bin/env bash
# After the RBA decision: new hook line (0–4.3s) + the rest of the original take from 4.3s on.
# Usage: ./mix-after.sh hike hook-hike.mp3   (or: hold hook-hold.mp3)
set -euo pipefail
cd "$(dirname "$0")"
V=$1; HOOK=$2; TAKE=take-pre.mp3
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$HOOK")
tempo=$(awk -v d="$dur" 'BEGIN{t=d/4.2; if(t<1)t=1; if(t>1.2)t=1.2; printf "%.3f", t}')
ffmpeg -loglevel error -y -i ../rates-$V.mp4 -i "$HOOK" -i "$TAKE" -filter_complex \
 "[1:a]atempo=$tempo,afade=t=out:st=4.1:d=0.15,aresample=48000[h];\
  [2:a]atrim=start=4.30,asetpts=PTS-STARTPTS,adelay=4300|4300,aresample=48000[rest];\
  [h][rest]amix=inputs=2:normalize=0,apad,atrim=0:28.8,loudnorm=I=-14:TP=-1.5[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart ../rates-$V-vo.mp4
echo "wrote rates-$V-vo.mp4 (hook tempo $tempo)"
