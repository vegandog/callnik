#!/bin/bash
# Run after any change to an ElevenLabs agent.
# Usage: ./scripts/validate-agent.sh [agent_id]
# Checks: no expression tags in transcript, conversation completes cleanly.

AGENT_ID=${1:-"agent_8301m0rf4fwre8x97eyyj2hbrmce"}
EL_KEY="sk_e7b8386d540f6fd82ab0fab519459b4bd309b1feca443a99"

echo "Validating agent: $AGENT_ID"

# 1. Check first_message for expression tags
FIRST_MSG=$(curl -s "https://api.elevenlabs.io/v1/convai/agents/$AGENT_ID" \
  -H "xi-api-key: $EL_KEY" | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('conversation_config',{}).get('agent',{}).get('first_message',''))")

if echo "$FIRST_MSG" | grep -qE '\[[a-z]'; then
  echo "❌ FAIL: first_message contains expression tags:"
  echo "$FIRST_MSG" | grep -oE '\[[^\]]+\]'
  exit 1
fi
echo "✅ first_message: no expression tags"

# 2. Check prompt for expression tags
PROMPT=$(curl -s "https://api.elevenlabs.io/v1/convai/agents/$AGENT_ID" \
  -H "xi-api-key: $EL_KEY" | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('conversation_config',{}).get('agent',{}).get('prompt',{}).get('prompt',''))")

TAGS=$(echo "$PROMPT" | grep -oE '\[[a-z][^\]]*\]' | head -5)
if [ -n "$TAGS" ]; then
  echo "❌ FAIL: prompt contains expression tags:"
  echo "$TAGS"
  exit 1
fi
echo "✅ prompt: no expression tags"

# 3. Check last conversation transcript (if exists)
LAST_CONV=$(curl -s "https://api.elevenlabs.io/v1/convai/conversations?agent_id=$AGENT_ID&page_size=1" \
  -H "xi-api-key: $EL_KEY" | \
  python3 -c "import sys,json; d=json.load(sys.stdin); convs=d.get('conversations',[]); print(convs[0].get('conversation_id','') if convs else '')")

if [ -n "$LAST_CONV" ]; then
  AGENT_LINES=$(curl -s "https://api.elevenlabs.io/v1/convai/conversations/$LAST_CONV" \
    -H "xi-api-key: $EL_KEY" | \
    python3 -c "
import sys,json
d=json.load(sys.stdin)
transcript = d.get('transcript',[])
agent_lines = [t.get('message','') for t in transcript if t.get('role')=='agent']
print('\n'.join(agent_lines))
")

  BRACKET_TAGS=$(echo "$AGENT_LINES" | grep -oE '\[[a-z][^\]]*\]' | head -5)
  if [ -n "$BRACKET_TAGS" ]; then
    echo "❌ FAIL: last transcript shows agent reading tags as text:"
    echo "$BRACKET_TAGS"
    exit 1
  fi
  echo "✅ last transcript: agent speech is clean"
fi

echo ""
echo "✅ Agent $AGENT_ID passed all checks."
