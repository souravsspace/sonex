/// Test migrations against the database
/// 
/// This example connects to the PostgreSQL database and runs all migrations.
/// Run with: cargo run --example test-migrations

use sonex_lib::db::{init_pool, run_migrations, check_migration_status};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load environment variables from .env file
    dotenvy::dotenv().ok();
    
    // Initialize logging
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .init();
    
    println!("🔗 Connecting to database...");
    
    // Initialize connection pool with default config
    let config = sonex_lib::db::DbConfig::default();
    let pool = init_pool(config).await?;
    
    println!("✅ Database connection established");
    println!("🔧 Running migrations...");
    
    // Run migrations
    run_migrations(&pool).await?;
    
    println!("✅ Migrations completed successfully");
    println!("📊 Checking migration status...");
    
    // Check migration status
    let migrations = check_migration_status(&pool).await?;
    
    println!("\n📋 Applied migrations:");
    for migration in migrations {
        println!("  ✓ Version {}: {}", migration.version, migration.description);
    }
    
    println!("\n✨ All done!");
    
    Ok(())
}
