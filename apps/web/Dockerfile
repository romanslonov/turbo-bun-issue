FROM oven/bun:1 AS base
WORKDIR /app

# ===============================================

FROM base AS builder

COPY . .

RUN bunx --bun turbo prune web --docker

# ===============================================

FROM base AS installer

COPY --from=builder /app/out/json/ .

ARG API_URL
ENV VITE_API_URL=$API_URL
ENV NODE_ENV=production

RUN bun install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN bun --filter "web" build

# ===============================================

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN bun install serve -g

COPY --from=installer /app/apps/web/dist ./dist

EXPOSE 3000
ENV PORT=3000

CMD ["bunx", "serve", "-s", "/app/dist", "-l", "3000"]