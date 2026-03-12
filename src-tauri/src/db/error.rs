use thiserror::Error;

#[derive(Error, Debug)]
pub enum DbError {
    #[error("Database connection error: {0}")]
    ConnectionError(String),

    #[error("Database migration error: {0}")]
    MigrationError(String),

    #[error("Database query error: {0}")]
    QueryError(String),

    #[error("Record not found: {0}")]
    NotFound(String),

    #[error("Validation error: {0}")]
    ValidationError(String),

    #[error("Transaction error: {0}")]
    TransactionError(String),
}

impl From<sqlx::Error> for DbError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::RowNotFound => DbError::NotFound("Record not found".to_string()),
            sqlx::Error::PoolTimedOut => {
                DbError::ConnectionError("Connection pool timed out".to_string())
            }
            sqlx::Error::PoolClosed => {
                DbError::ConnectionError("Connection pool closed".to_string())
            }
            _ => DbError::QueryError(err.to_string()),
        }
    }
}

impl From<sqlx::migrate::MigrateError> for DbError {
    fn from(err: sqlx::migrate::MigrateError) -> Self {
        DbError::MigrationError(err.to_string())
    }
}

#[derive(Error, Debug)]
pub enum FileSystemError {
    #[error("Path traversal attempt detected: {0}")]
    PathTraversalAttempt(String),

    #[error("File not found: {0}")]
    FileNotFound(String),

    #[error("Permission denied: {0}")]
    PermissionDenied(String),

    #[error("Invalid path: {0}")]
    InvalidPath(String),

    #[error("IO error: {0}")]
    IoError(String),

    #[error("File too large: {0}")]
    FileTooLarge(String),
}

impl From<std::io::Error> for FileSystemError {
    fn from(err: std::io::Error) -> Self {
        use std::io::ErrorKind;
        match err.kind() {
            ErrorKind::NotFound => FileSystemError::FileNotFound(err.to_string()),
            ErrorKind::PermissionDenied => FileSystemError::PermissionDenied(err.to_string()),
            _ => FileSystemError::IoError(err.to_string()),
        }
    }
}

#[derive(Error, Debug)]
pub enum AttachmentError {
    #[error("Unsupported MIME type: {0}")]
    UnsupportedMimeType(String),

    #[error("File too big: {0}")]
    FileTooBig(String),

    #[error("Processing error: {0}")]
    ProcessingError(String),

    #[error("Attachment not found: {0}")]
    NotFound(String),

    #[error("MinIO error: {0}")]
    MinioError(String),
}

impl From<s3::error::S3Error> for AttachmentError {
    fn from(err: s3::error::S3Error) -> Self {
        AttachmentError::MinioError(err.to_string())
    }
}

impl From<image::ImageError> for AttachmentError {
    fn from(err: image::ImageError) -> Self {
        AttachmentError::ProcessingError(err.to_string())
    }
}
