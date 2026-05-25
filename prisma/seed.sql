-- Seed admin user
INSERT INTO "User" (id, email, name, password) 
SELECT 'admin-001', 'admin@projectmgmt.com', 'Admin', '$2a$10$dummyhash'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'admin@projectmgmt.com');
