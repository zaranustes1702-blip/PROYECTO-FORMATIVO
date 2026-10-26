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
  `active` tinyint DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barn`
--

LOCK TABLES `barn` WRITE;
/*!40000 ALTER TABLE `barn` DISABLE KEYS */;
INSERT INTO `barn` VALUES (1,'Galpon Principal','5.7 x 5 metros',199,1,'2026-10-19 02:30:23','2026-10-19 02:30:23');
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
  `birdBreed` varchar(255) DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `initialAverageWeightGrams` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `birdbatch`
--

LOCK TABLES `birdbatch` WRITE;
/*!40000 ALTER TABLE `birdbatch` DISABLE KEYS */;
INSERT INTO `birdbatch` VALUES (1,'2026-10-16 00:00:00','1',199,266.66,16,'Marek, Newcastle, Bronquitis Infecciosa, Gumboro, Viruela Aviar, Encefalomielitis Aviar',1,'2026-10-19 02:38:26','2026-10-19 02:38:26','Hy-Line Brown','2027-10-16 00:00:00',NULL);
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
  `date` date NOT NULL,
  `hourAm` time NOT NULL,
  `responsible` varchar(100) DEFAULT NULL,
  `collectedAM` int DEFAULT NULL,
  `collectedPM` int DEFAULT NULL,
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
  `id_lote` int NOT NULL DEFAULT '1',
  `id_responsibleAm` int NOT NULL DEFAULT '1',
  `id_responsiblePm` int NOT NULL DEFAULT '1',
  `hourPm` time NOT NULL DEFAULT '00:00:00',
  `shift` varchar(20) NOT NULL DEFAULT 'Mañana',
  `jumboEggsAm` int NOT NULL DEFAULT '0',
  `aaaEggsAm` int NOT NULL DEFAULT '0',
  `aaEggsAm` int NOT NULL DEFAULT '0',
  `aEggsAm` int NOT NULL DEFAULT '0',
  `bEggsAm` int NOT NULL DEFAULT '0',
  `cEggsAm` int NOT NULL DEFAULT '0',
  `brokenEggsAm` int NOT NULL DEFAULT '0',
  `goodEggsAm` int NOT NULL DEFAULT '0',
  `totalAm` int NOT NULL DEFAULT '0',
  `jumboEggsPm` int NOT NULL DEFAULT '0',
  `aaaEggsPm` int NOT NULL DEFAULT '0',
  `aaEggsPm` int NOT NULL DEFAULT '0',
  `aEggsPm` int NOT NULL DEFAULT '0',
  `bEggsPm` int NOT NULL DEFAULT '0',
  `cEggsPm` int NOT NULL DEFAULT '0',
  `brokenEggsPm` int NOT NULL DEFAULT '0',
  `goodEggsPm` int NOT NULL DEFAULT '0',
  `totalPm` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eggproduction`
--

LOCK TABLES `eggproduction` WRITE;
/*!40000 ALTER TABLE `eggproduction` DISABLE KEYS */;
INSERT INTO `eggproduction` VALUES (1,'2026-10-17','05:00:00',NULL,NULL,NULL,0,0,0,0,0,0,5,87,82,0,43.72,'',1,'2026-10-19 03:15:14','2026-10-19 03:15:14',1,1,3,'22:00:00','Mañana',5,5,5,10,12,11,3,48,51,6,5,5,2,12,4,2,34,36),(2,'2026-10-18','04:00:00',NULL,NULL,NULL,0,0,0,0,0,0,6,159,153,0,79.9,'',1,'2026-10-19 03:16:28','2026-10-19 03:16:28',1,2,3,'14:00:00','Mañana',30,12,20,12,32,1,2,107,109,9,12,21,0,1,3,4,46,50);
/*!40000 ALTER TABLE `eggproduction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeding`
--

DROP TABLE IF EXISTS `feeding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeding` (
  `id_feeding` int NOT NULL AUTO_INCREMENT,
  `id_supply` varchar(10) NOT NULL,
  `id_stockEntry` int NOT NULL,
  `id_responsable` int NOT NULL,
  `shift` varchar(20) NOT NULL,
  `feedingDate` date NOT NULL,
  `feedingTime` time NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_feeding`),
  KEY `id_supply` (`id_supply`),
  KEY `id_stockEntry` (`id_stockEntry`),
  KEY `id_responsable` (`id_responsable`),
  CONSTRAINT `feeding_ibfk_1` FOREIGN KEY (`id_supply`) REFERENCES `supply` (`id_supply`),
  CONSTRAINT `feeding_ibfk_2` FOREIGN KEY (`id_stockEntry`) REFERENCES `stockentry` (`id_stockEntry`),
  CONSTRAINT `feeding_ibfk_3` FOREIGN KEY (`id_responsable`) REFERENCES `responsible` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeding`
--

LOCK TABLES `feeding` WRITE;
/*!40000 ALTER TABLE `feeding` DISABLE KEYS */;
INSERT INTO `feeding` VALUES (1,'1',1,1,'Mañana','2026-10-16','06:58:00',6.90,1,'2026-10-19 03:00:11','2026-10-19 03:00:11'),(2,'1',1,2,'Tarde','2026-10-16','14:00:00',6.90,1,'2026-10-19 03:00:44','2026-10-19 03:00:44'),(3,'1',1,3,'Noche','2026-10-16','22:01:00',9.10,1,'2026-10-19 03:01:15','2026-10-19 03:01:15');
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
  `id_lote` int NOT NULL,
  `id_supply` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_lote` (`id_lote`),
  KEY `id_supply` (`id_supply`),
  CONSTRAINT `health_ibfk_1` FOREIGN KEY (`id_lote`) REFERENCES `birdbatch` (`id`),
  CONSTRAINT `health_ibfk_2` FOREIGN KEY (`id_supply`) REFERENCES `supply` (`id_supply`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health`
