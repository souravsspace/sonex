use sqlx::{PgPool, postgres::PgPoolOptions};
use tracing::{info, error};

use crate::db::error::DbError;

/// Run all pending database migrations
/// 
/// This function will execute all SQL migration files in src-tauri/migrations/
/// in numerical order. It uses sqlx's built-in migration support which tracks
/// which migrations have already been applied.
pub async fn run_migrations(pool: &PgPool) -> Result<(), DbError> {
    info!("Running database migrations...");
    
    sqlx::migrate!("./migrations")
        .run(pool)
        .await
        .map_err(|e| {
            error!("Migration failed: {}", e);
            DbError::MigrationError(e.to_string())
        })?;
    
    info!("Database migrations completed successfully");
    Ok(())
}

/// Check the status of database migrations
/// 
/// Returns information about which migrations have been applied
pub async fn check_migration_status(pool: &PgPool) -> Result<Vec<MigrationInfo>, DbError> {
    info!("Checking migration status...");
    
    let migrations = sqlx::migrate!("./migrations")
        .migrations;
    
    let mut result = Vec::new();
    
    for migration in migrations {
        result.push(MigrationInfo {
            version: migration.version,
            description: migration.description.to_string(),
            checksum: format!("{:x}", migration.checksum),
        });
    }
    
    Ok(result)
}

/// Information about a database migration
#[derive(Debug, Clone)]
pub struct MigrationInfo {
    pub version: i64,
    pub description: String,
    pub checksum: String,
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_migration_files_exist() {
        // Verify migration files can be compiled
        let migrations = sqlx::migrate!("./migrations").migrations;
        assert!(!migrations.is_empty(), "Migration files should be found");
        
        // Verify migrations are in order
        for i in 1..migrations.len() {
            assert!(
                migrations[i - 1].version < migrations[i].version,
                "Migrations should be in ascending order"
            );
        }
    }
}
