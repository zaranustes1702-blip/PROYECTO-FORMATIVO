-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: eggbbalance
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_routes`
--

DROP TABLE IF EXISTS `app_routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_routes` (
  `id_app_routes` int NOT NULL AUTO_INCREMENT,
  `name_route` varchar(100) NOT NULL,
  `route` varchar(255) NOT NULL,
  `active` tinyint DEFAULT '1',
  `icono` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_app_routes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_routes`
--

LOCK TABLES `app_routes` WRITE;
/*!40000 ALTER TABLE `app_routes` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_routes_roll`
--

DROP TABLE IF EXISTS `app_routes_roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_routes_roll` (
  `id_app_routes_roll` int NOT NULL AUTO_INCREMENT,
  `id_app_routes` int NOT NULL,
  `id_roll` int NOT NULL,
  PRIMARY KEY (`id_app_routes_roll`),
  KEY `idx_app_routes` (`id_app_routes`),
  KEY `idx_roll` (`id_roll`),
  CONSTRAINT `fk_app_routes_roll_roll` FOREIGN KEY (`id_roll`) REFERENCES `roll` (`id_roll`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_app_routes_roll_route` FOREIGN KEY (`id_app_routes`) REFERENCES `app_routes` (`id_app_routes`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_routes_roll`
--

LOCK TABLES `app_routes_roll` WRITE;
/*!40000 ALTER TABLE `app_routes_roll` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_routes_roll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barn`
--

DROP TABLE IF EXISTS `barn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barnName` varchar(30) NOT NULL,
  `barnSize` varchar(30) NOT NULL,
  `maxBirdCapacity` int NOT NULL,
  `birdBreed` varchar(50) NOT NULL,
  `active` tinyint DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barn`
--

LOCK TABLES `barn` WRITE;
/*!40000 ALTER TABLE `barn` DISABLE KEYS */;
INSERT INTO `barn` VALUES (2,'Galpón Recría','32 x 14 metros',600,'Dekalb White',1,'2026-07-17 23:13:11','2026-07-17 23:13:11'),(3,'Galpón Experimental','28 x 10 metros',350,'ISA Brown',1,'2026-07-17 23:13:25','2026-07-17 23:13:25'),(4,'Galpon 1','20x10',200,'Hylen',1,'2026-08-30 19:42:47','2026-08-30 19:42:47'),(5,'Galpon principal','20x22',200,'Hy-Line Brown',1,'2026-09-21 19:50:19','2026-09-21 19:50:19'),(6,'Galpon principal','20x22',2000,'Hy-Line Brown',1,'2026-09-21 19:53:56','2026-09-21 19:53:56'),(7,'Galpon principal','20x23',300,'Hy-Line Brown',1,'2026-09-21 19:55:38','2026-09-21 19:55:38'),(8,'Galpon principal','20x26',200,'Hy-Line Brown',1,'2026-09-21 19:59:52','2026-09-21 19:59:52');
/*!40000 ALTER TABLE `barn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `birdbatch`
--

DROP TABLE IF EXISTS `birdbatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `birdbatch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entryDate` datetime NOT NULL,
  `batchNumber` varchar(255) NOT NULL,
  `birdQuantity` int NOT NULL,
  `batchWeight` float NOT NULL,
  `birdAgeWeeks` int NOT NULL,
  `appliedVaccines` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `birdbatch`
--

LOCK TABLES `birdbatch` WRITE;
/*!40000 ALTER TABLE `birdbatch` DISABLE KEYS */;
INSERT INTO `birdbatch` VALUES (1,'2026-08-05 00:00:00','L-001',180,342.5,24,'Newcastle, Gumboro, Bronquitis Infecciosa',1,'2026-08-05 16:00:12','2026-08-05 16:00:12'),(2,'2026-09-02 00:00:00','1',200,2.48,30,'bronquitis',1,'2026-09-17 12:56:08','2026-09-17 12:56:08'),(3,'2026-09-09 00:00:00','1',200,4.6,54,'covid',1,'2026-09-17 14:09:13','2026-09-17 14:09:13'),(4,'2026-09-22 00:00:00','1',90,0.31,12,'bronquitis',1,'2026-09-22 12:34:25','2026-09-22 12:34:25'),(5,'2026-09-16 00:00:00','2',200,0.68,43,'Bronquitiss aguda',1,'2026-09-23 17:34:48','2026-09-23 17:34:48');
/*!40000 ALTER TABLE `birdbatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eggproduction`
--

DROP TABLE IF EXISTS `eggproduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eggproduction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productionDate` date NOT NULL,
  `productionHour` time NOT NULL,
  `responsible` varchar(100) NOT NULL,
  `collectedAM` int NOT NULL,
  `collectedPM` int NOT NULL,
  `jumboEggs` int NOT NULL DEFAULT '0',
  `aaaEggs` int NOT NULL DEFAULT '0',
  `aaEggs` int NOT NULL DEFAULT '0',
  `aEggs` int NOT NULL DEFAULT '0',
  `bEggs` int NOT NULL DEFAULT '0',
  `cEggs` int NOT NULL DEFAULT '0',
  `brokenEggs` int NOT NULL DEFAULT '0',
  `totalDay` int NOT NULL DEFAULT '0',
  `goodEggs` int NOT NULL DEFAULT '0',
  `weeklyEggTotal` int NOT NULL DEFAULT '0',
  `productionPercentage` float NOT NULL DEFAULT '0',
  `observations` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eggproduction`
--

LOCK TABLES `eggproduction` WRITE;
/*!40000 ALTER TABLE `eggproduction` DISABLE KEYS */;
INSERT INTO `eggproduction` VALUES (1,'2026-08-05','08:30:00','Zara Ñustes',82,79,5,25,60,40,18,10,3,161,158,1125,89,'Producción normal del día.',1,'2026-08-05 14:19:31','2026-08-05 14:19:31'),(2,'2026-08-05','08:30:00','Zara Ñustes',82,79,5,25,60,40,18,10,3,161,158,1125,89,'Producción normal del día.',1,'2026-08-05 14:35:21','2026-08-05 14:35:21');
/*!40000 ALTER TABLE `eggproduction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeding`
--

DROP TABLE IF EXISTS `feeding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feedingDate` date NOT NULL,
  `dailyConsumptionKg` float NOT NULL,
  `remainingKg` float NOT NULL,
  `remainingBags` float NOT NULL,
  `shift` varchar(50) NOT NULL,
  `responsiblePerson` varchar(30) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeding`
--

LOCK TABLES `feeding` WRITE;
/*!40000 ALTER TABLE `feeding` DISABLE KEYS */;
INSERT INTO `feeding` VALUES (1,'2026-08-05',22.5,180,9,'Mañana','Zara Ñustes',1,'2026-08-05 16:43:23','2026-08-05 16:43:23'),(2,'2026-08-06',21.8,158.2,7.9,'Tarde','Carlos Andrés Pérez',1,'2026-08-05 16:43:33','2026-08-05 16:43:33'),(3,'2026-09-22',0.08,0.08,1,'Mañana','jose',1,'2026-09-23 14:25:11','2026-09-23 14:25:11');
/*!40000 ALTER TABLE `feeding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health`
--

DROP TABLE IF EXISTS `health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health` (
  `id` int NOT NULL AUTO_INCREMENT,
  `healthDate` datetime NOT NULL,
  `vaccineQuantity` int NOT NULL,
  `vaccineName` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health`
--

LOCK TABLES `health` WRITE;
/*!40000 ALTER TABLE `health` DISABLE KEYS */;
INSERT INTO `health` VALUES (1,'2026-08-21 00:00:00',50,'Vacuna Newcastle',1,'2026-08-21 17:12:30','2026-08-21 17:12:30');
/*!40000 ALTER TABLE `health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learner`
--

DROP TABLE IF EXISTS `learner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `document_type` enum('CC','TI','CE','PASAPORTE') NOT NULL,
  `document_number` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `document_number` (`document_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learner`
--

LOCK TABLES `learner` WRITE;
/*!40000 ALTER TABLE `learner` DISABLE KEYS */;
/*!40000 ALTER TABLE `learner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mortality`
--

DROP TABLE IF EXISTS `mortality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mortality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mortalityDate` date NOT NULL,
  `mortalityTime` varchar(25) NOT NULL,
  `dailyMortality` int NOT NULL,
  `possibleCauseOfDeath` varchar(25) NOT NULL,
  `necropsyPerformed` tinyint(1) NOT NULL,
  `observations` text,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mortality`
--

LOCK TABLES `mortality` WRITE;
/*!40000 ALTER TABLE `mortality` DISABLE KEYS */;
INSERT INTO `mortality` VALUES (1,'2026-08-05','08:30',2,'Enfermedad respiratoria',1,'Se encontraron síntomas respiratorios antes del fallecimiento.',1,'2026-08-05 16:26:31','2026-08-05 16:26:31'),(2,'2026-08-06','14:15',1,'Depredación',0,'Se encontró el ave fuera del galpón.',1,'2026-08-05 16:26:46','2026-08-05 16:26:46');
/*!40000 ALTER TABLE `mortality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quarantine`
--

DROP TABLE IF EXISTS `quarantine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quarantine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quarantineDate` datetime NOT NULL,
  `affectedBirds` varchar(50) NOT NULL,
  `symptoms` varchar(50) NOT NULL,
  `diagnosis` varchar(50) NOT NULL,
  `treatmentApplied` varchar(50) NOT NULL,
  `dosage` varchar(50) NOT NULL,
  `treatmentDuration` datetime NOT NULL,
  `observations` varchar(100) NOT NULL,
  `quarantineEndDate` datetime DEFAULT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quarantine`
--

LOCK TABLES `quarantine` WRITE;
/*!40000 ALTER TABLE `quarantine` DISABLE KEYS */;
INSERT INTO `quarantine` VALUES (1,'2026-07-17 00:00:00','18','Tos y dificultad respiratoria','Bronquitis infecciosa','Antibiótico','5 ml/L','2026-07-24 08:00:00','Mejoría después del tercer día','2026-07-24 00:00:00',1,'2026-07-17 22:18:19','2026-07-17 22:18:19'),(4,'2026-07-17 00:00:00','25','Tos y secreción nasal','Bronquitis infecciosa','Antibiótico','5 ml/L de agua','2026-07-24 00:00:00','Las aves estan muertas.','2026-07-24 00:00:00',1,'2026-07-17 23:51:25','2026-07-17 23:52:30');
/*!40000 ALTER TABLE `quarantine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsible`
--

DROP TABLE IF EXISTS `responsible`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsible` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(25) NOT NULL,
  `documentNumber` varchar(25) NOT NULL,
  `trainingRecord` varchar(25) NOT NULL,
  `role` varchar(25) NOT NULL,
  `responsibleType` varchar(25) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentNumber` (`documentNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsible`
--

LOCK TABLES `responsible` WRITE;
/*!40000 ALTER TABLE `responsible` DISABLE KEYS */;
INSERT INTO `responsible` VALUES (1,'Zara Ñustes','1088123456','2876543','Líder de Producción','Pasante',1,'2026-08-05 16:33:03','2026-08-05 16:33:03'),(2,'Carlos Andrés Pérez','1002456789','2890012','Instructor','Instructor',1,'2026-08-05 16:33:13','2026-08-05 16:33:13'),(3,'Zara Ñustes','1076737818','3285039','Encargado','Aprendiz',1,'2026-09-17 13:11:21','2026-09-17 13:11:21');
/*!40000 ALTER TABLE `responsible` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roll`
--

DROP TABLE IF EXISTS `roll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roll` (
  `id_roll` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name_roll` varchar(100) NOT NULL,
  PRIMARY KEY (`id_roll`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roll`
--

LOCK TABLES `roll` WRITE;
/*!40000 ALTER TABLE `roll` DISABLE KEYS */;
/*!40000 ALTER TABLE `roll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply`
--

DROP TABLE IF EXISTS `supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply` (
  `id` varchar(10) NOT NULL,
  `supplyType` varchar(50) NOT NULL,
  `entryDate` datetime NOT NULL,
  `supplyName` varchar(50) NOT NULL,
  `unitMeasure` varchar(50) NOT NULL,
  `quantity` int NOT NULL,
  `unitValue` decimal(10,2) NOT NULL,
  `totalValue` decimal(10,2) NOT NULL,
  `reference` varchar(50) NOT NULL,
  `expirationDate` datetime NOT NULL,
  `balance` int NOT NULL,
  `observations` varchar(255) DEFAULT NULL,
  `weight` decimal(10,2) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply`
--

LOCK TABLES `supply` WRITE;
/*!40000 ALTER TABLE `supply` DISABLE KEYS */;
INSERT INTO `supply` VALUES ('INS001','Alimento','2026-08-04 00:00:00','Concentrado Ponedoras','Bulto',20,95000.00,1900000.00,'CP-001','2027-02-15 00:00:00',20,'Primer lote',40.00,1,'2026-08-04 14:34:55','2026-08-04 14:34:55'),('INS002','Medicamento','2026-08-04 00:00:00','Acetaminofen','unidad',10,5000.00,190000.00,'CP-001','2027-02-15 00:00:00',20,'Primer lote',40.00,1,'2026-08-04 14:36:46','2026-08-04 14:36:46');
/*!40000 ALTER TABLE `supply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token-resetpassword`
--

DROP TABLE IF EXISTS `token-resetpassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token-resetpassword` (
  `idtoken_resetPassword` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `host` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idtoken_resetPassword`),
  KEY `idx_token_userId` (`userId`),
  CONSTRAINT `fk_token_resetpassword_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token-resetpassword`
--

LOCK TABLES `token-resetpassword` WRITE;
/*!40000 ALTER TABLE `token-resetpassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `token-resetpassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `uuid` varchar(45) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `documentId` varchar(30) NOT NULL,
  `postJob` varchar(50) NOT NULL,
  `verifyEmail` tinyint NOT NULL DEFAULT '0',
  `active` tinyint DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `solicito_newPassword` tinyint DEFAULT '0',
  `id_roll` int NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `idx_user_roll` (`id_roll`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Javier Ramirez',NULL,'jarl217@gmail.com','','','1076737818','Aprendiz',0,1,'2026-02-17 05:31:13','2026-07-16 05:31:13',0,0),(3,'Zara Ñustes',NULL,'zara@gmail.com','','','1001234567','Administrador',0,1,'2026-07-16 06:37:26','2026-07-16 06:37:26',0,0),(4,'Juan Pérez',NULL,'juan.perez2026@gmail.com','','','1023456789','Administrador',0,1,'2026-07-16 06:39:42','2026-07-16 06:39:42',0,0),(5,'Zara Castro',NULL,'zaraes@sena.edu.co','','','100123467','Administrador',0,1,'2026-07-17 23:20:45','2026-07-17 23:22:17',0,0),(6,'Juan Pérez',NULL,'juan@gmail.com','','','1234567890','Administrador',0,1,'2026-07-30 19:38:11','2026-07-30 19:38:11',0,0),(7,'Zara Ñustes',NULL,'eggbalance857@gmail.com','','','123456789','Administrador',0,1,'2026-07-31 04:08:43','2026-07-31 04:08:43',0,0),(16,'Carlos Gomez',NULL,'carlos.gomez@test.com','$2b$10$XpzCFqaf6wdYfGvBuLrXg.q9c/IDPx221S89zwT8AJotkIzMqWDJS','$2b$10$XpzCFqaf6wdYfGvBuLrXg.','1005829102','Administrador',0,0,NULL,NULL,0,0),(17,'Zara ',NULL,'zaranustes1702@gmail.com','$2b$10$TMcx.BXRHeKAaujhJ4j9nOprfq.KbE2K5hqPA16hZZ0WpUKUN05HG','$2b$10$TMcx.BXRHeKAaujhJ4j9nO','1076737818','Aprendiz',0,1,NULL,NULL,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `visitDate` datetime NOT NULL,
  `visitorName` varchar(50) NOT NULL,
  `institutionOrganization` varchar(50) NOT NULL,
  `visitReason` varchar(50) NOT NULL,
  `observations` varchar(100) DEFAULT NULL,
  `responsiblePerson` varchar(50) NOT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (2,'2026-08-02 00:00:00','Carlos Rodríguez','Universidad del Tolima','Práctica académica','Se realizó un recorrido por los galpones y se explicó el proceso de producción de huevos.','María López',1,'2026-07-17 19:36:52','2026-07-17 19:36:52'),(3,'2026-08-10 00:00:00','Ana Gómez','ICA','Inspección sanitaria','Si se encontraron 2 muertas.','Juan Pérez',1,'2026-07-17 19:37:11','2026-07-17 19:40:42');
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weighing`
--

DROP TABLE IF EXISTS `weighing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weighing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weighingDate` datetime NOT NULL,
  `weighingTime` time NOT NULL,
  `responsiblePerson` varchar(50) NOT NULL,
  `weighedBirds` int NOT NULL,
  `totalWeightKg` float NOT NULL,
  `averageWeightGrams` float NOT NULL,
  `batchUniformityPercentage` float NOT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weighing`
--

LOCK TABLES `weighing` WRITE;
/*!40000 ALTER TABLE `weighing` DISABLE KEYS */;
INSERT INTO `weighing` VALUES (3,'2026-07-19 00:00:00','18:20:30','Laura Mayo',165,312.5,1893.9,93.8,1,'2026-07-17 20:26:13','2026-07-17 20:27:21'),(4,'2026-07-17 00:00:00','08:30:00','jose',150,285.5,1903.3,94.5,1,'2026-07-17 23:56:06','2026-07-17 23:57:11');
/*!40000 ALTER TABLE `weighing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-23 13:08:22
