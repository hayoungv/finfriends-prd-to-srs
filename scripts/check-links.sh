#!/usr/bin/env bash
# 마크다운 상대 링크 무결성 검사
#
# WHY: 문서 이동·개명이 잦은 저장소다. 링크가 조용히 깨지면 에이전트가 SSOT 를 못 찾는다.
#      펜스 코드블록(```) 안은 건너뛴다 — 셸 스니펫의 `${x%%](}` 같은 패턴이
#      마크다운 링크로 오인되어 거짓 실패를 내기 때문이다.
#
# 사용법:
#   bash scripts/check-links.sh          # 깨진 링크가 있으면 exit 1
#   bash scripts/check-links.sh -v       # 검사한 링크를 전부 출력

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

verbose=0
[ "${1:-}" = "-v" ] && verbose=1

broken=0
checked=0
skipped_external=0

while IFS= read -r file; do
  in_fence=0
  lineno=0
  while IFS= read -r line || [ -n "$line" ]; do
    lineno=$((lineno + 1))

    # 펜스 토글 — ``` 또는 ~~~ 로 시작하는 줄
    case "${line#"${line%%[![:space:]]*}"}" in
      '```'*|'~~~'*) in_fence=$((1 - in_fence)); continue ;;
    esac
    [ "$in_fence" -eq 1 ] && continue

    # 한 줄에 여러 링크가 있을 수 있다
    rest="$line"
    while [[ "$rest" == *"]("* ]]; do
      rest="${rest#*](}"
      target="${rest%%)*}"
      # 닫는 괄호가 없으면 링크가 아니다
      [[ "$rest" == *")"* ]] || break

      case "$target" in
        http://*|https://*|mailto:*|'#'*|'') skipped_external=$((skipped_external + 1)); continue ;;
      esac

      path="${target%%#*}"                      # 앵커 제거
      path="${path//\%20/ }"                    # 최소한의 URL 디코딩
      checked=$((checked + 1))

      if [ -e "$(dirname "$file")/$path" ]; then
        [ "$verbose" -eq 1 ] && echo "  ok      $file:$lineno -> $target"
      else
        echo "BROKEN  $file:$lineno -> $target"
        broken=$((broken + 1))
      fi
    done
  done < "$file"
done < <(git ls-files '*.md' '*.mdc')

echo "상대 링크 ${checked}건 검사 (외부·앵커 ${skipped_external}건 제외) — 깨짐 ${broken}건"
[ "$broken" -eq 0 ] || exit 1
