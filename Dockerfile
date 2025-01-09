FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app

ARG BUILD_PROJECT=true

RUN if [ "$BUILD_PROJECT" = "true" ]; then echo "skip apt installation"; else apt update; apt install -y git xdg-utils watch; fi

COPY .npmrc ./
COPY package.json ./

RUN npm install --silent

COPY . .

ARG NEXT_PUBLIC_CONVEX_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_ENABLE_UNAMI=true

RUN if [ "$BUILD_PROJECT" = "true"]; then npm run build; else echo "running in dev"; fi;

CMD npm run dev


FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

WORKDIR /app

USER nextjs

EXPOSE 3000

ENV PORT 3000

ARG HOSTNAME

CMD ["node", "server.js"]