--

LOCK TABLES `health` WRITE;
/*!40000 ALTER TABLE `health` DISABLE KEYS */;
INSERT INTO `health` VALUES (1,'2026-10-17 00:00:00',1,'Bronquitis',1,'2026-10-19 03:03:20','2026-10-19 03:03:20',1,'2');
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
  `mortalityDate` datetime NOT NULL,
  `mortalityTime` varchar(255) NOT NULL,
  `dailyMortality` int NOT NULL,
  `possibleCauseOfDeath` varchar(255) NOT NULL,
  `necropsyPerformed` tinyint(1) NOT NULL,
  `observations` text,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `id_lote` int NOT NULL,
  `id_responsable` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_lote` (`id_lote`),
  KEY `id_responsable` (`id_responsable`),
  CONSTRAINT `mortality_ibfk_1` FOREIGN KEY (`id_lote`) REFERENCES `birdbatch` (`id`),
  CONSTRAINT `mortality_ibfk_2` FOREIGN KEY (`id_responsable`) REFERENCES `responsible` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mortality`
--

LOCK TABLES `mortality` WRITE;
/*!40000 ALTER TABLE `mortality` DISABLE KEYS */;
INSERT INTO `mortality` VALUES (1,'2026-10-18 00:00:00','21:52',1,'Respiracion',1,'Se encontro muerta en la hora de la noche',1,'2026-10-19 02:52:51','2026-10-19 02:52:51',1,2);
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
  `affectedBirds` int NOT NULL,
  `symptoms` varchar(255) NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `treatmentApplied` varchar(255) NOT NULL,
  `dosage` varchar(255) NOT NULL,
  `treatmentDuration` varchar(255) NOT NULL,
  `observations` text,
  `quarantineEndDate` datetime DEFAULT NULL,
  `active` tinyint DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `id_lote` int NOT NULL,
  `id_supply` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_lote` (`id_lote`),
  KEY `id_supply` (`id_supply`),
  CONSTRAINT `quarantine_ibfk_1` FOREIGN KEY (`id_lote`) REFERENCES `birdbatch` (`id`),
  CONSTRAINT `quarantine_ibfk_2` FOREIGN KEY (`id_supply`) REFERENCES `supply` (`id_supply`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quarantine`
--

LOCK TABLES `quarantine` WRITE;
/*!40000 ALTER TABLE `quarantine` DISABLE KEYS */;
INSERT INTO `quarantine` VALUES (1,'2026-10-18 00:00:00',1,'Tos','Coriza','Antibiotico','1ml','5 dias','','2026-10-22 00:00:00',1,'2026-10-19 03:08:18','2026-10-19 03:08:18',1,'2');
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
  `fullName` varchar(150) NOT NULL,
  `documentNumber` varchar(25) NOT NULL,
  `trainingRecord` varchar(25) NOT NULL,
  `role` varchar(100) NOT NULL,
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
INSERT INTO `responsible` VALUES (1,'Zara Daniela Ñustes Castro','1076737818','3285039','Encargada de unidad avicola','Pasante',1,'2026-10-19 02:45:34','2026-10-19 02:45:34'),(2,'Edwin Santiago Ñustes Castro','1076737412','3285039','Encargado de registrar','Gestor',1,'2026-10-19 02:46:19','2026-10-19 02:46:19'),(3,'Andres Mauricio Ñustes Castro','11111123454','3285039','Encargado de alimento','Pasante',1,'2026-10-19 02:47:44','2026-10-19 02:47:44');
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
-- Table structure for table `stockentry`
--

