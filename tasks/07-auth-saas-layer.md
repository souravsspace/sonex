# Task 07: Auth & SaaS Layer

## Context
Unlike `t3code` which runs purely local and relies on `codex login` for its auth loop, this must function as a standalone SaaS product.

## Details
1. **Frontend Authentication:** Implement Supabase/Firebase UI or custom JWT logic in `apps/web/src` for login/signup.
2. **SaaS Gateway:** Intercept LLM commands inside Rust Backend. Check with SaaS Remote via HTTP if the user has enough quota or a valid API key. (Allows "Bring Your Own Key" or "Pro Subscription" model).
3. **Telemetry & Logs:** Modify `AnalyticsService.ts` from the reference so that telemetry is GDPR compliant and uses your SaaS backend rather than their generic analytics.
4. **Cloud Sync:** Map the Rust local DB updates to a cloud DB so that user history persists across devices, a key feature for a scalable SaaS.