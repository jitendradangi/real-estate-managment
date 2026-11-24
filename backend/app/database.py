# MySQL database configuration.
# Credentials are read from environment variables (see .env.example).
# The PyMySQL driver is specified via the `pymysql` dialect in the URL.

import os
from urllib.parse import quote

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load environment variables from a .env file if present.
load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "real_estate_db")
# Optional path to a CA certificate for TLS connections (e.g. TiDB Cloud).
# Leave empty for a plain local MySQL connection.
DB_SSL_CA = os.getenv("DB_SSL_CA", "")

# Build the SQLAlchemy connection URL using the PyMySQL driver.
# Credentials are URL-encoded so passwords containing special
# characters (e.g. @, :, /, #) do not break the connection string.
SQLALCHEMY_DATABASE_URL = (
    f"mysql+pymysql://{quote(DB_USER, safe='')}:{quote(DB_PASSWORD, safe='')}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# Resolve a relative DB_SSL_CA against the backend directory so it works
# regardless of the process working directory.
if DB_SSL_CA and not os.path.isabs(DB_SSL_CA):
    _backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DB_SSL_CA = os.path.join(_backend_dir, DB_SSL_CA)

# TLS is only enabled when a CA certificate is configured, keeping plain
# local MySQL connections working unchanged.
_connect_args = {}
if DB_SSL_CA:
    _connect_args["ssl"] = {"ca": DB_SSL_CA}

# Engine: manages connections to the database.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args=_connect_args,
    pool_pre_ping=True,
)

# SessionLocal: factory for creating database sessions.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base: declarative base class for all ORM models.
Base = declarative_base()


def get_db():
    """Dependency that provides a database session and ensures it is closed."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
