DROP DATABASE IF EXISTS bugbites_db;
CREATE DATABASE bugbites_db;

-- user table:
-- 1) ID
-- 2) username
-- 3) email
-- 4) password

-- bites table:
-- 1) ID
-- 2) headline
-- 3) content
-- 4) comment
-- OH SHIT DO COMMENTS GO IN A SEPARATE TABLE?? One post has many comments, each comment belongs to one post?
-- Separate table for pictures
-- library of common bug bites and descriptions and sample picture
-- "What bug do you think might have bitten you?"
-- comparison across multiple bugs