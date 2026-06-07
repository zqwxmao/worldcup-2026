// Ultra-lightweight DB client using raw pg
// No Prisma overhead - connects only when needed, fails fast

type MatchRow = {
  id: number
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  group: string
  matchTime: Date
  homeScore: number | null
  awayScore: number | null
  status: string
}

let pool: any = null

function getPool() {
  if (pool) return pool
  const url = process.env.DATABASE_URL
  if (!url) return null

  try {
    // Dynamic import to avoid requiring pg at module level
    // This is a simplified approach - pg is a peer dep
    const { Pool } = require('pg')
    pool = new Pool({
      connectionString: url,
      max: 1,
      idleTimeoutMillis: 3000,
      connectionTimeoutMillis: 5000,
    })
    return pool
  } catch {
    return null
  }
}

export async function getMatches(): Promise<MatchRow[]> {
  const p = getPool()
  if (!p) return []

  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    )
    const result: any = await Promise.race([
      p.query('SELECT * FROM "Match" ORDER BY "matchTime" ASC'),
      timeout,
    ])
    return result.rows
  } catch {
    return []
  }
}
