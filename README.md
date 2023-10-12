EXPORT DATABASE USING: surreal export --conn http://localhost:8000 --user root --pass root --ns test --db test vitedu.surql


IMPORT DATABASE USING: surreal import --conn http://localhost:8000 --user root --pass root --ns test --db test vitedu.surql