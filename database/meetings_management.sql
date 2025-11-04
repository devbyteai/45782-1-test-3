-- MySQL dump for Meetings Management System
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `meetings_management_orriez`;
USE `meetings_management_orriez`;

-- Table structure for table `development_teams`
DROP TABLE IF EXISTS `meetings`;
DROP TABLE IF EXISTS `development_teams`;

CREATE TABLE `development_teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `meetings`
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `development_team_id` int NOT NULL,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `description` text NOT NULL,
  `room` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `development_team_id` (`development_team_id`),
  CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`development_team_id`) REFERENCES `development_teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data into development_teams
INSERT INTO `development_teams` (`name`) VALUES
('Team UI'),
('Team Mobile'),
('Team React'),
('Team Backend'),
('Team DevOps'),
('Team QA');

-- Insert sample data into meetings
INSERT INTO `meetings` (`development_team_id`, `start_datetime`, `end_datetime`, `description`, `room`) VALUES
(1, '2025-11-05 09:00:00', '2025-11-05 10:00:00', 'Sprint Planning - Discuss upcoming UI tasks for the new dashboard', 'Large Board Room'),
(1, '2025-11-06 14:00:00', '2025-11-06 15:00:00', 'Design Review - Review new component designs and accessibility features', 'Blue Room'),
(2, '2025-11-05 10:30:00', '2025-11-05 11:30:00', 'Mobile Release Planning - Discuss iOS and Android release schedule', 'New York Room'),
(2, '2025-11-07 13:00:00', '2025-11-07 14:30:00', 'Code Review - Review recent mobile app performance improvements', 'Small Meeting Room'),
(3, '2025-11-05 11:00:00', '2025-11-05 12:00:00', 'React Architecture Discussion - Discuss state management improvements', 'Large Board Room'),
(3, '2025-11-08 10:00:00', '2025-11-08 11:00:00', 'Tech Debt Review - Identify and prioritize technical debt items', 'Green Room'),
(4, '2025-11-06 09:00:00', '2025-11-06 10:30:00', 'API Design Session - Design new REST endpoints for user management', 'New York Room'),
(4, '2025-11-09 15:00:00', '2025-11-09 16:00:00', 'Database Optimization - Discuss query performance and indexing strategy', 'Blue Room'),
(5, '2025-11-05 15:00:00', '2025-11-05 16:00:00', 'CI/CD Pipeline Review - Review deployment process and automation', 'Small Meeting Room'),
(5, '2025-11-10 11:00:00', '2025-11-10 12:00:00', 'Infrastructure Planning - Discuss cloud migration and scaling strategy', 'Large Board Room'),
(6, '2025-11-06 10:00:00', '2025-11-06 11:00:00', 'Test Strategy Meeting - Define testing approach for new features', 'Green Room'),
(6, '2025-11-11 14:00:00', '2025-11-11 15:30:00', 'Bug Triage - Review and prioritize reported bugs', 'Blue Room');