DROP TABLE IF EXISTS `stockentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockentry` (
  `id_stockEntry` int NOT NULL AUTO_INCREMENT,
  `id_supply` varchar(10) NOT NULL,
  `id_barn` int NOT NULL,
  `cantidad_inicial` decimal(10,2) NOT NULL,
  `cantidad_salida` decimal(10,2) NOT NULL DEFAULT '0.00',
  `disponible_entrada` decimal(10,2) NOT NULL,
  `unid_entrada` varchar(50) NOT NULL,
  `vencimiento` date NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_stockEntry`),
  KEY `id_supply` (`id_supply`),
  KEY `id_barn` (`id_barn`),
  CONSTRAINT `stockentry_ibfk_1` FOREIGN KEY (`id_supply`) REFERENCES `supply` (`id_supply`),
  CONSTRAINT `stockentry_ibfk_2` FOREIGN KEY (`id_barn`) REFERENCES `barn` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockentry`
--

LOCK TABLES `stockentry` WRITE;
/*!40000 ALTER TABLE `stockentry` DISABLE KEYS */;
INSERT INTO `stockentry` VALUES (1,'1',1,100.00,22.90,77.10,'kg','2027-10-18',10000000.00,100000.00,1,'2026-10-19 02:57:11','2026-10-19 03:01:15'),(2,'2',1,0.40,0.00,0.40,'kg','2028-10-18',8000.00,20000.00,1,'2026-10-19 02:57:47','2026-10-19 02:57:47');
/*!40000 ALTER TABLE `stockentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supply`
--

DROP TABLE IF EXISTS `supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supply` (
  `id_supply` varchar(10) NOT NULL,
  `supplyName` varchar(50) NOT NULL,
  `supplyType` enum('medicamentos','alimentacion') NOT NULL,
  `reference` varchar(50) NOT NULL,
  `minimumStock` decimal(10,2) NOT NULL DEFAULT '0.00',
  `observations` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_supply`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supply`
--

LOCK TABLES `supply` WRITE;
/*!40000 ALTER TABLE `supply` DISABLE KEYS */;
INSERT INTO `supply` VALUES ('1','Concentrado','alimentacion','100',10.00,'',1,'2026-10-19 02:53:51','2026-10-19 02:53:51'),('2','Vacuna(Bronquitis infecciosa aviar)','medicamentos','0.40',0.10,'',1,'2026-10-19 02:56:30','2026-10-19 02:56:30');
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
  `id_roll` int DEFAULT NULL,
  `resetPasswordToken` varchar(200) DEFAULT NULL,
  `resetPasswordTokenExpires` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `idx_user_roll` (`id_roll`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'Carlos Gomez','123456789','carlos.gomez@test.com','$2b$10$XpzCFqaf6wdYfGvBuLrXg.q9c/IDPx221S89zwT8AJotkIzMqWDJS','$2b$10$XpzCFqaf6wdYfGvBuLrXg.','1005829102','Administrador',0,1,NULL,'2026-10-23 02:46:01',1,0,'MTIzNDU2Nzg5',NULL),(28,'Zara Ñustes','7e896425-fc44-4e57-afda-ec1d4921b426','zaranustes1702@gmail.com','$2b$12$lxU7l1a4X94Va3K9uK9G9uEUG0k0Ann9Q9pJIKpzNRucMa4.TpLvC','$2b$12$lxU7l1a4X94Va3K9uK9G9u','123456789','Administrador',1,1,'2026-10-23 02:28:39','2026-10-23 16:00:54',1,NULL,'N2U4OTY0MjUtZmM0NC00ZTU3LWFmZGEtZWMxZDQ5MjFiNDI2',NULL),(29,'Egg Balance','29778d53-d50b-4d6c-ab79-3c12e4b4fbb6','eggbalance857@gmail.com','$2b$10$/6GOgQpuvrXPIKe2untd9uJACi.79tOv.9cniXbaPb2ldMT14Dvuu','$2b$10$/6GOgQpuvrXPIKe2untd9u','1000000001','Administrador',1,1,'2026-10-23 14:44:24','2026-10-23 15:53:38',1,NULL,'Mjk3NzhkNTMtZDUwYi00ZDZjLWFiNzktM2MxMmU0YjRmYmI2',NULL);
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
  `institutionOrganization` varchar(255) NOT NULL,
  `visitReason` varchar(255) NOT NULL,
  `observations` varchar(255) NOT NULL DEFAULT 'Sin observaciones',
  `responsiblePerson` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (1,'2026-10-17 00:00:00','SENA BOYACA','SENA','Ver los procesos en la unidad avicola','Todo salio bien','Zara Ñustes',1,'2026-10-19 03:45:36','2026-10-19 03:45:36');
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
  `id_birdBatch` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_weighing_birdbatch` (`id_birdBatch`),
  CONSTRAINT `fk_weighing_birdbatch` FOREIGN KEY (`id_birdBatch`) REFERENCES `birdbatch` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weighing`
--

LOCK TABLES `weighing` WRITE;
/*!40000 ALTER TABLE `weighing` DISABLE KEYS */;
INSERT INTO `weighing` VALUES (1,'2026-10-16 00:00:00','06:00:00','Zara Daniela Ñustes Castro',199,266.66,1340,100,1,'2026-10-19 02:51:12','2026-10-19 02:51:12',1);
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

-- Dump completed on 2026-10-23 20:54:11
