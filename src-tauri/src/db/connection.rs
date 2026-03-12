use sqlx::postgres::{PgPool, PgPoolOptions};
use std::time::Duration;
use tracing::{info, error};

use super::error::DbError;

/// Database connection pool configuration
pub struct DbConfig {
    pub database_url: String,
    pub max_connections: u32,
    pub min_connections: u32,
    pub connect_timeout: Duration,
    pub idle_timeout: Duration,
    pub max_lifetime: Duration,
}

impl Default for DbConfig {
    fn default() -> Self {
        Self {
            database_url: std::env::var("DATABASE_URL")
                .unwrap_or_else(|_| "postgresql://localhost/sonex_dev".to_string()),
            max_connections: 20,
            min_connections: 5,
            connect_timeout: Duration::from_secs(30),
            idle_timeout: Duration::from_secs(600), // 10 minutes
            max_lifetime: Duration::from_secs(1800), // 30 minutes
        }
    }
}

/// Initialize database connection pool
pub async fn init_pool(config: DbConfig) -> Result<PgPool, DbError> {
    info!("Initializing database connection pool");
    info!("Connecting to database: {}", mask_password(&config.database_url));

    let pool = PgPoolOptions::new()
        .max_connections(config.max_connections)
        .min_connections(config.min_connections)
        .acquire_timeout(config.connect_timeout)
        .idle_timeout(Some(config.idle_timeout))
        .max_lifetime(Some(config.max_lifetime))
        .test_before_acquire(true)
        .connect(&config.database_url)
        .await
        .map_err(|e| {
            error!("Failed to connect to database: {}", e);
            DbError::ConnectionError(e.to_string())
        })?;

    info!("Database connection pool initialized successfully");
    Ok(pool)
}

/// Check database connection health
pub async fn health_check(pool: &PgPool) -> Result<bool, DbError> {
    sqlx::query("SELECT 1")
        .fetch_one(pool)
        .await
        .map(|_| true)
        .map_err(|e| {
            error!("Database health check failed: {}", e);
            DbError::QueryError(e.to_string())
        })
}

/// Mask password in database URL for logging
fn mask_password(url: &str) -> String {
    if let Some(at_pos) = url.rfind('@') {
        if let Some(colon_pos) = url[..at_pos].rfind(':') {
            let mut masked = url.to_string();
            masked.replace_range(colon_pos + 1..at_pos, "****");
            return masked;
        }
    }
    url.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mask_password() {
        let url = "postgresql://user:password@localhost:5432/dbname";
        let masked = mask_password(url);
        assert_eq!(masked, "postgresql://user:****@localhost:5432/dbname");
    }

    #[test]
    fn test_mask_password_no_password() {
        let url = "postgresql://localhost:5432/dbname";
        let masked = mask_password(url);
        assert_eq!(masked, "postgresql://localhost:5432/dbname");
    }
}
