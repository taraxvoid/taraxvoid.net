import type { APIRoute } from 'astro';
import { renderResumeMarkdown } from '../lib/resume-md';

// Static output: rendered once at build time and served as /resume.md.
export const GET: APIRoute = () =>
    new Response(renderResumeMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
