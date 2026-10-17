import type { APIRoute } from 'astro'
import { resume } from '../data/resume'

const body = `${JSON.stringify(resume, null, 2)}\n`
const headers = { 'Content-Type': 'application/json; charset=utf-8' }

// Static output: the vendored resume, served as /resume.json.
export const GET: APIRoute = () => new Response(body, { headers })
