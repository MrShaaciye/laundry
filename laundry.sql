-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: laundry
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(9) NOT NULL,
  `depositAmount` decimal(8,2) NOT NULL,
  `allowedUnit` int unsigned NOT NULL,
  `paymentStatus` varchar(12) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Walk in','Male','Mogadishu, Somalia','123456789',19.99,4,'Full Paid','2023-11-20 07:35:22','2023-11-26 06:23:25',NULL),(2,'Miski Hassan Abdi','Female','Wadajir. Mogadishu, Somalia','615861348',21.99,4,'Partial Paid','2023-11-20 07:37:14','2023-11-20 07:37:14',NULL),(3,'Bashir Abdi Yusuf','Male','Hodan. Mogadishu, Somalia','615861349',20.99,4,'Not Paid','2023-11-20 07:38:20','2023-11-20 10:28:05',NULL),(4,'Abdullahi Mohamed Yusuf','Male','Ceelasha Biyaha. Mogadishu, Somalia','615861347',22.99,4,'Full Paid','2023-11-26 06:24:18','2023-11-26 06:24:18',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customerId` bigint unsigned NOT NULL,
  `employeeId` bigint unsigned NOT NULL,
  `fee` decimal(8,2) NOT NULL,
  `note` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deliveries_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
INSERT INTO `deliveries` VALUES (1,3,3,1.50,'Macmiilkan waa loo adeegay','2023-11-29 11:56:14','2024-08-04 07:37:52',NULL),(2,3,1,2.00,'Macmiilkan waa loo adeegay','2023-11-29 12:00:33','2024-08-04 07:37:30',NULL);
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(9) NOT NULL,
  `jobTitle` varchar(20) NOT NULL,
  `salary` decimal(8,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Osman Mohamed Said','Male','Dharkeynley. Mogadishu, Somalia','611223344','Manager',399.99,'2023-11-20 07:41:20','2023-11-20 07:41:20',NULL),(2,'Mohamed Abdullahi Hassan','Male','Howlwadaag. Mogadishu, Somalia','612334455','Employee',299.99,'2023-11-20 07:42:11','2023-11-20 07:42:11',NULL),(3,'Faisal Mohamud Sahal','Male','Wardhigley. Mogadishu, Somalia','612334455','Seller',199.99,'2023-11-20 07:43:53','2023-11-20 07:43:53',NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `note` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` VALUES (1,'Kiro','Kirada bisha ee xafiiska.','2023-11-28 06:34:35','2023-11-28 06:34:35',NULL),(2,'Koronto','Korontada bisha ee xafiiska.','2023-11-28 06:35:15','2023-11-28 06:35:15',NULL),(3,'Biyo','Biyaha bisha ee xafiiska.','2023-11-28 06:35:36','2023-11-28 06:35:36',NULL),(4,'Internet','Internetka bisha ee xafiiska.','2023-11-28 06:36:38','2023-11-28 08:51:29',NULL);
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories`
--

DROP TABLE IF EXISTS `inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `supplyId` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `type` varchar(9) NOT NULL,
  `note` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplyId` (`supplyId`),
  CONSTRAINT `inventories_ibfk_1` FOREIGN KEY (`supplyId`) REFERENCES `supplies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories`
--

LOCK TABLES `inventories` WRITE;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
INSERT INTO `inventories` VALUES (1,2,14,'Stoke in','Kartoon ayaa la dhigay Bakhaarka.','2023-11-29 09:01:44','2023-11-29 10:40:24',NULL),(2,1,1,'Stoke out','1 Kartoon ayaa laga bixiyey Bakhaarka.','2023-11-29 09:30:07','2023-11-29 10:31:40',NULL);
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Blouse','2023-11-22 11:38:09','2023-11-22 12:13:08',NULL),(2,'Jacket','2023-11-22 11:53:30','2023-11-22 12:13:22',NULL),(3,'Jeans','2023-11-22 11:54:11','2023-11-22 12:13:42',NULL),(4,'Skirt','2023-11-22 11:54:30','2023-11-22 12:14:05',NULL),(5,'Shirt','2023-11-22 11:54:54','2023-11-22 12:14:21',NULL),(6,'Suit','2023-11-22 11:55:15','2023-11-22 12:15:58',NULL),(7,'T Shirt','2023-11-22 11:56:13','2023-11-22 12:16:10',NULL),(8,'Trouser','2023-11-22 11:57:49','2023-11-22 12:16:32',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bringDate` datetime NOT NULL,
  `collectDate` datetime NOT NULL,
  `customerId` bigint unsigned NOT NULL,
  `employeeId` bigint unsigned NOT NULL,
  `serviceId` bigint unsigned NOT NULL,
  `itemId` bigint unsigned NOT NULL,
  `priceId` bigint unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `pickupFee` decimal(8,2) NOT NULL,
  `totalAmount` decimal(8,2) NOT NULL,
  `paidAmount` decimal(8,2) NOT NULL,
  `balance` decimal(8,2) NOT NULL,
  `paymentType` varchar(8) NOT NULL,
  `paymentStatus` varchar(12) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  KEY `employeeId` (`employeeId`),
  KEY `serviceId` (`serviceId`),
  KEY `itemId` (`itemId`),
  KEY `priceId` (`priceId`),
  CONSTRAINT `orders_ibfk_41` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_42` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_43` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_44` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_45` FOREIGN KEY (`priceId`) REFERENCES `prices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2023-11-26 00:00:00','2023-11-28 00:00:00',1,3,2,5,2,11,5.50,1.00,6.50,4.75,1.75,'EVC Plus','Partial Paid','2023-11-27 09:05:21','2023-11-27 09:05:21',NULL),(2,'2023-11-26 00:00:00','2023-11-28 00:00:00',3,1,1,8,1,5,10.00,0.00,10.00,6.25,3.75,'Cash','Full Paid','2023-11-27 09:23:16','2023-11-27 11:55:56',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `expenseId` bigint unsigned NOT NULL,
  `date` datetime NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `note` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expenseId` (`expenseId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`expenseId`) REFERENCES `expenses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,3,'2023-11-28 00:00:00',99.99,'Biyaha Xafiiska maanta ayaan la bixiyey','2023-11-28 12:14:04','2023-11-28 12:14:04',NULL),(2,1,'2023-11-28 00:00:00',1999.99,'Kirada bisha ee xafiiska waan iska bixinnay.','2023-11-28 12:15:42','2023-11-28 12:15:42',NULL),(3,4,'2023-11-28 00:00:00',79.99,'Internetka bisha ee xafiiska waan iska bixinnay.','2023-11-28 12:17:20','2023-11-28 12:17:20',NULL),(4,2,'2023-11-28 00:00:00',129.99,'Korontada bisha ee xafiiska waan iska bixinnay.','2023-11-28 12:22:01','2023-11-28 12:37:52',NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(3) NOT NULL,
  `cost` decimal(8,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,'Kg',2.00,'2023-11-27 08:31:27','2023-11-27 08:31:27',NULL),(2,'Qty',0.50,'2023-11-27 08:32:20','2023-11-27 08:32:20',NULL);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Washing','2023-11-21 13:30:10','2023-11-21 13:30:10',NULL),(2,'Ironing','2023-11-21 13:30:22','2023-11-21 13:30:22',NULL),(3,'Washing and Ironing','2023-11-21 13:30:37','2023-11-22 09:21:08',NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smscustomers`
--

DROP TABLE IF EXISTS `smscustomers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `smscustomers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customerId` bigint unsigned NOT NULL,
  `body` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `smscustomers_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smscustomers`
--

LOCK TABLES `smscustomers` WRITE;
/*!40000 ALTER TABLE `smscustomers` DISABLE KEYS */;
INSERT INTO `smscustomers` VALUES (1,4,'Macmiilkeenna sharafta lahow waxaan ku ogeysiineynaa in adeeggaagii laguu diyaariyey','2023-12-05 07:54:20','2023-12-05 07:54:20',NULL),(2,2,'Macmiilkeenna sharafta lahow waxaan ku ogeysiineynaa in adeeggaagii laga howl galay','2023-12-05 07:54:43','2023-12-05 07:54:43',NULL);
/*!40000 ALTER TABLE `smscustomers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smsemployees`
--

DROP TABLE IF EXISTS `smsemployees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `smsemployees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employeeId` bigint unsigned NOT NULL,
  `body` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `smsemployees_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smsemployees`
--

LOCK TABLES `smsemployees` WRITE;
/*!40000 ALTER TABLE `smsemployees` DISABLE KEYS */;
INSERT INTO `smsemployees` VALUES (1,3,'Waxaa lagu ogeysinayaa in aad ilaaliso waqtiga shaqo soo gelidda iyo kan shaqo ka bixidda intaba.','2023-12-05 10:40:49','2023-12-05 10:40:49',NULL),(2,2,'Waxaa lagu ogeysiinaa in shirkadda billaha uu dhici doono beri oo arbaco bishuna tahay December 5, 2023.','2023-12-05 10:44:03','2023-12-05 10:51:26',NULL);
/*!40000 ALTER TABLE `smsemployees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplies`
--

DROP TABLE IF EXISTS `supplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `note` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplies`
--

LOCK TABLES `supplies` WRITE;
/*!40000 ALTER TABLE `supplies` DISABLE KEYS */;
INSERT INTO `supplies` VALUES (1,'Omo','Top','2023-11-25 11:07:28','2023-11-25 11:07:28',NULL),(2,'Shampoo','UAE','2023-11-25 11:10:46','2023-11-25 11:10:46',NULL),(3,'Pins','Plastic','2023-11-25 11:15:26','2023-11-25 11:27:48',NULL);
/*!40000 ALTER TABLE `supplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `type` varchar(7) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Abdirahman Mohamed Hersi','hersi','$2b$08$PyQXOEFCyosPh1KLXFJV0.1gFWYbUdhzo7SkSUTr6Hfhstn4qKwfq','admin','2023-12-02 12:14:43','2023-12-02 12:14:43',NULL),(2,'Mohamud Dirir Mohamed','dirir','$2b$08$.qjLS6aZUs0vI6ZjeMlH1.sTm0P8MfyDxjbLScejYciShIO.5rtE2','user','2023-12-02 12:23:43','2023-12-02 12:23:43',NULL),(3,'Abdiaziz Ali Nur','anur','$2b$08$8l/oFCuCs90rqoWfYso6CeY/ei/wL/bGPQ3Q74OVzAu55jPzm1o8S','manager','2023-12-02 12:25:34','2023-12-05 06:31:52',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-04 11:57:36
