-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: youtubedb
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `raitings`
--

DROP TABLE IF EXISTS `raitings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `raitings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `rating` float NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `raitings_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `raitings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raitings`
--

LOCK TABLES `raitings` WRITE;
/*!40000 ALTER TABLE `raitings` DISABLE KEYS */;
INSERT INTO `raitings` VALUES (1,1,1,'dfsdfsdfs',3.3,'2017-03-23 12:48:22'),(2,3,2,'qwertyhgfds',4,'2017-03-23 03:53:56'),(3,4,2,'asdfasfasdfsdfs',4,'2017-03-23 03:54:28'),(4,5,1,'',5,'2017-03-23 04:31:52'),(5,1,3,'fsdfsdf',4,'2017-03-23 04:35:25'),(6,5,3,'dgdfgdfgdfgd',3,'2017-03-23 04:36:45'),(7,6,4,'adfasdfasdfsadfs',4.4,'2017-03-23 07:22:01'),(8,8,4,'V salat',4.4,'2017-03-23 07:23:30'),(9,10,1,'WOW',3.1,'2017-03-23 07:58:33'),(10,13,3,'asdf',3.5,'2017-03-23 08:00:10'),(11,3,4,'dfgdfg',3.6,'2017-03-23 09:04:39');
/*!40000 ALTER TABLE `raitings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `login` varchar(16) NOT NULL,
  `full_name` varchar(32) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','RKh090feead97d1ffecdf89e032023ab1c4','2017-03-23 03:37:24'),(2,'user1','user1','m4Qfe9458bf48b780666f76a5723e3849c2','2017-03-23 03:53:36'),(3,'darker','darker','7wFabd2eebe618a763f95548b78f5280ab4','2017-03-23 04:33:14'),(4,'qq','qq','Xhxba6f5114b62cf6ab342512e1aeb43085','2017-03-23 07:21:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `screenshot_path` varchar(255) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,1,'Intel Extreme Masters World Championship 2012 Final Day','./files/Intel Extreme Masters World Championship 2012 Final Day.mp4','./files/Screenshot/Intel Extreme Masters World Championship 2012 Final Day.png','2017-03-23 00:49:04',NULL),(2,1,'BATMETAL','./files/BATMETAL.mp4','./files/Screenshot/BATMETAL.png','2017-03-23 01:13:27',NULL),(3,2,'BATMETAL','./files/BATMETAL.mp4','./files/Screenshot/BATMETAL.png','2017-03-23 03:53:42',NULL),(4,2,'Прибытие Снупа - The Arrival of Snoop Dogg - Coub of Day','./files/Прибытие Снупа - The Arrival of Snoop Dogg - Coub of Day.mp4','./files/Screenshot/Прибытие Снупа - The Arrival of Snoop Dogg - Coub of Day.png','2017-03-23 03:54:18',NULL),(5,1,'BATMETAL','./files/BATMETAL.mp4','./files/Screenshot/BATMETAL.png','2017-03-23 04:31:41',NULL),(6,4,'----Gorilla Riders---- Спартак Алемасов и его Nissan Silvia','./files/----Gorilla Riders---- Спартак Алемасов и его Nissan Silvia.mp4','./files/Screenshot/----Gorilla Riders---- Спартак Алемасов и его Nissan Silvia.png','2017-03-23 07:21:35',NULL),(8,4,'SHC respects Darien\'s Swagwick pick','./files/SHC respects Darien\'s Swagwick pick.mp4','./files/Screenshot/SHC respects Darien\'s Swagwick pick.png','2017-03-23 07:23:06',NULL),(10,1,'SOFLES — LIMITLESS.','./files/SOFLES — LIMITLESS..mp4','./files/Screenshot/SOFLES — LIMITLESS..png','2017-03-23 07:58:11',NULL),(11,3,'Прибытие Снупа - The Arrival of Snoop Dogg - Coub of Day','./files/Прибытие Снупа - The Arrival of Snoop Dogg - Coub of Day.mp4','./files/Screenshot/Прибытие Снупа - The Arrival of Snoop Dogg - Coub of Day.png','2017-03-23 07:59:29',NULL),(12,3,'Intel Extreme Masters World Championship 2012 Final Day','./files/Intel Extreme Masters World Championship 2012 Final Day.mp4','./files/Screenshot/Intel Extreme Masters World Championship 2012 Final Day.png','2017-03-23 07:59:29',NULL),(13,3,'BATMETAL','./files/BATMETAL.mp4','./files/Screenshot/BATMETAL.png','2017-03-23 07:59:29',NULL),(14,1,'hillclimb montee tros marets 2013 nissan silvia drift 1','./files/hillclimb montee tros marets 2013 nissan silvia drift 1.mp4','./files/Screenshot/hillclimb montee tros marets 2013 nissan silvia drift 1.png','2017-03-23 08:46:31',NULL),(15,1,'5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!','./files/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.mp4','./files/Screenshot/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.png','2017-03-23 11:58:58',NULL),(16,1,'5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!','./files/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.mp4','./files/Screenshot/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.png','2017-03-23 12:02:37',NULL),(17,1,'5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!','./files/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.mp4','./files/Screenshot/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.png','2017-03-23 12:08:54',NULL),(18,1,'5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!','./files/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.mp4','./files/Screenshot/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.png','2017-03-23 12:09:08',NULL),(19,1,'5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!','./files/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.mp4','./files/Screenshot/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.png','2017-03-23 12:14:52',NULL),(20,1,'5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!','./files/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.mp4','./files/Screenshot/5 ЛАЙФХАКОВ КОТОРЫЕ УПРОСТЯТ ВАШУ ЖИЗНЬ!.png','2017-03-23 12:15:28',NULL),(21,1,'IEM Oakland 2016 - Official Trailer','./files/IEM Oakland 2016 - Official Trailer.mp4','./files/Screenshot/IEM Oakland 2016 - Official Trailer.png','2017-03-23 12:19:02',NULL),(22,1,'Are you ready - IEM Katowice 2017 Playoffs - Spodek Arena 3-5 March','./files/Are you ready - IEM Katowice 2017 Playoffs - Spodek Arena 3-5 March.mp4','./files/Screenshot/Are you ready - IEM Katowice 2017 Playoffs - Spodek Arena 3-5 March.png','2017-03-23 12:19:05',NULL);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-23 16:39:45
