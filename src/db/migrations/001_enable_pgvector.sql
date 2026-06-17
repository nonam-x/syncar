-- Syncar Database Migrations
-- Additional SQL that Prisma cannot manage natively (pgvector, etc.)

-- Enable pgvector extension for semantic/vector search
CREATE EXTENSION IF NOT EXISTS vector;

-- Note: Vector columns and indexes are created via Prisma's
-- Unsupported("vector(768)") type. After running `prisma migrate dev`,
-- you may need to manually create HNSW or IVFFlat indexes:
--
-- CREATE INDEX IF NOT EXISTS idx_emails_embedding
--   ON emails USING hnsw (embedding vector_cosine_ops);
--
-- CREATE INDEX IF NOT EXISTS idx_calendar_events_embedding
--   ON calendar_events USING hnsw (embedding vector_cosine_ops);
