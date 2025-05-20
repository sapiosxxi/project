-- --------------------------------------------------------
-- Διακομιστής:                  127.0.0.1
-- Έκδοση διακομιστή:            11.7.2-MariaDB - mariadb.org binary distribution
-- Λειτ. σύστημα διακομιστή:     Win64
-- HeidiSQL Έκδοση:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for reastaurant1
CREATE DATABASE IF NOT EXISTS `reastaurant1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `reastaurant1`;

-- Dumping structure for πίνακας reastaurant1.reservations
CREATE TABLE IF NOT EXISTS `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `people_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `user_id` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table reastaurant1.reservations: ~2 rows (approximately)
DELETE FROM `reservations`;
INSERT INTO `reservations` (`reservation_id`, `user_id`, `restaurant_id`, `date`, `time`, `people_count`) VALUES
	(2, 1, 1, '2025-05-12', '20:00:00', 5),
	(6, 14, 16, '2025-05-23', '17:23:00', 1);

-- Dumping structure for πίνακας reastaurant1.restaurants
CREATE TABLE IF NOT EXISTS `restaurants` (
  `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table reastaurant1.restaurants: ~5 rows (approximately)
DELETE FROM `restaurants`;
INSERT INTO `restaurants` (`restaurant_id`, `name`, `location`, `description`) VALUES
	(1, 'Πιθάρι', 'Αγρίνιο', 'Παραδοσιακή ελληνική κουζίνα με αυθεντικές γεύσεις.'),
	(2, 'Lake Living', 'Αγρίνιο', 'Μοντέρνο εστιατόριο με θέα στη λίμνη και διεθνή κουζίνα.'),
	(3, 'Tavern Tzaki', 'Αγρίνιο', 'Παραδοσιακή ταβέρνα με φιλική ατμόσφαιρα και σπιτικά πιάτα.'),
	(4, 'Mezedomageies', 'Αγρίνιο', 'Μεζεδοπωλείο με ποικιλία από ελληνικούς μεζέδες και ζωντανή μουσική.'),
	(5, 'Le Manoir', 'Αγρίνιο', 'Γαλλική κουζίνα με εκλεπτυσμένα πιάτα και κομψό περιβάλλον.');

-- Dumping structure for πίνακας reastaurant1.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table reastaurant1.users: ~10 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
	(1, 'Test User', 'test@example.com', '$2b$10$y7F1KN9yKN1NjGECaKD/NuFbMN12XGJkFe8QfyNkUdnFnSuwS97rK'),
	(14, '123', 'nikofewgwgsasddsds@example.com', '$2b$10$dBe3rxeehh/E.9n5miOEyuO2kXrXmyhSyqZ9cCfz2kze4zSlSkhUu');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
