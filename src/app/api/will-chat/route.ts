import { NextResponse } from 'next/server'

const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions'
const MODEL = 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo'

function buildSystemPrompt(step: number, stepLabel: string, summary: string) {
  return `You are a warm, knowledgeable UAE estate planning assistant for Covenant — an online will-writing platform for expats.

The user is currently on Step ${step}: "${stepLabel}" of their will questionnaire.

What you know about them so far:
${summary || 'Just getting started.'}

Your role:
- Answer questions about the will process, UAE law basics, and this specific step
- Explain legal terms simply (no jargon)
- Be reassuring — many expats feel anxious about estate planning
- Keep replies under 120 words
- If they ask about specific legal situations, answer helpfully but note that Covenant's legal team will review their full details
- If asked about pricing: UAE will from AED 799, mirror wills AED 1,199, home-country will from AED 499, POA AED 499

Do NOT: give definitive legal advice, make up information about UAE law, or promise specific outcomes.`
}

export async function POST(request: Request) {
  try {
    const { messages, step, stepLabel, formSummary } = await request.json()

    const apiKey = process.env.TOGETHER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const response = await fetch(TOGETHER_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt(step, stepLabel, formSummary) },
          ...messages,
        ],
        max_tokens: 220,
        temperature: 0.65,
        top_p: 0.9,
        frequency_penalty: 0.2,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('TogetherAI error:', err)
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response. Please try again.'

    return NextResponse.json({ message: content })
  } catch (err) {
    console.error('will-chat error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
