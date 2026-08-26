#!/usr/bin/env bash
# 스킬 동기화 — 원본 .claude/skills/ → 파생 .cursor/skills/
#
# WHY: Cursor 는 `.cursor/skills/`, Claude Code 는 `.claude/skills/` 만 읽는다.
#      두 경로를 잇는 심볼릭 링크는 Windows 에서 신뢰할 수 없으므로 물리 복제가 불가피하다.
#      중복 자체를 없앨 수 없으니 "원본 1곳 + 기계 생성 파생" 으로 고정하고 드리프트를 차단한다.
#
# 사용법:
#   bash scripts/sync-skills.sh          # 동기화 수행
#   bash scripts/sync-skills.sh --check  # 드리프트만 검사 (CI 용, 불일치 시 exit 1)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/.claude/skills"
DST="$REPO_ROOT/.cursor/skills"

[ -d "$SRC" ] || { echo "FAIL: 원본이 없다 — $SRC"; exit 1; }

if [ "${1:-}" = "--check" ]; then
  if [ ! -d "$DST" ]; then
    echo "DRIFT: 파생본이 없다 — $DST"
    echo "  → bash scripts/sync-skills.sh 를 실행하라."
    exit 1
  fi
  if diff -r "$SRC" "$DST" > /dev/null 2>&1; then
    echo "OK: .claude/skills == .cursor/skills"
    exit 0
  fi
  echo "DRIFT: 원본과 파생본이 다르다."
  diff -r "$SRC" "$DST" || true
  echo "  → 원본(.claude/skills)을 수정한 뒤 bash scripts/sync-skills.sh 를 실행하라."
  exit 1
fi

rm -rf "$DST"
mkdir -p "$DST"
cp -r "$SRC/." "$DST/"

count=$(find "$DST" -name 'SKILL.md' | wc -l | tr -d ' ')
echo "SYNCED: .claude/skills → .cursor/skills (SKILL.md ${count}건)"
